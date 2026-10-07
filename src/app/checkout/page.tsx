"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  QrCode,
  Banknote,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Sparkles,
  Trash2,
  Plus,
  Minus,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { PaymentMethod } from "@/types/ecommerce";

const isRazorpayActive = Boolean(
  process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID &&
  !process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID.includes("placeholder") &&
  (process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID.startsWith("rzp_test_") || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID.startsWith("rzp_live_"))
);

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const {
    items,
    subtotal,
    shippingFee,
    discount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    clearCart,
    removeFromCart,
    updateQuantity,
  } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "Delhi",
    postalCode: "",
    country: "India",
    notes: "",
  });

  const [shippingOption, setShippingOption] = useState<"standard" | "vip">("standard");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [upiTransactionId, setUpiTransactionId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [inputCoupon, setInputCoupon] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);

  const [syncedUserId, setSyncedUserId] = useState<string | null>(null);

  // Sync customer details when auth user becomes available
  if (user && syncedUserId !== user.id) {
    setSyncedUserId(user.id);
    setFormData((prev) => ({
      ...prev,
      fullName: prev.fullName || user.name || "",
      email: prev.email || user.email || "",
    }));
  }

  const calculatedShipping =
    shippingOption === "vip" ? 12 : shippingFee;
  const finalTotal = Math.max(0, subtotal - discount + calculatedShipping);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError(null);
      setInputCoupon("");
    }
  };

  const processOrderPlacement = async (additionalPaymentFields?: {
    paymentMethod?: PaymentMethod;
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    razorpaySignature?: string;
  }) => {
    const chosenMethod = additionalPaymentFields?.paymentMethod || paymentMethod;

    const orderPayload = {
      customer: formData,
      items: items.map((i) => ({
        productId: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        image: i.product.image,
        size: i.product.size,
      })),
      shippingOption,
      subtotal,
      shippingFee: calculatedShipping,
      discount,
      total: finalTotal,
      couponCode: appliedCoupon || undefined,
      paymentMethod: chosenMethod,
      upiTransactionId: chosenMethod === "upi" ? upiTransactionId.trim() : undefined,
      razorpayOrderId: additionalPaymentFields?.razorpayOrderId,
      razorpayPaymentId: additionalPaymentFields?.razorpayPaymentId,
      razorpaySignature: additionalPaymentFields?.razorpaySignature,
      notes: formData.notes,
    };

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderPayload),
    });

    const data = await res.json();
    if (res.ok && data.success) {
      clearCart();
      router.push(`/order-success/${data.order.id}`);
      return true;
    } else {
      setErrorMessage(data.error || "Failed to process order. Please try again.");
      return false;
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setErrorMessage("Your ritual bag is empty.");
      return;
    }

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.postalCode
    ) {
      setErrorMessage("Please complete all required delivery details.");
      return;
    }

    if (paymentMethod === "upi") {
      if (!upiTransactionId.trim() || upiTransactionId.trim().length < 6) {
        setErrorMessage(
          "Please enter your 12-digit UPI Transaction Reference Number / UTR after completing the payment."
        );
        return;
      }
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // 1. Online Payment via Razorpay Gateway (Cards, NetBanking, Automated UPI)
      if (paymentMethod === "razorpay" || paymentMethod === "razorpay_demo" || paymentMethod === "card") {
        if (!isRazorpayActive) {
          setErrorMessage(
            "Online card/gateway payment is currently unavailable as merchant Razorpay credentials have not been configured yet. Please choose Instant UPI Scan & Pay or Cash on Delivery."
          );
          setIsSubmitting(false);
          return;
        }

        const orderRes = await fetch("/api/payment/razorpay/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
            shippingOption,
            couponCode: appliedCoupon || undefined,
          }),
        });

        const orderData = await orderRes.json();
        if (!orderRes.ok || !orderData.success) {
          setErrorMessage(orderData.error || "Failed to initialize payment gateway.");
          setIsSubmitting(false);
          return;
        }

        // Open Razorpay Popup Modal
        if (
          typeof window !== "undefined" &&
          (window as unknown as { Razorpay?: new (opts: unknown) => { open: () => void } }).Razorpay
        ) {
          const RazorpayConstructor = (
            window as unknown as { Razorpay: new (opts: unknown) => { open: () => void } }
          ).Razorpay;
          const options = {
            key: orderData.keyId,
            amount: orderData.amount,
            currency: orderData.currency,
            name: "Niimi Japanese Cosmetics",
            description: "Luxury Botanical Formulations",
            image: "/official_logo.png",
            order_id: orderData.orderId,
            handler: async function (response: {
              razorpay_order_id: string;
              razorpay_payment_id: string;
              razorpay_signature: string;
            }) {
              await processOrderPlacement({
                paymentMethod: "razorpay",
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              });
            },
            prefill: {
              name: formData.fullName,
              email: formData.email,
              contact: formData.phone,
            },
            theme: {
              color: "#1a1208",
            },
            modal: {
              ondismiss: function () {
                setIsSubmitting(false);
              },
            },
          };

          const rzp = new RazorpayConstructor(options);
          rzp.open();
          return;
        } else {
          setErrorMessage("Razorpay checkout SDK failed to load. Please try again or choose Instant UPI / COD.");
          setIsSubmitting(false);
          return;
        }
      }

      // 2. Direct QR UPI or Cash on Delivery (COD)
      await processOrderPlacement();
    } catch (err) {
      console.error("Checkout order error:", err);
      setErrorMessage("Network error occurred while submitting your order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#faf6ef] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-[#f3ebd9] flex items-center justify-center text-[#b8935a] mb-4">
          <Truck className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-serif lobster-two-bold text-[#1a1208] mb-2">
          Your Ritual Bag is Empty
        </h1>
        <p className="text-xs text-[#6b5c44] mb-6 max-w-sm">
          Please select your favorite Niimi formulations before navigating to checkout.
        </p>
        <Link
          href="/shop"
          className="bg-[#1a1208] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#b8935a] transition"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#faf6ef] min-h-screen text-[#1a1208] py-12 px-4 sm:px-8">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <div className="max-w-7xl mx-auto">
        
        {/* Back to Shop Header */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6b5c44] hover:text-[#1a1208] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Shop</span>
          </Link>
          <div className="flex items-center gap-2 text-xs text-[#6b5c44]">
            <Lock className="w-3.5 h-3.5 text-emerald-700" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>

        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left 7 Columns: Checkout Details Form */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Step 1: Customer Contact */}
              <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-[#e8d9c0]/60 shadow-xs space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-[#e8d9c0]/40">
                  <span className="w-6 h-6 rounded-full bg-[#1a1208] text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h2 className="text-lg font-serif lobster-two-bold text-[#1a1208]">
                    Client Contact Details
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#6b5c44] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Nikita Varma"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e8d9c0] text-xs text-[#1a1208] bg-[#faf6ef]/30 focus:outline-none focus:ring-1 focus:ring-[#1a1208]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#6b5c44] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="you@domain.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e8d9c0] text-xs text-[#1a1208] bg-[#faf6ef]/30 focus:outline-none focus:ring-1 focus:ring-[#1a1208]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#6b5c44] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e8d9c0] text-xs text-[#1a1208] bg-[#faf6ef]/30 focus:outline-none focus:ring-1 focus:ring-[#1a1208]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Destination */}
              <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-[#e8d9c0]/60 shadow-xs space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-[#e8d9c0]/40">
                  <span className="w-6 h-6 rounded-full bg-[#1a1208] text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h2 className="text-lg font-serif lobster-two-bold text-[#1a1208]">
                    Shipping Destination
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#6b5c44] mb-1">
                      Street Address / Residence *
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      placeholder="Apartment, Studio, or Floor, Street address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e8d9c0] text-xs text-[#1a1208] bg-[#faf6ef]/30 focus:outline-none focus:ring-1 focus:ring-[#1a1208]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#6b5c44] mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      placeholder="e.g. Mumbai, New Delhi"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e8d9c0] text-xs text-[#1a1208] bg-[#faf6ef]/30 focus:outline-none focus:ring-1 focus:ring-[#1a1208]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#6b5c44] mb-1">
                      State / Province *
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      placeholder="e.g. Maharashtra, Delhi"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e8d9c0] text-xs text-[#1a1208] bg-[#faf6ef]/30 focus:outline-none focus:ring-1 focus:ring-[#1a1208]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#6b5c44] mb-1">
                      Postal / ZIP Code *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      placeholder="e.g. 110001"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e8d9c0] text-xs text-[#1a1208] bg-[#faf6ef]/30 focus:outline-none focus:ring-1 focus:ring-[#1a1208]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#6b5c44] mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      disabled
                      value={formData.country}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e8d9c0] text-xs text-[#6b5c44] bg-[#faf6ef]/70 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Delivery Method Options */}
                <div className="pt-4 border-t border-[#e8d9c0]/40 space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1a1208]">
                    Select Delivery Speed
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div
                      onClick={() => setShippingOption("standard")}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer transition flex items-start gap-3 ${
                        shippingOption === "standard"
                          ? "border-[#b8935a] bg-[#faf6ef]/50"
                          : "border-[#e8d9c0]/60 bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        checked={shippingOption === "standard"}
                        onChange={() => setShippingOption("standard")}
                        className="mt-1 accent-[#b8935a]"
                      />
                      <div>
                        <div className="flex justify-between items-center text-xs font-bold text-[#1a1208]">
                          <span>Complimentary Express</span>
                          <span>{shippingFee === 0 ? "Free" : `$${shippingFee}`}</span>
                        </div>
                        <p className="text-[11px] text-[#6b5c44] mt-0.5">
                          2 - 4 business days. Temperature-controlled packaging.
                        </p>
                      </div>
                    </div>

                    <div
                      onClick={() => setShippingOption("vip")}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer transition flex items-start gap-3 ${
                        shippingOption === "vip"
                          ? "border-[#b8935a] bg-[#faf6ef]/50"
                          : "border-[#e8d9c0]/60 bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        checked={shippingOption === "vip"}
                        onChange={() => setShippingOption("vip")}
                        className="mt-1 accent-[#b8935a]"
                      />
                      <div>
                        <div className="flex justify-between items-center text-xs font-bold text-[#1a1208]">
                          <span>White-Glove VIP Courier</span>
                          <span>$12.00</span>
                        </div>
                        <p className="text-[11px] text-[#6b5c44] mt-0.5">
                          Next-day priority dispatch + 2 deluxe ritual samples.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gift notes */}
                <div className="pt-2">
                  <label className="block text-xs font-semibold text-[#6b5c44] mb-1">
                    Special Ritual Delivery Instructions / Keepsake Note (Optional)
                  </label>
                  <textarea
                    name="notes"
                    rows={2}
                    placeholder="Leave with front desk concierge, include gift packaging note, etc."
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-xl border border-[#e8d9c0] text-xs text-[#1a1208] bg-[#faf6ef]/30 focus:outline-none focus:ring-1 focus:ring-[#1a1208]"
                  />
                </div>
              </div>

              {/* Step 3: Payment Method */}
              <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-[#e8d9c0]/60 shadow-xs space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-[#e8d9c0]/40">
                  <span className="w-6 h-6 rounded-full bg-[#1a1208] text-white text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h2 className="text-lg font-serif lobster-two-bold text-[#1a1208]">
                    Payment Method
                  </h2>
                </div>

                <div className="space-y-3 pt-2">
                  
                  {/* Option 1: Cash / Pay on Delivery */}
                  <div
                    onClick={() => setPaymentMethod("cod")}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition ${
                      paymentMethod === "cod"
                        ? "border-[#b8935a] bg-[#faf6ef]/60"
                        : "border-[#e8d9c0]/60 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Banknote className="w-5 h-5 text-[#b8935a]" />
                        <div>
                          <span className="text-xs font-bold text-[#1a1208] block">
                            Cash / Pay on Delivery (COD)
                          </span>
                          <span className="text-[11px] text-[#6b5c44]">
                            Instant verification. Settle comfortably upon door arrival.
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        Recommended
                      </span>
                    </div>
                  </div>

                  {/* Option 2: UPI / QR Scan & Pay */}
                  <div
                    onClick={() => setPaymentMethod("upi")}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition ${
                      paymentMethod === "upi"
                        ? "border-[#b8935a] bg-[#faf6ef]/60"
                        : "border-[#e8d9c0]/60 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <QrCode className="w-5 h-5 text-[#b8935a]" />
                        <div>
                          <span className="text-xs font-bold text-[#1a1208] block">
                            Instant UPI QR Scan & Pay
                          </span>
                          <span className="text-[11px] text-[#6b5c44]">
                            Pay via Google Pay, PhonePe, Paytm, or BHIM.
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full">
                        Zero Fee
                      </span>
                    </div>

                    {paymentMethod === "upi" && (
                      <div className="mt-4 pt-4 border-t border-[#e8d9c0]/50 space-y-3 bg-[#faf6ef]/30 p-3.5 rounded-xl">
                        <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-3 rounded-xl border border-[#e8d9c0]/60">
                          <div className="w-28 h-28 relative rounded-lg border border-[#e8d9c0] p-1 bg-white shrink-0">
                            <Image
                              src="/niimi-qr.png"
                              alt="Scan UPI QR"
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div className="text-xs text-[#6b5c44] space-y-1">
                            <p className="font-semibold text-[#1a1208]">
                              Scan QR Code with any UPI app:
                            </p>
                            <p>1. Open GooglePay, PhonePe, Paytm, or BHIM</p>
                            <p>
                              2. Scan & pay exact total: <strong>${finalTotal.toFixed(2)}</strong>
                            </p>
                            <p className="text-[#b8935a] font-medium">
                              3. Copy the 12-digit UPI Reference Number / UTR below.
                            </p>
                          </div>
                        </div>

                        {/* UTR Reference Input */}
                        <div className="bg-white p-3.5 rounded-xl border border-[#e8d9c0]/80">
                          <label className="block text-xs font-semibold text-[#1a1208] mb-1">
                            UPI Reference Number / UTR (12 Digits) <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. 428901234567 or GPay Transaction ID"
                            value={upiTransactionId}
                            onChange={(e) => {
                              setUpiTransactionId(e.target.value);
                              if (errorMessage) setErrorMessage(null);
                            }}
                            className="w-full bg-[#faf6ef]/50 border border-[#e8d9c0] focus:border-[#b8935a] focus:bg-white rounded-xl py-2 px-3 text-xs text-[#1a1208] placeholder-[#9c8e7b] outline-none transition font-mono"
                          />
                          <p className="text-[10px] text-[#6b5c44] mt-1.5 leading-relaxed">
                            Every bank generates a 12-digit UTR reference upon completion. Our team validates this directly with our bank ledger before dispatching your formulations.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Option 3: Razorpay (Cards, NetBanking, Automated UPI) */}
                  <div
                    onClick={() => {
                      setPaymentMethod("razorpay");
                      if (!isRazorpayActive) {
                        setErrorMessage(
                          "Notice: Razorpay is currently unavailable. Please select Instant UPI or Cash on Delivery to complete your purchase."
                        );
                      } else {
                        setErrorMessage(null);
                      }
                    }}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition ${
                      paymentMethod === "razorpay" || paymentMethod === "razorpay_demo"
                        ? !isRazorpayActive
                          ? "border-amber-400 bg-amber-50/30"
                          : "border-[#b8935a] bg-[#faf6ef]/60"
                        : "border-[#e8d9c0]/60 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className={`w-5 h-5 ${!isRazorpayActive ? "text-amber-600" : "text-[#b8935a]"}`} />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#1a1208]">
                              Cards, NetBanking &amp; Gateway UPI (Razorpay)
                            </span>
                            {isRazorpayActive ? (
                              <span className="text-[9px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                                Instant Popup
                              </span>
                            ) : (
                              <span className="text-[9px] bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded-full">
                                Pending Gateway Setup
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-[#6b5c44] block mt-0.5">
                            Credit/Debit Cards (Visa, Mastercard, RuPay, Amex), NetBanking, and automated UPI gateway.
                          </span>
                        </div>
                      </div>
                    </div>

                    {!isRazorpayActive && (paymentMethod === "razorpay" || paymentMethod === "razorpay_demo") && (
                      <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
                        <p className="font-semibold text-amber-800 mb-1">Payment Gateway Credentials Awaiting Setup</p>
                        <p>
                          Razorpay API credentials have not been configured in the store environment yet. To place your order right now, please select <strong>Instant UPI Scan &amp; Pay</strong> or <strong>Cash on Delivery</strong>.
                        </p>
                      </div>
                    )}

                    {isRazorpayActive && (paymentMethod === "razorpay" || paymentMethod === "razorpay_demo") && (
                      <div className="mt-3 pt-3 border-t border-[#e8d9c0]/50 text-[10px] text-[#6b5c44] flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Lock className="w-3 h-3 text-emerald-700 shrink-0" />
                          <span>PCI-DSS Level 1 256-Bit SSL Encrypted.</span>
                        </div>
                        <span className="text-[#b8935a] font-semibold">100% Secure Checkout</span>
                      </div>
                    )}
                  </div>

                </div>
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl">
                  {errorMessage}
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1a1208] text-white hover:bg-[#b8935a] py-4 rounded-full font-bold uppercase tracking-wider text-xs transition flex items-center justify-center gap-2 shadow-xl cursor-pointer disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Confirming Skincare Order...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm & Place Order (${finalTotal.toFixed(2)})</span>
                  </>
                )}
              </button>

            </div>

            {/* Right 5 Columns: Order Summary Card */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-[2rem] border border-[#e8d9c0]/60 shadow-xs space-y-6 sticky top-24">
              
              <div className="pb-3 border-b border-[#e8d9c0]/40 flex justify-between items-center">
                <h3 className="text-lg font-serif lobster-two-bold text-[#1a1208]">
                  Order Summary
                </h3>
                <span className="text-xs text-[#6b5c44]">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-3.5 max-h-80 overflow-y-auto pr-1 divide-y divide-[#e8d9c0]/30">
                {items.map((item) => (
                  <div key={item.product.id} className="pt-3.5 first:pt-0 flex gap-3 items-center justify-between">
                    <div className="relative w-14 h-14 rounded-xl bg-[#faf6ef] border border-[#e8d9c0]/40 overflow-hidden shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-[#1a1208] truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[10px] text-[#6b5c44]">
                        {item.product.size}
                      </p>
                      
                      {/* Quantity & Remove controls */}
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="inline-flex items-center border border-[#e8d9c0] rounded-full bg-[#faf6ef] px-1.5 py-0.5">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-4 h-4 flex items-center justify-center text-[#6b5c44] hover:text-[#1a1208] transition"
                            aria-label="Decrease quantity"
                            title="Decrease quantity"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="w-5 text-center text-[10px] font-bold text-[#1a1208]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-4 h-4 flex items-center justify-center text-[#6b5c44] hover:text-[#1a1208]"
                            aria-label="Increase quantity"
                            title="Increase quantity"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>
                        <span className="text-[10px] text-[#e8d9c0]">|</span>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[10px] text-red-600/80 hover:text-red-700 hover:underline transition font-medium"
                          title="Remove item from checkout"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <div className="text-right">
                        <div className="text-xs font-bold text-[#1a1208]">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-[9px] text-[#6b5c44]">
                            ${item.product.price.toFixed(2)} ea
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1.5 rounded-lg text-[#6b5c44]/60 hover:text-red-600 hover:bg-red-50 transition"
                        aria-label={`Remove ${item.product.name} from checkout`}
                        title="Remove product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Coupon Form */}
              <div className="pt-2 border-t border-[#e8d9c0]/40">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3 py-2 rounded-xl">
                    <span className="font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Code &quot;{appliedCoupon}&quot; applied
                    </span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-xs text-red-600 font-bold hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (NIIMI15)"
                      value={inputCoupon}
                      onChange={(e) => {
                        setInputCoupon(e.target.value);
                        setCouponError(null);
                      }}
                      className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#e8d9c0] bg-[#faf6ef]/30 uppercase tracking-wider focus:outline-none focus:border-[#1a1208]"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 bg-[#1a1208] text-white rounded-xl text-xs font-bold tracking-wider uppercase hover:bg-[#b8935a] transition"
                    >
                      Apply
                    </button>
                  </div>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-600 mt-1">{couponError}</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs text-[#6b5c44] border-t border-[#e8d9c0]/40 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1a1208]">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Ritual Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span>
                    {calculatedShipping === 0 ? "Complimentary" : `$${calculatedShipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#1a1208] border-t border-[#e8d9c0]/40 pt-3">
                  <span>Total Amount</span>
                  <span className="text-xl">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-[#faf6ef] p-4 rounded-2xl border border-[#e8d9c0]/50 space-y-2 text-[11px] text-[#6b5c44]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#b8935a] shrink-0" />
                  <span>30-Day Happiness Guarantee & Easy Returns</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#b8935a] shrink-0" />
                  <span>Dispatched in eco-friendly protective caskets</span>
                </div>
              </div>

            </div>

          </div>
        </form>

      </div>
    </div>
  );
}
