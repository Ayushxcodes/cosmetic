import crypto from "crypto";

/**
 * Checks whether live or sandbox Razorpay keys are provided in .env
 */
export function isRazorpayConfigured(): boolean {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) return false;
  if (keyId.includes("placeholder") || keySecret.includes("secret_key")) return false;
  return keyId.startsWith("rzp_test_") || keyId.startsWith("rzp_live_");
}

/**
 * Creates a Razorpay Order through the official REST API
 * Strictly requires active keys in .env
 */
export async function createRazorpayOrder({
  amountInSmallestUnit,
  currency = "INR",
  receipt,
  notes = {},
}: {
  amountInSmallestUnit: number;
  currency?: string;
  receipt: string;
  notes?: Record<string, string>;
}): Promise<{
  id: string;
  amount: number;
  currency: string;
}> {
  if (!isRazorpayConfigured()) {
    throw new Error(
      "Razorpay is unavaliable"
    );
  }

  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!;
  const keySecret = process.env.RAZORPAY_KEY_SECRET!;
  const authHeader = `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`;

  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader,
    },
    body: JSON.stringify({
      amount: Math.round(amountInSmallestUnit),
      currency: currency.toUpperCase(),
      receipt: receipt.slice(0, 40),
      notes,
    }),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    console.error("Razorpay API order creation error:", errData);
    throw new Error(errData?.error?.description || "Failed to create Razorpay order");
  }

  const data = await res.json();
  return {
    id: data.id,
    amount: data.amount,
    currency: data.currency,
  };
}

/**
 * Verifies the cryptographic HMAC-SHA256 signature returned by Razorpay Checkout
 */
export function verifyRazorpaySignature({
  orderId,
  paymentId,
  signature,
}: {
  orderId: string;
  paymentId: string;
  signature?: string;
}): boolean {
  if (!isRazorpayConfigured() || !signature || !orderId || !paymentId) {
    return false;
  }

  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) return false;

  const generatedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(generatedSignature, "utf-8"),
      Buffer.from(signature, "utf-8")
    );
  } catch {
    return false;
  }
}

/**
 * Verifies Razorpay Webhook signature
 */
export function verifyWebhookSignature({
  body,
  signature,
  secret,
}: {
  body: string;
  signature: string;
  secret: string;
}): boolean {
  const generatedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(generatedSignature, "utf-8"),
      Buffer.from(signature, "utf-8")
    );
  } catch {
    return false;
  }
}
