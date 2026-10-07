"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Star,
  Heart,
  ShoppingBag,
  Check,
  Truck,
  Shield,
  RotateCcw,
  Sparkles,
  Plus,
  Minus,
} from "lucide-react";
import { Product } from "@/types/ecommerce";
import { useCart } from "@/context/CartContext";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"ingredients" | "howToUse" | "benefits">("benefits");

  const { addToCart, wishlist, toggleWishlist } = useCart();

  useEffect(() => {
    async function loadData() {
      try {
        const [prodRes, allRes] = await Promise.all([
          fetch(`/api/products/${id}`),
          fetch("/api/products"),
        ]);

        if (prodRes.ok) {
          const prodData = await prodRes.json();
          setProduct(prodData);
          setSelectedImage(prodData.image);
        }
        if (allRes.ok) {
          const allData = await allRes.json();
          setAllProducts(allData);
        }
      } catch (e) {
        console.error("Error loading product detail:", e);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf6ef] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-[#b8935a] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs uppercase tracking-widest text-[#6b5c44]">Revealing Formulation...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#faf6ef] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-serif lobster-two-bold text-[#1a1208] mb-2">Formulation Not Found</h2>
        <p className="text-xs text-[#6b5c44] mb-6">The product you are looking for may have been archived or moved.</p>
        <Link
          href="/shop"
          className="bg-[#1a1208] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#b8935a] transition"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const isWish = wishlist.includes(product.id);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const galleryImages = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || p.isFeatured))
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push("/checkout");
  };

  return (
    <div className="w-full bg-[#faf6ef] min-h-screen text-[#1a1208] pb-24">
      
      {/* Top Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6">
        <div className="flex items-center gap-2 text-xs text-[#6b5c44]">
          <Link href="/" className="hover:text-[#1a1208]">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#1a1208]">Shop</Link>
          <span>/</span>
          <span className="text-[#b8935a] font-semibold">{product.category}</span>
          <span>/</span>
          <span className="text-[#1a1208] font-medium truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      {/* Main Product Showcase */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            
            {/* Thumbnails list */}
            {galleryImages.length > 1 && (
              <div className="flex md:flex-col gap-3 overflow-x-auto shrink-0">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-24 h-24 rounded-2xl overflow-hidden border-2 bg-white transition cursor-pointer p-1 shadow-xs ${
                      selectedImage === img
                        ? "border-[#b8935a] shadow-md ring-2 ring-[#b8935a]/30"
                        : "border-[#e8d9c0]/60 hover:border-[#1a1208]"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${idx}`}
                      fill
                      className="object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Stage Image */}
            <div className="flex-1 relative aspect-square min-h-[420px] max-h-[620px] rounded-[2.5rem] bg-gradient-to-b from-[#faf6ef]/40 via-white to-[#faf6ef]/30 border border-[#e8d9c0]/70 overflow-hidden shadow-sm flex items-center justify-center p-4 sm:p-6 group">
              <Image
                src={selectedImage || product.image}
                alt={product.name}
                fill
                priority
                className="object-contain p-2 drop-shadow-2xl group-hover:scale-105 transition duration-500"
              />

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-6 right-6 w-11 h-11 rounded-full bg-[#faf6ef] flex items-center justify-center text-[#6b5c44] hover:text-red-500 shadow-sm transition z-10"
                aria-label="Wishlist toggle"
              >
                <Heart
                  className={`w-5 h-5 ${isWish ? "fill-red-500 text-red-500" : ""}`}
                />
              </button>
            </div>

          </div>

          {/* Right Column: Product Details & Purchase Form */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            <div>
              {/* Badges */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#b8935a] bg-[#b8935a]/10 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                {product.isBestSeller && (
                  <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-white bg-[#1a1208] px-3 py-1 rounded-full">
                    Best Seller
                  </span>
                )}
                {product.stock > 0 && product.stock <= 10 && (
                  <span className="text-[10px] uppercase font-bold tracking-[0.15em] text-red-600 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
                    Only {product.stock} left in stock!
                  </span>
                )}
              </div>

              {/* Title & Tagline */}
              <h1 className="text-3xl sm:text-4xl font-serif lobster-two-bold text-[#1a1208] leading-tight">
                {product.name}
              </h1>
              <p className="text-sm text-[#6b5c44] mt-2 font-medium">
                {product.tagline}
              </p>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center text-[#b8935a]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-[#b8935a] text-[#b8935a]"
                          : "text-[#e8d9c0]"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#1a1208]">
                  {product.rating}
                </span>
                <span className="text-xs text-[#6b5c44]">
                  ({product.reviewCount} verified client reviews)
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 bg-white rounded-2xl border border-[#e8d9c0]/60 flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-bold text-[#1a1208]">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#6b5c44]/60 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      Save {discountPercent}%
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#6b5c44] mt-0.5">
                  Taxes included. Complimentary shipping on orders over $50.
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-semibold text-[#1a1208] block">Size</span>
                <span className="text-xs text-[#b8935a] font-medium">{product.size}</span>
              </div>
            </div>

            {/* Description Summary */}
            <p className="text-xs sm:text-sm text-[#6b5c44] leading-relaxed">
              {product.description}
            </p>

            {/* Attributes Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white/70 rounded-xl border border-[#e8d9c0]/50">
                <span className="text-[10px] uppercase font-bold text-[#b8935a] tracking-wider block">Skin Type</span>
                <span className="text-[#1a1208] font-medium">{product.skinType}</span>
              </div>
              <div className="p-3 bg-white/70 rounded-xl border border-[#e8d9c0]/50">
                <span className="text-[10px] uppercase font-bold text-[#b8935a] tracking-wider block">Formulation</span>
                <span className="text-[#1a1208] font-medium">Cruelty-Free, Clean J-Beauty</span>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1a1208]">
                  Quantity
                </span>
                <div className="flex items-center border border-[#e8d9c0] rounded-full bg-white px-3 py-1 shadow-xs">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-7 h-7 flex items-center justify-center text-[#6b5c44] hover:text-[#1a1208]"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-[#1a1208]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="w-7 h-7 flex items-center justify-center text-[#6b5c44] hover:text-[#1a1208]"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Ready for dispatch
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#1a1208] text-white hover:bg-[#b8935a] py-4 rounded-full font-bold uppercase tracking-wider text-xs transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Ritual Bag</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-[#b8935a] text-white hover:bg-[#a07e49] py-4 rounded-full font-bold uppercase tracking-wider text-xs transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <span>Instant Buy Now</span>
                </button>
              </div>
            </div>

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-3 gap-3 border-t border-[#e8d9c0]/50 pt-5 text-[11px] text-[#6b5c44]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#b8935a] shrink-0" />
                <span>Express 48h Dispatch</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#b8935a] shrink-0" />
                <span>100% Genuine Formula</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#b8935a] shrink-0" />
                <span>30-Day Guarantee</span>
              </div>
            </div>

            {/* Accordion Tabs */}
            <div className="border border-[#e8d9c0]/70 rounded-2xl bg-white overflow-hidden shadow-xs mt-2">
              <div className="flex border-b border-[#e8d9c0]/60">
                <button
                  onClick={() => setActiveTab("benefits")}
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition ${
                    activeTab === "benefits"
                      ? "bg-[#faf6ef] text-[#1a1208] border-b-2 border-[#b8935a]"
                      : "text-[#6b5c44] hover:text-[#1a1208]"
                  }`}
                >
                  Key Benefits
                </button>
                <button
                  onClick={() => setActiveTab("ingredients")}
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition ${
                    activeTab === "ingredients"
                      ? "bg-[#faf6ef] text-[#1a1208] border-b-2 border-[#b8935a]"
                      : "text-[#6b5c44] hover:text-[#1a1208]"
                  }`}
                >
                  Ingredients
                </button>
                <button
                  onClick={() => setActiveTab("howToUse")}
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition ${
                    activeTab === "howToUse"
                      ? "bg-[#faf6ef] text-[#1a1208] border-b-2 border-[#b8935a]"
                      : "text-[#6b5c44] hover:text-[#1a1208]"
                  }`}
                >
                  Ritual Steps
                </button>
              </div>

              <div className="p-5 text-xs text-[#6b5c44] leading-relaxed">
                {activeTab === "benefits" && (
                  <ul className="space-y-2">
                    {product.benefits?.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-[#1a1208]">
                        <Sparkles className="w-3.5 h-3.5 text-[#b8935a] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === "ingredients" && (
                  <div className="space-y-3">
                    <p className="text-[11px] text-[#6b5c44]">
                      Every Niimi formula is free from parabens, synthetic fragrances, micro-plastics, and harsh sulfates.
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {product.ingredients?.map((ing, i) => (
                        <span
                          key={i}
                          className="bg-[#faf6ef] text-[#1a1208] border border-[#e8d9c0] px-2.5 py-1 rounded-md text-[11px] font-medium"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "howToUse" && (
                  <div className="space-y-2">
                    <p className="text-[#1a1208]">{product.howToUse}</p>
                    <p className="text-[11px] text-[#6b5c44] italic">
                      Tip: For enhanced absorption, gently press with warm palms for 10 seconds.
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Related Ritual Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-12 border-t border-[#e8d9c0]/60">
            <div className="flex justify-between items-end mb-8">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#b8935a]">
                  Synergistic Skincare
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif lobster-two-bold text-[#1a1208] mt-1">
                  Complete Your Daily Ritual
                </h3>
              </div>
              <Link
                href="/shop"
                className="text-xs uppercase font-bold text-[#b8935a] hover:text-[#1a1208] transition"
              >
                View Full Collection →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/shop/${rel.id}`}
                  className="bg-white rounded-[2rem] p-5 border border-[#e8d9c0]/50 hover:border-[#b8935a]/50 shadow-xs hover:shadow-md transition flex flex-col justify-between group"
                >
                  <div className="relative aspect-square rounded-2xl bg-[#faf6ef]/50 overflow-hidden mb-4 p-4">
                    <Image
                      src={rel.image}
                      alt={rel.name}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#b8935a] tracking-wider">
                      {rel.category}
                    </span>
                    <h4 className="text-base font-serif lobster-two-bold text-[#1a1208] group-hover:text-[#b8935a] transition line-clamp-1">
                      {rel.name}
                    </h4>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm font-bold text-[#1a1208]">
                        ${rel.price.toFixed(2)}
                      </span>
                      <span className="text-xs uppercase font-bold text-[#1a1208] group-hover:underline">
                        Discover →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
