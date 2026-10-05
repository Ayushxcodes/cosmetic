"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { CheckCircle2 } from "lucide-react";

export default function ToastNotification() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[90] max-w-sm bg-[#1a1208] text-white px-4 py-3 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <CheckCircle2 className="w-5 h-5 text-[#b8935a] shrink-0" />
      <span className="text-xs font-medium tracking-wide leading-snug">
        {toastMessage}
      </span>
    </div>
  );
}
