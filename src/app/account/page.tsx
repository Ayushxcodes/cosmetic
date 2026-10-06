"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Package,
  RotateCcw,
  Clock,
  CheckCircle2,
  MapPin,
  Sparkles,
  ArrowRight,
  LogOut,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/ecommerce";

interface CustomerOrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
}

interface CustomerOrder {
  id: string;
  createdAt: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: CustomerOrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  couponCode?: string;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  notes?: string;
  estimatedDelivery?: string;
}

export default function CustomerDashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const {
    items: cartItems,
    subtotal: cartSubtotal,
    openCart,
    removeFromCart,
    addMultipleToCart,
  } = useCart();

  const [activeTab, setActiveTab] = useState<"orders" | "cart" | "profile">("orders");
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [catalogProducts, setCatalogProducts] = useState<Product[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [reorderingOrderId, setReorderingOrderId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Authentication gate
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login?from=/account");
    }
  }, [authLoading, isAuthenticated, router]);

  // Load customer orders & product catalog
  useEffect(() => {
    if (!isAuthenticated) return;

    let isCurrent = true;
    async function loadData() {
      try {
        setLoadingOrders(true);
        const [ordersRes, productsRes] = await Promise.all([
          fetch("/api/customer/orders", { headers: { "Cache-Control": "no-cache" } }),
          fetch("/api/products", { headers: { "Cache-Control": "no-cache" } }),
        ]);

        if (ordersRes.ok) {
          const data = await ordersRes.json();
          if (isCurrent && data.success) {
            setOrders(data.orders || []);
          }
        }

        if (productsRes.ok) {
          const pData = await productsRes.json();
          if (isCurrent && Array.isArray(pData)) {
            setCatalogProducts(pData);
          }
        }
      } catch (err) {
        console.error("Failed to load customer account data:", err);
      } finally {
        if (isCurrent) setLoadingOrders(false);
      }
    }

    loadData();
    return () => {
      isCurrent = false;
    };
  }, [isAuthenticated]);

  // 1-Click Reorder handler
  const handleReorder = (order: CustomerOrder) => {
    setReorderingOrderId(order.id);

    try {
      const itemsToAdd = order.items.map((item) => {
        const found = catalogProducts.find((p) => p.id === item.productId);
        const product: Product = found || {
          id: item.productId,
          name: item.name,
          tagline: "Authentic Niimi formulation",
          category: "Serums",
          price: item.price,
          image: item.image,
          gallery: [item.image],
          description: item.name,
          benefits: [],
          ingredients: [],
          howToUse: "Apply onto cleansed skin.",
          size: item.size || "Standard",
          skinType: "All skin types",
          rating: 5.0,
          reviewCount: 1,
          stock: 10,
          isFeatured: true,
          isBestSeller: false,
          createdAt: new Date().toISOString(),
        };

        return {
          product,
          quantity: item.quantity,
          selectedSize: item.size || product.size,
        };
      });

      addMultipleToCart(itemsToAdd);
      setSuccessMessage(`Order #${order.id} items added to your ritual bag!`);
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (e) {
      console.error("Reorder failed:", e);
    } finally {
      setReorderingOrderId(null);
    }
  };

  if (authLoading || (!isAuthenticated && !user)) {
    return (
      <div className="min-h-screen bg-[#faf6ef] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#b8935a] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const customerName = user?.name || "Valued Patron";
  const customerEmail = user?.email || "";
  const totalSpent = orders.reduce((acc, o) => acc + (o.paymentStatus === "paid" ? o.total : 0), 0);

  return (
    <div className="min-h-screen bg-[#faf6ef] text-[#1a1208] pb-24">
      {/* Top Banner / Breadcrumb */}
      <div className="border-b border-[#e8d9c0]/60 bg-white/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#6b5c44]">
            <Link href="/" className="hover:text-[#1a1208] transition">
              Home
            </Link>
            <span>/</span>
            <span className="font-semibold text-[#1a1208]">Client Atelier & Dashboard</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <Link
              href="/shop"
              className="text-[#6b5c44] hover:text-[#1a1208] flex items-center gap-1 transition"
            >
              <span>Explore Formulations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={logout}
              className="text-red-600/80 hover:text-red-700 flex items-center gap-1 transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 sm:pt-12">
        {/* Profile Welcome Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#e8d9c0]/80 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#f3ebd9] to-[#e8d9c0] flex items-center justify-center text-2xl font-serif text-[#1a1208] border border-[#d4af72]/30 shadow-inner">
                {customerName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>

              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-xl sm:text-2xl font-serif lobster-two-bold text-[#1a1208]">
                    Welcome, {customerName}
                  </h1>
                  <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200/70 text-amber-800 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full">
                    <Sparkles className="w-3 h-3 text-[#b8935a]" /> Member
                  </span>
                </div>
                <p className="text-xs text-[#6b5c44] mt-1">{customerEmail}</p>
                <p className="text-[11px] text-[#b8935a] font-medium tracking-wide mt-1">
                  Niimi J-Beauty Connoisseur • Kyoto Fermentation Heritage
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 border-t sm:border-t-0 sm:border-l border-[#e8d9c0]/60 pt-4 sm:pt-0 sm:pl-8">
              <div className="text-center sm:text-left">
                <span className="block text-[10px] uppercase tracking-wider text-[#6b5c44]">
                  Total Orders
                </span>
                <span className="text-lg sm:text-xl font-bold font-serif text-[#1a1208]">
                  {orders.length}
                </span>
              </div>
              <div className="text-center sm:text-left">
                <span className="block text-[10px] uppercase tracking-wider text-[#6b5c44]">
                  In Ritual Bag
                </span>
                <span className="text-lg sm:text-xl font-bold font-serif text-[#1a1208]">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
                </span>
              </div>
              <div className="text-center sm:text-left">
                <span className="block text-[10px] uppercase tracking-wider text-[#6b5c44]">
                  Total Rituals
                </span>
                <span className="text-lg sm:text-xl font-bold font-serif text-[#1a1208]">
                  ${totalSpent.toFixed(0)}
                </span>
              </div>
            </div>
          </div>

          {/* Toast Notification */}
          {successMessage && (
            <div className="mt-6 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center justify-between animate-in fade-in">
              <span className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {successMessage}
              </span>
              <button
                type="button"
                onClick={openCart}
                className="font-bold underline text-emerald-900 hover:text-emerald-950"
              >
                View Bag
              </button>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="flex border-b border-[#e8d9c0]/50 mt-8 gap-2 sm:gap-6 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab("orders")}
              className={`pb-3 text-xs sm:text-sm font-semibold uppercase tracking-wider transition border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === "orders"
                  ? "border-[#1a1208] text-[#1a1208]"
                  : "border-transparent text-[#6b5c44] hover:text-[#1a1208]"
              }`}
            >
              <span className="flex items-center gap-2">
                <Package className="w-4 h-4" /> Past Orders & Reorder ({orders.length})
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("cart")}
              className={`pb-3 text-xs sm:text-sm font-semibold uppercase tracking-wider transition border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === "cart"
                  ? "border-[#1a1208] text-[#1a1208]"
                  : "border-transparent text-[#6b5c44] hover:text-[#1a1208]"
              }`}
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" /> Current Ritual Bag ({cartItems.length})
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("profile")}
              className={`pb-3 text-xs sm:text-sm font-semibold uppercase tracking-wider transition border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === "profile"
                  ? "border-[#1a1208] text-[#1a1208]"
                  : "border-transparent text-[#6b5c44] hover:text-[#1a1208]"
              }`}
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Saved Atelier Address
              </span>
            </button>
          </div>
        </div>

        {/* Tab 1: Orders & Reorder */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            {loadingOrders ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#e8d9c0]/80">
                <div className="w-8 h-8 border-2 border-[#b8935a] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-xs text-[#6b5c44]">Loading your order archives...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 sm:p-16 text-center border border-[#e8d9c0]/80">
                <div className="w-16 h-16 rounded-full bg-[#faf6ef] flex items-center justify-center text-[#b8935a] mx-auto mb-4 border border-[#e8d9c0]/60">
                  <Package className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-serif lobster-two-bold text-[#1a1208] mb-1">
                  No Past Orders Recorded Yet
                </h3>
                <p className="text-xs text-[#6b5c44] max-w-md mx-auto mb-6">
                  Explore our authentic Japanese skincare formulations, curated directly with
                  fermented galactomyces and camellia seed botanicals.
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-[#1a1208] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#b8935a] transition"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              orders.map((order) => {
                const isReordering = reorderingOrderId === order.id;
                const statusColor =
                  order.orderStatus === "delivered"
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                    : order.orderStatus === "shipped"
                    ? "bg-blue-50 text-blue-800 border-blue-200"
                    : "bg-amber-50 text-amber-800 border-amber-200";

                return (
                  <div
                    key={order.id}
                    className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8d9c0]/80 shadow-xs transition hover:shadow-md"
                  >
                    {/* Order Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-[#e8d9c0]/40 gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-serif font-bold text-sm sm:text-base text-[#1a1208]">
                            #{order.id}
                          </span>
                          <span
                            className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${statusColor}`}
                          >
                            {order.orderStatus}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#6b5c44] mt-1 flex items-center gap-2">
                          <Clock className="w-3 h-3" /> Placed on{" "}
                          {new Date(order.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>

                      {/* 1-Click Reorder Button */}
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleReorder(order)}
                          disabled={isReordering}
                          className="inline-flex items-center gap-1.5 bg-[#faf6ef] hover:bg-[#1a1208] text-[#1a1208] hover:text-white border border-[#e8d9c0] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition shadow-2xs cursor-pointer disabled:opacity-50"
                        >
                          <RotateCcw className={`w-3.5 h-3.5 ${isReordering ? "animate-spin" : ""}`} />
                          <span>{isReordering ? "Reordering..." : "Reorder All Items"}</span>
                        </button>
                      </div>
                    </div>

                    {/* Order Items List */}
                    <div className="py-5 space-y-4 divide-y divide-[#e8d9c0]/20">
                      {order.items.map((item, idx) => (
                        <div
                          key={`${item.productId}-${idx}`}
                          className="pt-3 first:pt-0 flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            <div className="relative w-14 h-14 rounded-xl bg-[#faf6ef] border border-[#e8d9c0]/50 overflow-hidden shrink-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-contain p-1"
                              />
                            </div>

                            <div className="min-w-0">
                              <h4 className="text-xs font-semibold text-[#1a1208] truncate">
                                {item.name}
                              </h4>
                              <p className="text-[10px] text-[#6b5c44] mt-0.5">
                                {item.size || "Standard"} • Qty: {item.quantity}
                              </p>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="text-xs font-bold text-[#1a1208]">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                            <span className="block text-[10px] text-[#6b5c44]">
                              ${item.price.toFixed(2)} ea
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Footer & Price Summary */}
                    <div className="pt-4 border-t border-[#e8d9c0]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#faf6ef]/40 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-6 rounded-b-3xl">
                      <div className="text-xs text-[#6b5c44] space-y-0.5">
                        <p>
                          <span className="font-semibold text-[#1a1208]">Destination:</span>{" "}
                          {order.customer.address}, {order.customer.city}
                        </p>
                        <p>
                          <span className="font-semibold text-[#1a1208]">Payment:</span>{" "}
                          {order.paymentMethod.toUpperCase()} ({order.paymentStatus})
                          {order.couponCode && ` • Code: ${order.couponCode}`}
                        </p>
                      </div>

                      <div className="text-right sm:text-right">
                        <span className="text-[10px] uppercase tracking-wider text-[#6b5c44] block">
                          Total Paid
                        </span>
                        <span className="text-base sm:text-lg font-bold font-serif text-[#1a1208]">
                          ${order.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Tab 2: Current Ritual Bag (Cart) */}
        {activeTab === "cart" && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#e8d9c0]/80 shadow-xs">
            <div className="flex justify-between items-center pb-4 border-b border-[#e8d9c0]/40 mb-6">
              <div>
                <h3 className="text-base sm:text-lg font-serif lobster-two-bold text-[#1a1208]">
                  Your Current Ritual Bag
                </h3>
                <p className="text-xs text-[#6b5c44]">
                  Ready to be packaged with complimentary ceremonial boxes.
                </p>
              </div>

              <span className="text-xs font-semibold text-[#b8935a]">
                {cartItems.length} {cartItems.length === 1 ? "formulation" : "formulations"}
              </span>
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-12 h-12 text-[#b8935a]/60 mx-auto mb-3" />
                <p className="text-xs text-[#6b5c44] mb-4">Your bag is currently empty.</p>
                <Link
                  href="/shop"
                  className="bg-[#1a1208] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#b8935a] transition inline-block"
                >
                  Explore Collection
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-4 divide-y divide-[#e8d9c0]/30">
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="pt-4 first:pt-0 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="relative w-16 h-16 rounded-xl bg-[#faf6ef] border border-[#e8d9c0]/50 overflow-hidden shrink-0">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-contain p-1"
                          />
                        </div>

                        <div className="min-w-0">
                          <h4 className="text-xs font-semibold text-[#1a1208] truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-[10px] text-[#6b5c44]">
                            {item.selectedSize || item.product.size}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[11px] font-bold text-[#1a1208]">
                              Qty: {item.quantity}
                            </span>
                            <span className="text-[10px] text-[#e8d9c0]">|</span>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-[10px] text-red-600/80 hover:text-red-700 hover:underline transition font-medium flex items-center gap-1"
                            >
                              <Trash2 className="w-3 h-3" /> Remove
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-sm font-bold text-[#1a1208]">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        <span className="block text-[10px] text-[#6b5c44]">
                          ${item.product.price.toFixed(2)} each
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-[#e8d9c0]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-[#6b5c44]">Bag Subtotal:</span>
                    <span className="text-lg font-bold font-serif text-[#1a1208] ml-2">
                      ${cartSubtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={openCart}
                      className="border border-[#e8d9c0] text-[#1a1208] px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#faf6ef] transition"
                    >
                      Open Slide Bag
                    </button>
                    <Link
                      href="/checkout"
                      className="bg-[#1a1208] text-white hover:bg-[#b8935a] px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition flex items-center gap-2"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Saved Address & Atelier Profile */}
        {activeTab === "profile" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8d9c0]/80 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#e8d9c0]/40">
                <MapPin className="w-4 h-4 text-[#b8935a]" />
                <h3 className="font-serif font-bold text-sm text-[#1a1208]">
                  Default Delivery Atelier
                </h3>
              </div>

              <div className="text-xs space-y-2 text-[#6b5c44]">
                <p>
                  <strong className="text-[#1a1208] block">Recipient:</strong>
                  {customerName}
                </p>
                <p>
                  <strong className="text-[#1a1208] block">Address:</strong>
                  402 Omkar Heights, Nariman Point
                </p>
                <p>
                  <strong className="text-[#1a1208] block">City / State:</strong>
                  Mumbai, Maharashtra - 400021, India
                </p>
                <p>
                  <strong className="text-[#1a1208] block">Phone:</strong>
                  +91 98765 43210
                </p>
              </div>

              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-medium">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Verified Delivery Destination
                </span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8d9c0]/80 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#e8d9c0]/40">
                <Sparkles className="w-4 h-4 text-[#b8935a]" />
                <h3 className="font-serif font-bold text-sm text-[#1a1208]">
                  Client Privilege Tier
                </h3>
              </div>

              <div className="text-xs space-y-3 text-[#6b5c44]">
                <div className="p-3 bg-[#faf6ef] rounded-2xl border border-[#e8d9c0]/50">
                  <h4 className="font-bold text-[#1a1208] text-xs">
                    Niimi Inner Circle Connoisseur
                  </h4>
                  <p className="text-[11px] text-[#6b5c44] mt-0.5">
                    Complimentary domestic express delivery on all orders over $50, bespoke
                    wooden cosmetic spatula with each ritual order, and preview access to limited
                    seasonal Kyoto harvest batches.
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs pt-2">
                  <span>Registered Account Email:</span>
                  <span className="font-semibold text-[#1a1208]">{customerEmail}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
