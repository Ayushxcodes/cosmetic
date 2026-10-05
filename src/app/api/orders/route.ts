import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getOrders, saveOrder } from "@/lib/products-store";
import { verifyAdminToken, ADMIN_COOKIE_NAME } from "@/lib/auth";
import { Order } from "@/types/ecommerce";

async function isAuthorizedAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const admin = await verifyAdminToken(token);
  return Boolean(admin);
}

export async function GET() {
  try {
    const isAuth = await isAuthorizedAdmin();
    if (!isAuth) {
      return NextResponse.json(
        { error: "Unauthorized: Executive admin session required" },
        { status: 401 }
      );
    }

    const orders = await getOrders();
    return NextResponse.json(orders);
  } catch (error) {
    console.error("API GET /api/orders error:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}


export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.customer || !body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: "Customer details and valid cart items are required" },
        { status: 400 }
      );
    }

    const { fullName, email, phone, address, city, state, postalCode } = body.customer;

    if (!fullName || !email || !phone || !address || !city || !state || !postalCode) {
      return NextResponse.json(
        { error: "All shipping address and contact fields are required." },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Sanitize item details
    const sanitizedItems = body.items.map((i: any) => ({
      productId: String(i.productId || "").slice(0, 100),
      name: String(i.name || "Product").slice(0, 150),
      price: Math.max(0, Number(i.price) || 0),
      quantity: Math.max(1, Math.min(100, Math.floor(Number(i.quantity) || 1))),
      image: String(i.image || "/cosmetic1.avif"),
      size: i.size ? String(i.size).slice(0, 50) : undefined,
    }));

    const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);

    const subtotal = Math.max(0, Number(body.subtotal) || 0);
    const shippingFee = Math.max(0, Number(body.shippingFee) || 0);
    const discount = Math.max(0, Number(body.discount) || 0);
    const total = Math.max(0, Number(body.total) || 0);

    const newOrder: Order = {
      id: orderId,
      customer: {
        fullName: String(fullName).trim().slice(0, 100),
        email: String(email).trim().toLowerCase().slice(0, 120),
        phone: String(phone).trim().slice(0, 30),
        address: String(address).trim().slice(0, 250),
        city: String(city).trim().slice(0, 80),
        state: String(state).trim().slice(0, 80),
        postalCode: String(postalCode).trim().slice(0, 20),
        country: String(body.customer.country || "India").trim().slice(0, 50),
      },
      items: sanitizedItems,
      subtotal,
      shippingFee,
      discount,
      total,
      couponCode: body.couponCode ? String(body.couponCode).trim().slice(0, 30) : undefined,
      paymentMethod: ["cod", "upi", "card", "razorpay"].includes(body.paymentMethod)
        ? body.paymentMethod
        : "cod",
      paymentStatus: body.paymentMethod === "upi" ? "paid" : "pending",
      orderStatus: "placed",
      notes: body.notes ? String(body.notes).slice(0, 500) : "",
      createdAt: new Date().toISOString(),
      estimatedDelivery: deliveryDate.toISOString().split("T")[0],
    };

    const saved = await saveOrder(newOrder);
    return NextResponse.json({ success: true, order: saved }, { status: 201 });
  } catch (error) {
    console.error("API POST /api/orders error:", error);
    return NextResponse.json(
      { error: "Failed to process order" },
      { status: 500 }
    );
  }
}

