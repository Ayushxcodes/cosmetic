"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Package,
  ShoppingBag,
  AlertTriangle,
  Plus,
  Trash2,
  Edit3,
  CheckCircle,
  Search,
  ExternalLink,
  DollarSign,
  Eye,
  X,
  CreditCard,
  RefreshCw,
  LogOut,
  ShieldCheck,
  Check,
  Wallet,
  Building,
  Truck,
  ShieldAlert,
} from "lucide-react";

import { Product, Order, OrderStatus, PaymentStatus, SettlementStatus } from "@/types/ecommerce";
import { useAuth } from "@/context/AuthContext";

const PRESET_IMAGES = [
  { label: "Prism Serum (Vial)", src: "/cosmetic1.avif" },
  { label: "Botanical Mask (Bottle)", src: "/cosmetic2.avif" },
  { label: "Pure Zen (Dropper)", src: "/cosmetic3.avif" },
  { label: "Bloom Eye Cream (Dropper)", src: "/cosmetic4.avif" },
  { label: "Velvet Cream Swatch", src: "/cream_swatch.png" },
  { label: "Whipped Hand Cream", src: "/cream_on_hand.png" },
  { label: "Luxury Ritual Box Set", src: "/cosmetic_product_bg.png" },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const { logout: authLogout } = useAuth();
  const [adminUser, setAdminUser] = useState<{
    id: string;
    email: string;
    name: string;
    role: string;
  } | null>(null);
  const [authChecking, setAuthChecking] = useState(true);

  const [activeTab, setActiveTab] = useState<"products" | "orders" | "razorpay">("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchProductQuery, setSearchProductQuery] = useState("");
  const [searchOrderQuery, setSearchOrderQuery] = useState("");

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Form state for adding/editing product
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    category: "Serums" as Product["category"],
    price: "",
    originalPrice: "",
    stock: "50",
    size: "50ml / 1.7 fl oz",
    skinType: "All Skin Types, Sensitive",
    image: "/cosmetic1.avif",
    description: "",
    benefits: "Restores moisture barrier\nImparts luminous glow\nDermatologist tested",
    ingredients: "Camellia Seed Oil, Fermented Rice Extract, Squalane, Hyaluronic Acid",
    howToUse: "Apply 3-4 drops to cleansed skin morning and evening.",
    isFeatured: true,
    isBestSeller: false,
  });

  const [formSaving, setFormSaving] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  const showSuccess = (msg: string) => {
    setActionSuccessMsg(msg);
    setTimeout(() => setActionSuccessMsg(null), 3500);
  };

  const handleLogout = async () => {
    await authLogout();
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [pRes, oRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/orders"),
      ]);
      if (pRes.ok) setProducts(await pRes.json());
      if (oRes.ok) setOrders(await oRes.json());
    } catch (e) {
      console.error("Failed to load admin data:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    async function loadInitial() {
      try {
        // 1. Verify executive authentication
        const meRes = await fetch("/api/auth/me");
        if (!meRes.ok) {
          router.push("/login?from=/admin");
          return;
        }
        const meData = await meRes.json();
        if (!meData.authenticated || !meData.admin || (meData.admin.role !== "admin" && meData.admin.role !== "superadmin")) {
          router.push("/shop");
          return;
        }

        if (!ignore) {
          setAdminUser(meData.admin);
          setAuthChecking(false);
        }

        // 2. Fetch catalog & orders
        const [pRes, oRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/orders"),
        ]);
        if (!ignore) {
          if (pRes.ok) setProducts(await pRes.json());
          if (oRes.ok) setOrders(await oRes.json());
          setLoading(false);
        }
      } catch (e) {
        if (!ignore) {
          console.error("Failed to load initial admin data:", e);
          setLoading(false);
          setAuthChecking(false);
        }
      }
    }
    loadInitial();
    return () => {
      ignore = true;
    };
  }, [router]);

  // Metrics & Financial Reconciliation
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === "paid" ? o.total : o.total), 0);
  const totalOrdersCount = orders.length;
  const lowStockCount = products.filter((p) => p.stock < 15).length;
  const averageOrderValue = totalOrdersCount > 0 ? totalRevenue / totalOrdersCount : 0;

  // Payout reconciliation breakdown
  const upiOrders = orders.filter((o) => o.paymentMethod === "upi");
  const upiSettledVolume = upiOrders
    .filter((o) => o.paymentStatus === "paid" || o.settlementStatus === "settled")
    .reduce((sum, o) => sum + o.total, 0);
  const upiPendingVerification = upiOrders.filter((o) => o.paymentStatus === "pending_verification");

  const gatewayOrders = orders.filter((o) => o.paymentMethod === "razorpay");
  const gatewayGrossVolume = gatewayOrders
    .filter((o) => o.paymentStatus === "paid")
    .reduce((sum, o) => sum + o.total, 0);
  const gatewayEstimatedFee = gatewayGrossVolume * 0.02;
  const gatewayNetPayout = Math.max(0, gatewayGrossVolume - gatewayEstimatedFee);

  const codOrders = orders.filter((o) => o.paymentMethod === "cod");
  const codRemittedVolume = codOrders
    .filter((o) => o.settlementStatus === "remitted" || o.paymentStatus === "paid")
    .reduce((sum, o) => sum + o.total, 0);
  const codPendingRemittanceVolume = codOrders
    .filter((o) => o.paymentStatus !== "paid" && o.settlementStatus !== "remitted" && o.orderStatus !== "cancelled")
    .reduce((sum, o) => sum + o.total, 0);


  // Open Add Product Modal
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      tagline: "",
      category: "Serums",
      price: "",
      originalPrice: "",
      stock: "50",
      size: "50ml / 1.7 fl oz",
      skinType: "All Skin Types, Sensitive",
      image: "/cosmetic1.avif",
      description: "",
      benefits: "Restores moisture barrier\nImparts luminous glow\nDermatologist tested",
      ingredients: "Camellia Seed Oil, Fermented Rice Extract, Squalane, Hyaluronic Acid",
      howToUse: "Apply 3-4 drops to cleansed skin morning and evening.",
      isFeatured: false,
      isBestSeller: false,
    });
    setIsAddModalOpen(true);
  };

  // Open Edit Product Modal
  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      tagline: product.tagline,
      category: product.category,
      price: product.price.toString(),
      originalPrice: product.originalPrice ? product.originalPrice.toString() : "",
      stock: product.stock.toString(),
      size: product.size,
      skinType: product.skinType,
      image: product.image,
      description: product.description,
      benefits: product.benefits?.join("\n") || "",
      ingredients: product.ingredients?.join(", ") || "",
      howToUse: product.howToUse,
      isFeatured: product.isFeatured,
      isBestSeller: product.isBestSeller,
    });
    setIsAddModalOpen(true);
  };

  // Submit Product Form (Create or Edit)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.category) return;

    setFormSaving(true);
    try {
      const payload = {
        ...(editingProduct ? { id: editingProduct.id } : {}),
        name: formData.name,
        tagline: formData.tagline || "Artisanal high-performance skincare",
        category: formData.category,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        stock: parseInt(formData.stock) || 0,
        size: formData.size,
        skinType: formData.skinType,
        image: formData.image,
        description: formData.description || "An exquisitely balanced formulation designed to nurture the skin's moisture mantle.",
        benefits: formData.benefits.split("\n").filter((b) => b.trim().length > 0),
        ingredients: formData.ingredients.split(",").map((i) => i.trim()).filter(Boolean),
        howToUse: formData.howToUse,
        isFeatured: formData.isFeatured,
        isBestSeller: formData.isBestSeller,
      };

      const res = await fetch("/api/products", {
        method: editingProduct ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showSuccess(editingProduct ? "Product updated successfully!" : "New product published to storefront!");
        setIsAddModalOpen(false);
        fetchData();
      }
    } catch (err) {
      console.error("Error saving product:", err);
    } finally {
      setFormSaving(false);
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove "${name}" from the store catalog?`)) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        showSuccess(`Product "${name}" deleted.`);
        fetchData();
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // Update Order Status
  const handleUpdateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderStatus: status }),
      });
      if (res.ok) {
        showSuccess(`Order #${orderId} marked as ${status}.`);
        fetchData();
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder((prev) => (prev ? { ...prev, orderStatus: status } : null));
        }
      }
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  // Update Payment & Settlement Status (e.g. approve UPI UTR or settle COD)
  const handleUpdatePayment = async (
    orderId: string,
    updates: {
      orderStatus?: OrderStatus;
      paymentStatus?: PaymentStatus;
      settlementStatus?: SettlementStatus;
    }
  ) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        showSuccess(`Order #${orderId} updated.`);
        fetchData();
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder((prev) => (prev ? { ...prev, ...updates } : null));
        }
      } else {
        const errData = await res.json();
        alert(errData.error || "Failed to update order payment record.");
      }
    } catch (err) {
      console.error("Error updating payment status:", err);
    }
  };

  // Filtered lists
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchProductQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchProductQuery.toLowerCase())
  );

  const filteredOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(searchOrderQuery.toLowerCase()) ||
      o.customer.fullName.toLowerCase().includes(searchOrderQuery.toLowerCase()) ||
      o.customer.email.toLowerCase().includes(searchOrderQuery.toLowerCase()) ||
      o.orderStatus.toLowerCase().includes(searchOrderQuery.toLowerCase()) ||
      o.paymentMethod.toLowerCase().includes(searchOrderQuery.toLowerCase()) ||
      (o.paymentStatus && o.paymentStatus.toLowerCase().includes(searchOrderQuery.toLowerCase())) ||
      (o.settlementStatus && o.settlementStatus.toLowerCase().includes(searchOrderQuery.toLowerCase())) ||
      (o.paymentReference && o.paymentReference.toLowerCase().includes(searchOrderQuery.toLowerCase()))
  );

  if (authChecking) {
    return (
      <div className="w-full bg-[#faf6ef] min-h-screen flex flex-col items-center justify-center text-[#6b5c44]">
        <div className="w-8 h-8 border-2 border-[#b8935a] border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-xs uppercase tracking-[0.2em] text-[#8a7b68] font-semibold">
          Verifying Admin Session...
        </p>
      </div>
    );
  }


  return (
    <div className="w-full bg-[#faf6ef] min-h-screen text-[#1a1208] py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Admin Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-[#e8d9c0]/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#b8935a]">
                Store Control Center
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif lobster-two-bold text-[#1a1208] mt-1">
              Niimi Admin Dashboard
            </h1>
            <p className="text-xs text-[#6b5c44]">
              Manage store inventory, client orders, and e-commerce configurations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {adminUser && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f3ebd9] border border-[#e2d0b5] text-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#b8935a]" />
                <span className="font-semibold text-[#1a1208]">{adminUser.name}</span>
                <span className="text-[9px] uppercase font-bold text-[#b8935a] tracking-wider bg-[#1a1208] text-[#f7f2ea] px-1.5 py-0.5 rounded-xs">
                  {adminUser.role}
                </span>
              </div>
            )}

            <button
              onClick={fetchData}
              className="p-2.5 rounded-full border border-[#e8d9c0] bg-white text-[#6b5c44] hover:text-[#1a1208] transition shadow-xs cursor-pointer"
              title="Refresh Data"
              aria-label="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>

            <Link
              href="/shop"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#e8d9c0] bg-white text-xs font-semibold text-[#1a1208] hover:bg-[#faf6ef] transition shadow-xs"
            >
              <span>Live Store</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#b8935a]" />
            </Link>

            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1a1208] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#b8935a] transition shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-red-200 bg-red-50/80 text-xs font-semibold text-red-700 hover:bg-red-100 transition shadow-xs cursor-pointer"
              title="Sign Out of Admin Console"
            >
              <LogOut className="w-3.5 h-3.5 text-red-600" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>


        {/* Global Toast Success */}
        {actionSuccessMsg && (
          <div className="p-4 bg-emerald-900 text-emerald-100 rounded-2xl flex items-center justify-between shadow-lg text-xs font-medium animate-in fade-in duration-300">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>{actionSuccessMsg}</span>
            </div>
            <button onClick={() => setActionSuccessMsg(null)}>
              <X className="w-4 h-4 text-emerald-400 hover:text-white" />
            </button>
          </div>
        )}

        {/* KPI Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-5 rounded-[1.75rem] border border-[#e8d9c0]/60 shadow-xs">
            <div className="flex justify-between items-center text-[#6b5c44] mb-2">
              <span className="text-[11px] uppercase tracking-wider font-semibold">Total Revenue</span>
              <DollarSign className="w-4 h-4 text-[#b8935a]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#1a1208]">
              ${totalRevenue.toFixed(2)}
            </div>
            <span className="text-[10px] text-emerald-700 font-medium mt-1 block">
              Live orders sales volume
            </span>
          </div>

          <div className="bg-white p-5 rounded-[1.75rem] border border-[#e8d9c0]/60 shadow-xs">
            <div className="flex justify-between items-center text-[#6b5c44] mb-2">
              <span className="text-[11px] uppercase tracking-wider font-semibold">Total Orders</span>
              <ShoppingBag className="w-4 h-4 text-[#b8935a]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#1a1208]">
              {totalOrdersCount}
            </div>
            <span className="text-[10px] text-[#6b5c44] mt-1 block">
              Avg Order: ${averageOrderValue.toFixed(2)}
            </span>
          </div>

          <div className="bg-white p-5 rounded-[1.75rem] border border-[#e8d9c0]/60 shadow-xs">
            <div className="flex justify-between items-center text-[#6b5c44] mb-2">
              <span className="text-[11px] uppercase tracking-wider font-semibold">Active Products</span>
              <Package className="w-4 h-4 text-[#b8935a]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#1a1208]">
              {products.length}
            </div>
            <span className="text-[10px] text-emerald-700 font-medium mt-1 block">
              Available in shop catalog
            </span>
          </div>

          <div className="bg-white p-5 rounded-[1.75rem] border border-[#e8d9c0]/60 shadow-xs">
            <div className="flex justify-between items-center text-[#6b5c44] mb-2">
              <span className="text-[11px] uppercase tracking-wider font-semibold">Low Stock Alerts</span>
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#1a1208]">
              {lowStockCount}
            </div>
            <span className="text-[10px] text-amber-700 font-medium mt-1 block">
              Items under 15 units
            </span>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex border-b border-[#e8d9c0]/60 gap-8 text-xs uppercase tracking-wider font-bold">
          <button
            onClick={() => setActiveTab("products")}
            className={`pb-3.5 transition border-b-2 flex items-center gap-2 ${
              activeTab === "products"
                ? "border-[#1a1208] text-[#1a1208]"
                : "border-transparent text-[#6b5c44] hover:text-[#1a1208]"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Product Catalog ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-3.5 transition border-b-2 flex items-center gap-2 ${
              activeTab === "orders"
                ? "border-[#1a1208] text-[#1a1208]"
                : "border-transparent text-[#6b5c44] hover:text-[#1a1208]"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Client Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("razorpay")}
            className={`pb-3.5 transition border-b-2 flex items-center gap-2 ${
              activeTab === "razorpay"
                ? "border-[#1a1208] text-[#1a1208]"
                : "border-transparent text-[#6b5c44] hover:text-[#1a1208]"
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Payout & Settlements</span>
            {upiPendingVerification.length > 0 && (
              <span className="bg-amber-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full animate-pulse">
                {upiPendingVerification.length}
              </span>
            )}
          </button>
        </div>

        {/* TAB 1: PRODUCT MANAGEMENT */}
        {activeTab === "products" && (
          <div className="space-y-6">
            
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="relative w-full sm:max-w-xs">
                <Search className="w-3.5 h-3.5 text-[#6b5c44]/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter products..."
                  value={searchProductQuery}
                  onChange={(e) => setSearchProductQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-full border border-[#e8d9c0] bg-white text-xs text-[#1a1208] focus:outline-none focus:ring-1 focus:ring-[#1a1208]"
                />
              </div>

              <div className="text-xs text-[#6b5c44]">
                Showing <strong>{filteredProducts.length}</strong> formulations
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-[2rem] border border-[#e8d9c0]/60 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#faf6ef] text-[#6b5c44] uppercase tracking-wider text-[10px] font-bold border-b border-[#e8d9c0]/60">
                    <tr>
                      <th className="py-4 px-6">Product</th>
                      <th className="py-4 px-4">Category</th>
                      <th className="py-4 px-4">Price</th>
                      <th className="py-4 px-4">Stock</th>
                      <th className="py-4 px-4">Badges</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e8d9c0]/40">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-[#faf6ef]/40 transition">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-xl bg-[#faf6ef] border border-[#e8d9c0]/40 overflow-hidden shrink-0">
                              <Image
                                src={p.image}
                                alt={p.name}
                                fill
                                className="object-contain p-1"
                              />
                            </div>
                            <div>
                              <Link
                                href={`/shop/${p.id}`}
                                target="_blank"
                                className="font-bold text-[#1a1208] hover:text-[#b8935a] transition flex items-center gap-1"
                              >
                                <span>{p.name}</span>
                                <ExternalLink className="w-3 h-3 opacity-40" />
                              </Link>
                              <span className="text-[11px] text-[#6b5c44] block">
                                {p.size}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-4 text-[#6b5c44] font-medium">
                          {p.category}
                        </td>

                        <td className="py-4 px-4">
                          <span className="font-bold text-[#1a1208]">
                            ${p.price.toFixed(2)}
                          </span>
                          {p.originalPrice && (
                            <span className="text-[10px] text-[#6b5c44]/60 line-through block">
                              ${p.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </td>

                        <td className="py-4 px-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              p.stock < 15
                                ? "bg-amber-100 text-amber-800"
                                : "bg-emerald-100 text-emerald-800"
                            }`}
                          >
                            {p.stock} units
                          </span>
                        </td>

                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-1">
                            {p.isBestSeller && (
                              <span className="bg-[#1a1208] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                                Best Seller
                              </span>
                            )}
                            {p.isFeatured && (
                              <span className="bg-[#b8935a] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                                Featured
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEdit(p)}
                              className="p-2 rounded-lg bg-[#faf6ef] text-[#6b5c44] hover:text-[#1a1208] hover:bg-[#e8d9c0]/50 transition"
                              title="Edit product"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id, p.name)}
                              className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                              title="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: CLIENT ORDERS */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            
            {/* Search Orders */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="relative w-full sm:max-w-xs">
                <Search className="w-3.5 h-3.5 text-[#6b5c44]/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by order ID, client, or status..."
                  value={searchOrderQuery}
                  onChange={(e) => setSearchOrderQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-full border border-[#e8d9c0] bg-white text-xs text-[#1a1208] focus:outline-none focus:ring-1 focus:ring-[#1a1208]"
                />
              </div>

              <div className="text-xs text-[#6b5c44]">
                Total Orders: <strong>{filteredOrders.length}</strong>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-[2rem] border border-[#e8d9c0]/60 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#faf6ef] text-[#6b5c44] uppercase tracking-wider text-[10px] font-bold border-b border-[#e8d9c0]/60">
                    <tr>
                      <th className="py-4 px-6">Order ID & Date</th>
                      <th className="py-4 px-4">Client</th>
                      <th className="py-4 px-4">Items</th>
                      <th className="py-4 px-4">Total</th>
                      <th className="py-4 px-4">Payment & Settlement</th>
                      <th className="py-4 px-4">Fulfillment Status</th>
                      <th className="py-4 px-6 text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e8d9c0]/40">
                    {filteredOrders.map((o) => (
                      <tr key={o.id} className="hover:bg-[#faf6ef]/40 transition">
                        <td className="py-4 px-6">
                          <span className="font-bold text-[#1a1208] block">
                            #{o.id}
                          </span>
                          <span className="text-[10px] text-[#6b5c44]">
                            {new Date(o.createdAt).toLocaleDateString()}
                          </span>
                        </td>

                        <td className="py-4 px-4">
                          <span className="font-semibold text-[#1a1208] block">
                            {o.customer.fullName}
                          </span>
                          <span className="text-[10px] text-[#6b5c44]">
                            {o.customer.city}, {o.customer.state}
                          </span>
                        </td>

                        <td className="py-4 px-4 text-[#6b5c44]">
                          {o.items.length} {o.items.length === 1 ? "item" : "items"}
                        </td>

                        <td className="py-4 px-4 font-bold text-[#1a1208]">
                          ${o.total.toFixed(2)}
                        </td>

                        <td className="py-4 px-4 space-y-1.5">
                          <div className="flex items-center gap-1.5">
                            <span className="uppercase text-[10px] font-bold text-[#1a1208]">
                              {o.paymentMethod}
                            </span>
                            {o.payoutChannel && (
                              <span className="text-[9px] text-[#8a7b68] bg-[#faf6ef] px-1.5 py-0.2 rounded border border-[#e8d9c0]/50 font-mono">
                                {o.payoutChannel === "instant_bank_upi"
                                  ? "UPI Direct"
                                  : o.payoutChannel === "gateway_t2"
                                  ? "Gateway T+2"
                                  : "COD Courier"}
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-1">
                            <span
                              className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                o.paymentStatus === "paid"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : o.paymentStatus === "pending_verification"
                                  ? "bg-amber-100 text-amber-900 border border-amber-300 animate-pulse"
                                  : o.paymentStatus === "failed"
                                  ? "bg-rose-100 text-rose-800"
                                  : "bg-stone-100 text-stone-700"
                              }`}
                            >
                              {o.paymentStatus === "pending_verification" ? "Verify UPI" : o.paymentStatus}
                            </span>
                            <span
                              className={`text-[9px] font-medium px-1.5 py-0.5 rounded ${
                                o.settlementStatus === "settled"
                                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                                  : o.settlementStatus === "remitted"
                                  ? "bg-purple-50 text-purple-700 border border-purple-200"
                                  : "bg-stone-50 text-[#8a7b68] border border-[#e8d9c0]/50"
                              }`}
                            >
                              {o.settlementStatus === "settled"
                                ? "Settled"
                                : o.settlementStatus === "remitted"
                                ? "Remitted"
                                : "Unsettled"}
                            </span>
                          </div>

                          {o.paymentReference && (
                            <div className="text-[10px] font-mono text-[#6b5c44] flex items-center gap-1" title="Payment Reference / UTR">
                              <span className="text-[#8a7b68]">Ref:</span>
                              <span className="font-semibold text-[#1a1208]">{o.paymentReference}</span>
                            </div>
                          )}

                          {o.paymentStatus === "pending_verification" && (
                            <div>
                              <button
                                onClick={() => handleUpdatePayment(o.id, { paymentStatus: "paid", settlementStatus: "settled" })}
                                className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#1a1208] text-[#faf6ef] hover:bg-[#b8935a] px-2.5 py-1 rounded-md transition shadow-xs cursor-pointer"
                              >
                                <CheckCircle className="w-3 h-3 text-emerald-400" />
                                Approve UTR
                              </button>
                            </div>
                          )}

                          {o.paymentMethod === "cod" && o.paymentStatus !== "paid" && (
                            <div>
                              <button
                                onClick={() => handleUpdatePayment(o.id, { paymentStatus: "paid", settlementStatus: "remitted", orderStatus: "delivered" })}
                                className="inline-flex items-center gap-1 text-[9px] font-bold bg-[#faf6ef] text-[#6b5c44] hover:text-[#1a1208] border border-[#e8d9c0] hover:border-[#1a1208] px-2 py-0.5 rounded-md transition cursor-pointer"
                              >
                                Mark COD Received
                              </button>
                            </div>
                          )}
                        </td>

                        <td className="py-4 px-4">
                          <select
                            value={o.orderStatus}
                            onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value as OrderStatus)}
                            className="bg-white border border-[#e8d9c0] text-xs font-semibold rounded-lg px-2.5 py-1 text-[#1a1208] focus:outline-none focus:ring-1 focus:ring-[#1a1208] cursor-pointer"
                          >
                            <option value="placed">Placed</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>

                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => setSelectedOrder(o)}
                            className="p-2 rounded-lg bg-[#faf6ef] text-[#6b5c44] hover:text-[#1a1208] transition cursor-pointer"
                            title="View order details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: PAYMENT & PAYOUT RECONCILIATION */}
        {activeTab === "razorpay" && (
          <div className="space-y-8">
            {/* Header */}
            <div className="bg-white rounded-[2.5rem] border border-[#e8d9c0]/70 p-8 sm:p-10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#faf6ef] border border-[#e8d9c0] text-[#1a1208] flex items-center justify-center font-bold text-2xl shadow-xs">
                  <Wallet className="w-7 h-7 text-[#b8935a]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-serif lobster-two-bold text-[#1a1208]">
                      Payment & Payout Reconciliation
                    </h2>
                    <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      Fraud Protected
                    </span>
                  </div>
                  <p className="text-xs text-[#6b5c44]">
                    Real-time merchant financial tracking, multi-channel payout reconciliation, and fraud prevention controls.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={fetchData}
                  className="px-4 py-2 rounded-xl bg-[#faf6ef] hover:bg-[#e8d9c0]/50 text-[#1a1208] text-xs font-semibold border border-[#e8d9c0] flex items-center gap-2 transition cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Refresh Ledger
                </button>
              </div>
            </div>

            {/* Payout Channels Metric Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Direct UPI */}
              <div className="p-6 rounded-[2rem] bg-white border border-[#e8d9c0]/70 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1a1208] flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-[#b8935a]" />
                    Direct UPI Bank Receipts
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded-full">
                    0% MDR Fee
                  </span>
                </div>

                <div>
                  <div className="text-2xl font-bold text-[#1a1208]">
                    ${upiSettledVolume.toFixed(2)}
                  </div>
                  <p className="text-[11px] text-[#6b5c44] mt-0.5">
                    Settled directly to merchant current account via IMPS/NEFT.
                  </p>
                </div>

                <div className="pt-3 border-t border-[#e8d9c0]/40 flex items-center justify-between text-xs text-[#6b5c44]">
                  <span>Awaiting UTR Match:</span>
                  <span className={`font-bold ${upiPendingVerification.length > 0 ? "text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200" : "text-emerald-700"}`}>
                    {upiPendingVerification.length} orders
                  </span>
                </div>
              </div>

              {/* Gateway (T+2) */}
              <div className="p-6 rounded-[2rem] bg-white border border-[#e8d9c0]/70 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1a1208] flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    Gateway Payouts (T+2)
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-[9px] font-bold px-2 py-0.5 rounded-full">
                    Automated Rolling
                  </span>
                </div>

                <div>
                  <div className="text-2xl font-bold text-[#1a1208]">
                    ${gatewayNetPayout.toFixed(2)}
                  </div>
                  <p className="text-[11px] text-[#6b5c44] mt-0.5">
                    Net merchant payout after estimated ~2% gateway interchange.
                  </p>
                </div>

                <div className="pt-3 border-t border-[#e8d9c0]/40 flex items-center justify-between text-xs text-[#6b5c44]">
                  <span>Gross Volume:</span>
                  <span className="font-semibold text-[#1a1208]">
                    ${gatewayGrossVolume.toFixed(2)} (${gatewayEstimatedFee.toFixed(2)} fee)
                  </span>
                </div>
              </div>

              {/* Courier COD */}
              <div className="p-6 rounded-[2rem] bg-white border border-[#e8d9c0]/70 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1a1208] flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-purple-600" />
                    Courier COD Remittances
                  </span>
                  <span className="bg-purple-100 text-purple-800 text-[9px] font-bold px-2 py-0.5 rounded-full">
                    Weekly Cycle
                  </span>
                </div>

                <div>
                  <div className="text-2xl font-bold text-[#1a1208]">
                    ${codRemittedVolume.toFixed(2)}
                  </div>
                  <p className="text-[11px] text-[#6b5c44] mt-0.5">
                    Cash collected by logistics couriers and remitted to merchant.
                  </p>
                </div>

                <div className="pt-3 border-t border-[#e8d9c0]/40 flex items-center justify-between text-xs text-[#6b5c44]">
                  <span>Pending Door Collection:</span>
                  <span className="font-semibold text-amber-800">
                    ${codPendingRemittanceVolume.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* UPI PENDING VERIFICATION QUEUE */}
            {upiPendingVerification.length > 0 && (
              <div className="bg-amber-50/60 border border-amber-200/80 rounded-[2.5rem] p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-amber-700" />
                    <h3 className="text-base font-bold text-amber-900 font-serif">
                      Action Required: UPI UTR Verification Queue ({upiPendingVerification.length})
                    </h3>
                  </div>
                  <span className="text-xs text-amber-800">
                    Verify against merchant bank statement before releasing stock for dispatch.
                  </span>
                </div>

                <div className="overflow-x-auto bg-white rounded-2xl border border-amber-200/60 shadow-xs">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#faf6ef] text-[#6b5c44] uppercase tracking-wider text-[10px] font-bold border-b border-[#e8d9c0]">
                      <tr>
                        <th className="py-3 px-4">Order ID</th>
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4">Bank UTR Reference</th>
                        <th className="py-3 px-4 text-right">Verification Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-amber-100">
                      {upiPendingVerification.map((order) => (
                        <tr key={order.id} className="hover:bg-amber-50/30 transition">
                          <td className="py-3 px-4 font-bold text-[#1a1208]">#{order.id}</td>
                          <td className="py-3 px-4">
                            <span className="font-semibold text-[#1a1208] block">{order.customer.fullName}</span>
                            <span className="text-[10px] text-[#6b5c44]">{order.customer.email}</span>
                          </td>
                          <td className="py-3 px-4 font-bold text-[#1a1208]">${order.total.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            <span className="font-mono bg-[#faf6ef] text-[#1a1208] px-2 py-0.5 rounded border border-[#e8d9c0] font-semibold">
                              {order.paymentReference || "No UTR provided"}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => handleUpdatePayment(order.id, { paymentStatus: "paid", settlementStatus: "settled" })}
                              className="px-3 py-1.5 rounded-lg bg-[#1a1208] text-[#faf6ef] hover:bg-emerald-700 text-xs font-bold inline-flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                            >
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                              Match & Approve
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* MULTI-TIER SECURITY & FRAUD PREVENTION ARCHITECTURE */}
            <div className="bg-white rounded-[2.5rem] border border-[#e8d9c0]/70 p-8 sm:p-10 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-[#e8d9c0]/50">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-serif lobster-two-bold text-[#1a1208]">
                    Security & Anti-Fraud Defense Architecture
                  </h3>
                  <p className="text-xs text-[#6b5c44]">
                    Engineered protections preventing price manipulation, spoofed transactions, and unauthorized access.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#faf6ef] border border-[#e8d9c0]/60 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span className="font-bold text-xs text-[#1a1208]">Server-Side Pricing Integrity</span>
                  </div>
                  <p className="text-[11px] text-[#6b5c44] pl-6 leading-relaxed">
                    Client prices are completely discarded on checkout. The server verifies each item against active PostgreSQL records, recalculating subtotal, coupon discounts, and shipping fees securely.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#faf6ef] border border-[#e8d9c0]/60 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span className="font-bold text-xs text-[#1a1208]">Role-Based Access Control (RBAC)</span>
                  </div>
                  <p className="text-[11px] text-[#6b5c44] pl-6 leading-relaxed">
                    Administrative endpoints (`/api/orders`, `/api/orders/[id]`) strictly validate cryptographic JWT tokens with `admin` or `superadmin` role claims, blocking customer token privilege escalation.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#faf6ef] border border-[#e8d9c0]/60 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span className="font-bold text-xs text-[#1a1208]">Anti-Spoofing UPI UTR Verification</span>
                  </div>
                  <p className="text-[11px] text-[#6b5c44] pl-6 leading-relaxed">
                    Direct QR UPI payments capture the customer&apos;s 12-digit bank reference and enter a `pending_verification` state. Inventory is held safely until the merchant approves bank receipt.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#faf6ef] border border-[#e8d9c0]/60 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span className="font-bold text-xs text-[#1a1208]">Cross-Account Order Isolation</span>
                  </div>
                  <p className="text-[11px] text-[#6b5c44] pl-6 leading-relaxed">
                    Customers can only query and view orders linked directly to their authenticated account identifier. ID enumeration and unauthorized order access return an immediate 403 Forbidden.
                  </p>
                </div>
              </div>
            </div>

            {/* GATEWAY ACTIVATION GUIDE */}
            <div className="bg-[#faf6ef]/70 p-8 rounded-[2.5rem] border border-[#e8d9c0]/70 space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#1a1208]">
                <CreditCard className="w-4 h-4 text-[#b8935a]" />
                Razorpay & Card Gateway Activation Checklist (When Ready)
              </div>
              <ol className="space-y-2 text-xs text-[#6b5c44] list-decimal list-inside leading-relaxed">
                <li>Create an account at <a href="https://razorpay.com" target="_blank" rel="noreferrer" className="text-[#b8935a] font-bold underline">dashboard.razorpay.com</a>.</li>
                <li>Generate your <strong>Key Id</strong> and <strong>Key Secret</strong> from Settings &gt; API Keys.</li>
                <li>Add them to your environment configuration file:
                  <pre className="bg-[#1a1208] text-white p-3 rounded-xl mt-2 font-mono text-[11px] overflow-x-auto">
                    NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_...{"\n"}
                    RAZORPAY_KEY_SECRET=your_secret_key
                  </pre>
                </li>
                <li>All order verification endpoints and client models are already structured to process live gateway callbacks seamlessly!</li>
              </ol>
            </div>
          </div>
        )}

        {/* MODAL: ADD / EDIT PRODUCT */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
              onClick={() => setIsAddModalOpen(false)}
            />

            <div className="relative w-full max-w-3xl bg-[#faf6ef] text-[#1a1208] rounded-[2.5rem] shadow-2xl border border-[#e8d9c0] max-h-[90vh] flex flex-col z-10 overflow-hidden animate-in zoom-in-95 duration-200">
              
              {/* Modal Header */}
              <div className="p-6 border-b border-[#e8d9c0]/70 flex items-center justify-between bg-white">
                <div>
                  <h3 className="text-xl font-serif lobster-two-bold text-[#1a1208]">
                    {editingProduct ? "Edit Product Formulation" : "Add New Product to Store"}
                  </h3>
                  <p className="text-xs text-[#6b5c44]">
                    Changes will appear immediately on the homepage catalogue and shop page.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-2 rounded-full text-[#6b5c44] hover:text-[#1a1208] hover:bg-black/5 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Form Scrollable */}
              <form onSubmit={handleSaveProduct} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
                
                {/* Name & Tagline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1a1208] mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. YUZU GLOW Vitamin C Elixir"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e8d9c0] text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#1a1208]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#6b5c44] mb-1">
                      Tagline / Short Essence
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Cellular brightening & collagen synthesis treatment"
                      value={formData.tagline}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e8d9c0] text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#1a1208]"
                    />
                  </div>
                </div>

                {/* Category, Price, Stock */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#6b5c44] mb-1">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as Product["category"] })}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#e8d9c0] text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#1a1208]"
                    >
                      <option value="Serums">Serums</option>
                      <option value="Creams & Balms">Creams & Balms</option>
                      <option value="Cleansers">Cleansers</option>
                      <option value="Masks">Masks</option>
                      <option value="Eye Care">Eye Care</option>
                      <option value="Ritual Sets">Ritual Sets</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#6b5c44] mb-1">
                      Selling Price ($) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="56.00"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e8d9c0] text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#1a1208]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#6b5c44] mb-1">
                      Compare / Original Price ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="68.00"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e8d9c0] text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#1a1208]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#6b5c44] mb-1">
                      Inventory Stock Count *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="50"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e8d9c0] text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#1a1208]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#6b5c44] mb-1">
                      Size / Volume
                    </label>
                    <input
                      type="text"
                      placeholder="50ml / 1.7 fl oz"
                      value={formData.size}
                      onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e8d9c0] text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#1a1208]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#6b5c44] mb-1">
                      Recommended Skin Type
                    </label>
                    <input
                      type="text"
                      placeholder="All Skin Types, Sensitive"
                      value={formData.skinType}
                      onChange={(e) => setFormData({ ...formData, skinType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e8d9c0] text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#1a1208]"
                    />
                  </div>
                </div>

                {/* Product Image Asset Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1a1208] mb-2">
                    Select Product Image Asset *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {PRESET_IMAGES.map((img) => (
                      <div
                        key={img.src}
                        onClick={() => setFormData({ ...formData, image: img.src })}
                        className={`p-2 rounded-2xl border-2 cursor-pointer transition flex flex-col items-center text-center ${
                          formData.image === img.src
                            ? "border-[#b8935a] bg-white shadow-md"
                            : "border-[#e8d9c0]/60 bg-white/50 hover:border-[#1a1208]"
                        }`}
                      >
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden mb-1">
                          <Image
                            src={img.src}
                            alt={img.label}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="text-[10px] font-semibold text-[#1a1208] line-clamp-1">
                          {img.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Or Custom URL */}
                  <div className="mt-3">
                    <label className="block text-[11px] text-[#6b5c44] mb-1">
                      Or Custom Image URL / Path:
                    </label>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-[#e8d9c0] text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#1a1208]"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-[#6b5c44] mb-1">
                    Product Description & Formulation Philosophy
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe formulation highlights, texture, and results..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e8d9c0] text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#1a1208]"
                  />
                </div>

                {/* Benefits & Ingredients */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#6b5c44] mb-1">
                      Key Benefits (one per line)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.benefits}
                      onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e8d9c0] text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#1a1208]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#6b5c44] mb-1">
                      Active Ingredients (comma separated)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.ingredients}
                      onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e8d9c0] text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#1a1208]"
                    />
                  </div>
                </div>

                {/* How to use */}
                <div>
                  <label className="block text-xs font-semibold text-[#6b5c44] mb-1">
                    Application / Ritual Guidelines
                  </label>
                  <input
                    type="text"
                    value={formData.howToUse}
                    onChange={(e) => setFormData({ ...formData, howToUse: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e8d9c0] text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#1a1208]"
                  />
                </div>

                {/* Flags Checkboxes */}
                <div className="flex flex-wrap gap-6 pt-2 border-t border-[#e8d9c0]/50">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#1a1208]">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="w-4 h-4 accent-[#b8935a]"
                    />
                    <span>Highlight as Featured Formulation</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#1a1208]">
                    <input
                      type="checkbox"
                      checked={formData.isBestSeller}
                      onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                      className="w-4 h-4 accent-[#b8935a]"
                    />
                    <span>Mark as Best Seller</span>
                  </label>
                </div>

                {/* Submit button */}
                <div className="pt-4 border-t border-[#e8d9c0]/60 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-6 py-3 rounded-full border border-[#e8d9c0] bg-white text-xs font-bold uppercase tracking-wider text-[#6b5c44] hover:bg-black/5 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formSaving}
                    className="px-8 py-3 rounded-full bg-[#1a1208] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#b8935a] transition flex items-center gap-2 shadow-lg disabled:opacity-70"
                  >
                    {formSaving ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>{editingProduct ? "Save Changes" : "Publish to Store"}</span>
                      </>
                    )}
                  </button>
                </div>

              </form>

            </div>
          </div>
        )}

        {/* MODAL: ORDER DETAILS */}
        {selectedOrder && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
              onClick={() => setSelectedOrder(null)}
            />

            <div className="relative w-full max-w-2xl bg-white text-[#1a1208] rounded-[2.5rem] shadow-2xl border border-[#e8d9c0] max-h-[85vh] flex flex-col z-10 overflow-hidden animate-in zoom-in-95 duration-200">
              
              <div className="p-6 border-b border-[#e8d9c0]/60 flex items-center justify-between bg-[#faf6ef]">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#b8935a]">
                    Order Inspection
                  </span>
                  <h3 className="text-xl font-serif lobster-two-bold text-[#1a1208]">
                    Order #{selectedOrder.id}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 rounded-full text-[#6b5c44] hover:text-[#1a1208]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-[#6b5c44]">
                
                {/* Client & Shipping info */}
                <div className="grid grid-cols-2 gap-4 bg-[#faf6ef]/70 p-4 rounded-2xl border border-[#e8d9c0]/40">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#b8935a] block mb-1">
                      Customer
                    </span>
                    <p className="font-semibold text-[#1a1208]">{selectedOrder.customer.fullName}</p>
                    <p>{selectedOrder.customer.email}</p>
                    <p>{selectedOrder.customer.phone}</p>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#b8935a] block mb-1">
                      Shipping Address
                    </span>
                    <p>{selectedOrder.customer.address}</p>
                    <p>{selectedOrder.customer.city}, {selectedOrder.customer.state} - {selectedOrder.customer.postalCode}</p>
                    <p>{selectedOrder.customer.country}</p>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  <span className="font-bold text-[#1a1208] uppercase tracking-wider block">
                    Items in Order ({selectedOrder.items.length})
                  </span>
                  <div className="divide-y divide-[#e8d9c0]/40">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="py-2.5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-lg bg-[#faf6ef] overflow-hidden shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <span className="font-semibold text-[#1a1208] block">{item.name}</span>
                            <span className="text-[11px] text-[#6b5c44]">Qty: {item.quantity} {item.size ? `• ${item.size}` : ""}</span>
                          </div>
                        </div>
                        <span className="font-bold text-[#1a1208]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Totals */}
                <div className="space-y-1.5 border-t border-[#e8d9c0]/40 pt-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#1a1208]">${selectedOrder.subtotal.toFixed(2)}</span>
                  </div>
                  {selectedOrder.discount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Discount ({selectedOrder.couponCode || "Coupon"})</span>
                      <span>-${selectedOrder.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{selectedOrder.shippingFee === 0 ? "Complimentary" : `$${selectedOrder.shippingFee.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#1a1208] border-t border-[#e8d9c0]/40 pt-2">
                    <span>Grand Total</span>
                    <span>${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Payment & Settlement Verification Card */}
                <div className="border-t border-[#e8d9c0]/40 pt-4 bg-[#faf6ef]/70 p-4 rounded-2xl border border-[#e8d9c0]/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#b8935a]">
                      Payment & Reconciliation Inspection
                    </span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white border border-[#e8d9c0] text-[#1a1208]">
                      {selectedOrder.payoutChannel || selectedOrder.paymentMethod}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[10px] text-[#8a7b68] block">Method & Reference:</span>
                      <span className="font-bold text-[#1a1208] uppercase block">{selectedOrder.paymentMethod}</span>
                      {selectedOrder.paymentReference ? (
                        <div className="font-mono text-[11px] text-[#1a1208] bg-white px-2 py-1 rounded border border-[#e8d9c0] mt-1 flex items-center justify-between">
                          <span>Ref: {selectedOrder.paymentReference}</span>
                        </div>
                      ) : (
                        <span className="text-[10px] text-[#8a7b68] italic">No reference recorded</span>
                      )}
                    </div>

                    <div>
                      <span className="text-[10px] text-[#8a7b68] block">Settlement Status:</span>
                      <select
                        value={selectedOrder.settlementStatus || "pending"}
                        onChange={(e) => handleUpdatePayment(selectedOrder.id, { settlementStatus: e.target.value as SettlementStatus })}
                        className="bg-white border border-[#e8d9c0] text-xs font-semibold rounded-lg px-2.5 py-1 text-[#1a1208] cursor-pointer mt-1 w-full"
                      >
                        <option value="pending">Pending Settlement</option>
                        <option value="settled">Settled (Bank Received)</option>
                        <option value="remitted">Remitted (Courier COD Received)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#e8d9c0]/50">
                    <span className="text-[10px] font-bold text-[#1a1208]">Payment Status:</span>
                    <select
                      value={selectedOrder.paymentStatus}
                      onChange={(e) => handleUpdatePayment(selectedOrder.id, { paymentStatus: e.target.value as PaymentStatus })}
                      className="bg-white border border-[#e8d9c0] text-xs font-semibold rounded-lg px-2.5 py-1 text-[#1a1208] cursor-pointer"
                    >
                      <option value="pending">Pending</option>
                      <option value="pending_verification">Pending Verification</option>
                      <option value="paid">Paid</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>

                  {selectedOrder.paymentStatus === "pending_verification" && (
                    <button
                      onClick={() => handleUpdatePayment(selectedOrder.id, { paymentStatus: "paid", settlementStatus: "settled" })}
                      className="w-full py-2 px-4 rounded-xl bg-[#1a1208] text-[#faf6ef] hover:bg-emerald-700 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-xs"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      Confirm Bank UTR Match & Mark Paid
                    </button>
                  )}

                  {selectedOrder.paymentMethod === "cod" && selectedOrder.paymentStatus !== "paid" && (
                    <button
                      onClick={() => handleUpdatePayment(selectedOrder.id, { paymentStatus: "paid", settlementStatus: "remitted", orderStatus: "delivered" })}
                      className="w-full py-2 px-4 rounded-xl bg-white text-[#1a1208] border border-[#e8d9c0] hover:border-[#1a1208] font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-purple-600" />
                      Confirm COD Cash Collected & Remitted
                    </button>
                  )}
                </div>

                {/* Fulfillment Status Update in Modal */}
                <div className="border-t border-[#e8d9c0]/40 pt-4 flex items-center justify-between">
                  <span className="font-bold text-[#1a1208]">Update Fulfillment Status:</span>
                  <select
                    value={selectedOrder.orderStatus}
                    onChange={(e) => handleUpdateOrderStatus(selectedOrder.id, e.target.value as OrderStatus)}
                    className="bg-[#faf6ef] border border-[#e8d9c0] text-xs font-semibold rounded-lg px-3 py-1.5 text-[#1a1208] cursor-pointer"
                  >
                    <option value="placed">Placed</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
