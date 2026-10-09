import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createRazorpayOrder, isRazorpayConfigured } from "@/lib/razorpay";
import { getAuthenticatedUser } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    // TESTING PHASE GUARD: Payment orders are disabled
    if (process.env.NEXT_PUBLIC_ENABLE_PURCHASES !== "true") {
      return NextResponse.json(
        {
          error: "Payment gateway transactions are disabled during the store testing phase.",
          isTestingPhase: true,
        },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { items, shippingOption, couponCode } = body;

    if (!isRazorpayConfigured()) {
      return NextResponse.json(
        {
          error:
            "Online card/gateway payment is currently unavailable. Please choose Instant UPI Scan & Pay or Cash on Delivery.",
        },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Ritual bag cannot be empty to create a payment order." },
        { status: 400 }
      );
    }

    // 1. Calculate tamper-proof pricing directly from PostgreSQL database
    const productIds = items.map((i: { productId: string }) => i.productId).filter(Boolean);
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });
    const productMap = new Map(dbProducts.map((p) => [p.id, p]));

    let verifiedSubtotal = 0;
    for (const item of items) {
      const dbProd = productMap.get(item.productId);
      if (!dbProd) {
        return NextResponse.json(
          { error: `Product item ${item.productId} is no longer available.` },
          { status: 400 }
        );
      }
      const qty = Math.max(1, Math.min(10, Number(item.quantity) || 1));
      verifiedSubtotal += dbProd.price * qty;
    }

    // 2. Shipping calculation
    const shippingFee = shippingOption === "vip" ? 12 : verifiedSubtotal >= 50 ? 0 : 8;

    // 3. Coupon calculation
    let discount = 0;
    if (couponCode && typeof couponCode === "string" && couponCode.trim().toUpperCase() === "NIIMI15") {
      discount = verifiedSubtotal * 0.15;
    }

    const verifiedTotal = Math.max(0, verifiedSubtotal - discount + shippingFee);

    // Convert to currency subunits (e.g., INR paise = total * 100)
    const amountInSmallestUnit = Math.round(verifiedTotal * 100);

    const tempReceipt = `rcpt_${Date.now()}`;
    const user = await getAuthenticatedUser();

    const orderData = await createRazorpayOrder({
      amountInSmallestUnit,
      currency: "INR",
      receipt: tempReceipt,
      notes: {
        customerEmail: user?.email || "guest",
        subtotal: verifiedSubtotal.toFixed(2),
        discount: discount.toFixed(2),
      },
    });

    return NextResponse.json({
      success: true,
      orderId: orderData.id,
      amount: orderData.amount,
      currency: orderData.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Failed to initiate payment gateway transaction.";
    console.error("API /api/payment/razorpay/create-order error:", error);
    return NextResponse.json(
      { error: errMessage },
      { status: 400 }
    );
  }
}
