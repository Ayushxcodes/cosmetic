"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Plus, Minus, Trash2, ArrowRight, Sparkles, ShoppingBag, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingFee,
    discount,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);

  const freeShippingThreshold = 50;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

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

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300 ease-out"
        onClick={closeCart}
      />

      {/* Drawer panel */}
      <div className="relative w-full max-w-md bg-[#faf6ef] text-[#1a1208] h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300 border-l border-[#e8d9c0]">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#e8d9c0]/60 flex items-center justify-between bg-white/60">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#b8935a]" />
            <h2 className="text-xl font-serif text-[#1a1208] lobster-two-bold">
              Your Ritual Bag
            </h2>
            <span className="text-xs bg-[#b8935a]/15 text-[#8f6d37] font-bold px-2 py-0.5 rounded-full">
              {items.length} {items.length === 1 ? "item" : "items"}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-full text-[#6b5c44] hover:text-[#1a1208] hover:bg-black/5 transition"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="bg-[#f3ebd9] px-6 py-3 border-b border-[#e8d9c0]/50">
          <div className="flex justify-between items-center text-xs mb-1.5 font-medium text-[#6b5c44]">
            {remainingForFreeShipping > 0 ? (
              <span>
                Add <strong className="text-[#1a1208] font-bold">${remainingForFreeShipping.toFixed(2)}</strong> more for <span className="text-[#8f6d37] font-semibold">Free Express Delivery</span>
              </span>
            ) : (
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> You unlocked Free Express Shipping!
              </span>
            )}
            <span className="text-[11px] font-bold">{Math.round(progressToFreeShipping)}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#e2d5c0] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#b8935a] transition-all duration-500 rounded-full"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Cart items scrollable container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="w-16 h-16 rounded-full bg-[#f3ebd9] flex items-center justify-center text-[#b8935a] mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-serif lobster-two-bold text-[#1a1208] mb-1">
                Your Bag is Empty
              </h3>
              <p className="text-xs text-[#6b5c44] max-w-xs mb-6">
                Discover our curated formulations and create your personalized daily skincare ritual.
              </p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="bg-[#1a1208] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#b8935a] transition"
              >
                Explore Shop
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 p-3.5 bg-white rounded-2xl border border-[#e8d9c0]/50 shadow-xs hover:border-[#b8935a]/40 transition"
              >
                {/* Thumbnail */}
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#faf6ef] shrink-0 border border-[#e8d9c0]/30">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-contain p-1.5"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="text-sm font-semibold text-[#1a1208] line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-[#6b5c44]">
                        {item.product.size}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-[#6b5c44]/60 hover:text-red-600 transition p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center border border-[#e8d9c0] rounded-full bg-[#faf6ef] px-2 py-0.5">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-5 h-5 flex items-center justify-center text-[#6b5c44] hover:text-[#1a1208]"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-[#1a1208]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-5 h-5 flex items-center justify-center text-[#6b5c44] hover:text-[#1a1208]"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-sm font-bold text-[#1a1208]">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Summary / Checkout */}
        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-[#e8d9c0]/60 space-y-4">
            
            {/* Promo Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3 py-2 rounded-xl">
                  <span className="font-semibold">Code: {appliedCoupon} applied</span>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-red-600 font-bold hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. NIIMI15)"
                    value={inputCoupon}
                    onChange={(e) => {
                      setInputCoupon(e.target.value);
                      setCouponError(null);
                    }}
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#e8d9c0] bg-[#faf6ef]/50 uppercase tracking-wider focus:outline-none focus:border-[#1a1208]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1a1208] text-white rounded-xl text-xs font-bold tracking-wider uppercase hover:bg-[#b8935a] transition"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && (
                <p className="text-[11px] text-red-600 mt-1">{couponError}</p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#6b5c44] border-t border-[#e8d9c0]/40 pt-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#1a1208]">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Ritual Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? "Complimentary" : `$${shippingFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#1a1208] border-t border-[#e8d9c0]/40 pt-2">
                <span>Estimated Total</span>
                <span className="text-base">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Testing Phase Notice in Drawer */}
            <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-center text-[11px] text-amber-900 font-medium">
              <span>⚠️ Testing Phase: Order placement is currently paused.</span>
            </div>

            {/* Checkout CTA */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="w-full bg-[#1a1208] text-white py-3.5 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-[#b8935a] transition flex items-center justify-center gap-2 group shadow-md"
            >
              <span>Review Bag & Order Preview</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </Link>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#6b5c44]/70">
              <ShieldCheck className="w-3.5 h-3.5 text-[#b8935a]" />
              <span>Complimentary Returns & 100% Authentic Quality</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
