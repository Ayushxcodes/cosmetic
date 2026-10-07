import { NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/razorpay";
import { updateOrderPaymentAndStatus } from "@/lib/products-store";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-razorpay-signature");
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // If webhook secret is configured, verify HMAC signature
    if (webhookSecret && signature) {
      const isValid = verifyWebhookSignature({
        body: rawBody,
        signature,
        secret: webhookSecret,
      });

      if (!isValid) {
        console.warn("Invalid Razorpay webhook signature received");
        return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
      }
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;
    console.log(`Received Razorpay webhook event: ${event}`);

    if (event === "payment.captured" || event === "order.paid") {
      const paymentEntity = payload.payload?.payment?.entity;
      const paymentId = paymentEntity?.id;
      const razorpayOrderId = paymentEntity?.order_id;

      // Find order matching payment reference or razorpay order note
      if (paymentId) {
        const order = await prisma.order.findFirst({
          where: {
            OR: [
              { paymentReference: paymentId },
              { paymentReference: razorpayOrderId },
            ],
          },
        });

        if (order) {
          await updateOrderPaymentAndStatus(order.id, {
            paymentStatus: "paid",
            settlementStatus: "settled",
            notes: `Auto-reconciled via Razorpay webhook (${event}) on ${new Date().toISOString()}`,
          });
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Razorpay webhook handler error:", error);
    return NextResponse.json({ error: "Webhook processing error" }, { status: 500 });
  }
}
