"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  CheckCircle2,
  Package,
  Calendar,
  Printer,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
import { Order } from "@/types/ecommerce";

export default function OrderSuccessPage() {
  const params = useParams();
  const id = params?.id as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await fetch(`/api/orders/${id}`);
        if (res.ok) {
          const data = await res.json();
          setOrder(data);
        }
      } catch (e) {
        console.error("Failed to load order:", e);
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchOrder();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf6ef] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-[#b8935a] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs uppercase tracking-widest text-[#6b5c44]">Finalizing Your Order...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#faf6ef] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-serif lobster-two-bold text-[#1a1208] mb-2">Order Record Not Found</h2>
        <p className="text-xs text-[#6b5c44] mb-6">We could not locate this order reference in our system.</p>
        <Link
          href="/shop"
          className="bg-[#1a1208] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#b8935a] transition"
        >
          Return to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#faf6ef] min-h-screen text-[#1a1208] py-16 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Celebration Header Card */}
        <div className="bg-white rounded-[2.5rem] border border-[#e8d9c0]/70 p-8 sm:p-12 text-center shadow-sm relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#b8935a]">
            Thank You For Your Order
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif lobster-two-bold text-[#1a1208] mt-2 mb-3">
            Your Ritual is Being Prepared
          </h1>
          <p className="text-xs sm:text-sm text-[#6b5c44] max-w-lg mx-auto leading-relaxed">
            We have received your order <strong>#{order.id}</strong>. A confirmation has been sent to <strong>{order.customer.email}</strong>. Our estheticians are hand-packing your formulations with care.
          </p>

          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 text-xs text-[#6b5c44] bg-[#faf6ef] px-6 py-3 rounded-2xl border border-[#e8d9c0]/60">
            <span className="flex items-center gap-1.5">
              <Package className="w-4 h-4 text-[#b8935a]" /> Status: <strong className="uppercase text-[#1a1208] font-bold">{order.orderStatus}</strong>
            </span>
            <span className="h-3 w-px bg-[#e8d9c0]" />
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#b8935a]" /> Est. Arrival: <strong className="text-[#1a1208]">{order.estimatedDelivery || "3-4 Days"}</strong>
            </span>
          </div>
        </div>

        {/* Invoice & Order Summary */}
        <div className="bg-white rounded-[2.5rem] border border-[#e8d9c0]/70 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-[#e8d9c0]/40">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#6b5c44] block font-semibold">
                Order Reference
              </span>
              <span className="text-base font-bold text-[#1a1208]">
                #{order.id}
              </span>
            </div>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 text-xs text-[#6b5c44] hover:text-[#1a1208] border border-[#e8d9c0] px-3.5 py-1.5 rounded-full transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </button>
          </div>

          {/* Delivery & Payment Info Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#6b5c44] bg-[#faf6ef]/50 p-5 rounded-2xl border border-[#e8d9c0]/40">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#b8935a] block mb-1">
                Recipient & Delivery Address
              </span>
              <p className="font-semibold text-[#1a1208]">{order.customer.fullName}</p>
              <p>{order.customer.address}</p>
              <p>{order.customer.city}, {order.customer.state} - {order.customer.postalCode}</p>
              <p className="mt-1">{order.customer.phone}</p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#b8935a] block mb-1">
                Payment Details
              </span>
              <p className="font-semibold text-[#1a1208] uppercase">
                {order.paymentMethod === "cod"
                  ? "Cash on Delivery (COD)"
                  : order.paymentMethod === "upi"
                  ? "Instant UPI Scan & Pay"
                  : "Razorpay Online Payment"}
              </p>
              <p className="capitalize">
                Payment Status: <strong className="text-emerald-700">{order.paymentStatus}</strong>
              </p>
              {order.notes && (
                <p className="mt-2 text-[11px] italic text-[#6b5c44]">
                  Note: &quot;{order.notes}&quot;
                </p>
              )}
            </div>
          </div>

          {/* Ordered Items Table */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1a1208] block">
              Items Ordered ({order.items.length})
            </span>
            <div className="divide-y divide-[#e8d9c0]/30">
              {order.items.map((item, index) => (
                <div key={index} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl bg-[#faf6ef] border border-[#e8d9c0]/50 overflow-hidden shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-[#1a1208]">{item.name}</h4>
                      <p className="text-[11px] text-[#6b5c44]">
                        Qty: {item.quantity} {item.size ? `• ${item.size}` : ""}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#1a1208]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Totals Summary */}
          <div className="space-y-2 text-xs text-[#6b5c44] border-t border-[#e8d9c0]/40 pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-[#1a1208]">${order.subtotal.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Ritual Coupon Savings {order.couponCode ? `(${order.couponCode})` : ""}</span>
                <span>-${order.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{order.shippingFee === 0 ? "Complimentary" : `$${order.shippingFee.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-[#1a1208] border-t border-[#e8d9c0]/40 pt-3">
              <span>Grand Total</span>
              <span className="text-xl">${order.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <Link
              href="/shop"
              className="flex-1 bg-[#1a1208] text-white hover:bg-[#b8935a] py-3.5 rounded-full font-bold uppercase tracking-wider text-xs transition flex items-center justify-center gap-2 text-center"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
            <Link
              href="/account"
              className="flex-1 bg-[#faf6ef] text-[#1a1208] border border-[#e8d9c0] hover:border-[#1a1208] py-3.5 rounded-full font-bold uppercase tracking-wider text-xs transition flex items-center justify-center gap-2 text-center"
            >
              <span>View My Orders</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
