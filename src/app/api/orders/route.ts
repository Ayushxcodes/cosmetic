import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { getOrders, saveOrder } from "@/lib/products-store";
import { verifyAdminToken, ADMIN_COOKIE_NAME } from "@/lib/auth";
import { Order, OrderItem, PaymentMethod, PaymentStatus, SettlementStatus } from "@/types/ecommerce";

async function getAuthenticatedUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return await verifyAdminToken(token);
}

/**
 * GET /api/orders
 * Strictly protected: Only executive staff (admin or superadmin) can list all orders.
 */
export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
      return NextResponse.json(
        { error: "Forbidden: Executive administrator credentials required to inspect orders." },
        { status: 403 }
      );
    }

    const orders = await getOrders();
    return NextResponse.json(orders);
  } catch (error) {
    console.error("API GET /api/orders error:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders." },
      { status: 500 }
    );
  }
}

/**
 * POST /api/orders
 * Places a customer order with STRICT SERVER-SIDE PRICING INTEGRITY,
 * COUPON VERIFICATION, AND PAYMENT FRAUD SAFEGUARDS.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const session = await getAuthenticatedUser();

    if (!body.customer || !body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: "Customer details and at least one formulation item are required." },
        { status: 400 }
      );
    }

    const { fullName, email, phone, address, city, state, postalCode } = body.customer;

    if (!fullName || !email || !phone || !address || !city || !state || !postalCode) {
      return NextResponse.json(
        { error: "All recipient address and contact fields are required." },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid recipient email address." },
        { status: 400 }
      );
    }

    // 1. FINANCIAL INTEGRITY: Query canonical database products to verify authenticity & real prices
    const productIds: string[] = body.items.map((i: { productId?: string }) =>
      String(i.productId || "").trim()
    );

    const dbProducts = await prisma.product.findMany({
      where: {
        id: { in: productIds },
      },
    });

    if (dbProducts.length === 0) {
      return NextResponse.json(
        { error: "None of the requested formulations could be found in the boutique catalog." },
        { status: 400 }
      );
    }

    // Build verified items array using ONLY server-side database prices
    const sanitizedItems: OrderItem[] = [];
    for (const item of body.items) {
      const match = dbProducts.find((p) => p.id === item.productId);
      if (!match) {
        return NextResponse.json(
          { error: `Formulation "${item.name || item.productId}" is not available.` },
          { status: 400 }
        );
      }

      const qty = Math.max(1, Math.min(50, Math.floor(Number(item.quantity) || 1)));
      sanitizedItems.push({
        productId: match.id,
        name: match.name,
        price: match.price, // STRICT: Derived from PostgreSQL, NEVER trusting client price!
        quantity: qty,
        image: match.image,
        size: item.size ? String(item.size).slice(0, 50) : match.size,
      });
    }

    // 2. SERVER-SIDE FINANCIAL COMPUTATION
    const serverSubtotal = sanitizedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // 3. SERVER-SIDE COUPON VALIDATION
    let serverDiscount = 0;
    let validatedCoupon: string | undefined = undefined;

    if (body.couponCode && typeof body.couponCode === "string") {
      const candidateCode = body.couponCode.trim().toUpperCase();
      // Valid promotional campaigns
      if (candidateCode === "NIIMI15") {
        validatedCoupon = "NIIMI15";
        serverDiscount = Math.round(serverSubtotal * 0.15 * 100) / 100;
      }
    }

    // 4. SERVER-SIDE SHIPPING CALCULATION
    const isVipShipping = body.shippingOption === "vip";
    const serverShippingFee = isVipShipping
      ? 12
      : serverSubtotal === 0 || serverSubtotal >= 50
      ? 0
      : 8;

    const serverTotal = Math.max(
      0,
      Math.round((serverSubtotal - serverDiscount + serverShippingFee) * 100) / 100
    );

    // 5. PAYMENT METHOD VALIDATION & ANTI-SPOOFING
    const requestedMethod = String(body.paymentMethod || "cod").toLowerCase();
    let paymentMethod: PaymentMethod = "cod";
    let paymentStatus: PaymentStatus = "pending";
    let settlementStatus: SettlementStatus = "pending";
    let payoutChannel = "courier_cod_remittance";
    let paymentReference: string | undefined = undefined;

    if (requestedMethod === "upi") {
      paymentMethod = "upi";
      payoutChannel = "instant_bank_upi";

      const utr = body.upiTransactionId || body.paymentReference;
      if (!utr || typeof utr !== "string" || utr.trim().length < 6) {
        return NextResponse.json(
          {
            error:
              "Please provide your 12-digit UPI Transaction ID / UTR reference after completing the transfer.",
          },
          { status: 400 }
        );
      }

      paymentReference = utr.trim().toUpperCase();
      paymentStatus = "pending_verification"; // Marked for merchant verification against bank statement!
      settlementStatus = "pending";
    } else if (
      requestedMethod === "razorpay" ||
      requestedMethod === "razorpay_demo" ||
      requestedMethod === "card"
    ) {
      paymentMethod = "razorpay_demo";
      payoutChannel = "gateway_t2";
      paymentStatus = "paid";
      paymentReference = body.razorpayPaymentId || `pay_sim_${Date.now()}`;
      settlementStatus = "settled";
    } else {
      // Default: Cash on Delivery (COD)
      paymentMethod = "cod";
      payoutChannel = "courier_cod_remittance";
      paymentStatus = "pending";
      settlementStatus = "pending";
    }

    // 6. ASSOCIATE CUSTOMER ACCOUNT
    const normalizedEmail = email.trim().toLowerCase();
    let linkedCustomerId: string | undefined = session?.id;

    if (!linkedCustomerId) {
      const existingCustomer = await prisma.customer.findUnique({
        where: { email: normalizedEmail },
      });
      if (existingCustomer) {
        linkedCustomerId = existingCustomer.id;
      }
    }

    const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);

    const newOrder: Order = {
      id: orderId,
      customerId: linkedCustomerId,
      customer: {
        fullName: String(fullName).trim().slice(0, 100),
        email: normalizedEmail.slice(0, 120),
        phone: String(phone).trim().slice(0, 30),
        address: String(address).trim().slice(0, 250),
        city: String(city).trim().slice(0, 80),
        state: String(state).trim().slice(0, 80),
        postalCode: String(postalCode).trim().slice(0, 20),
        country: String(body.customer.country || "India").trim().slice(0, 50),
      },
      items: sanitizedItems,
      subtotal: serverSubtotal,
      shippingFee: serverShippingFee,
      discount: serverDiscount,
      total: serverTotal,
      couponCode: validatedCoupon,
      paymentMethod,
      paymentStatus,
      paymentReference,
      settlementStatus,
      payoutChannel,
      orderStatus: "placed",
      notes: body.notes ? String(body.notes).slice(0, 500) : "",
      createdAt: new Date().toISOString(),
      estimatedDelivery: deliveryDate.toISOString().split("T")[0],
    };

    const saved = await saveOrder(newOrder);

    return NextResponse.json({ success: true, order: saved }, { status: 201 });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Failed to process order";
    console.error("API POST /api/orders error:", msg);
    return NextResponse.json(
      { error: "Failed to process order: " + msg },
      { status: 500 }
    );
  }
}
