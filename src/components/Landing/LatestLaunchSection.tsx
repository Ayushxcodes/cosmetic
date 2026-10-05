"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/ecommerce";

interface LatestLaunchSectionProps {
  products?: Product[];
  loading?: boolean;
}

export default function LatestLaunchSection({
  products: propProducts,
  loading: propLoading,
}: LatestLaunchSectionProps) {
  const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);
  const [fetching, setFetching] = useState<boolean>(!propProducts || propProducts.length === 0);
  const [rotate, setRotate] = useState(0);
  const [selectedTab, setSelectedTab] = useState<string>("");

  const products = propProducts && propProducts.length > 0 ? propProducts : fetchedProducts;
  const loading = propLoading ?? (propProducts && propProducts.length > 0 ? false : fetching);

  const { addToCart } = useCart();

  // If propProducts wasn't passed, fetch directly from DB endpoint
  useEffect(() => {
    if (propProducts && propProducts.length > 0) {
      return;
    }

    let isMounted = true;
    async function loadLatestProducts() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data: Product[] = await res.json();
          if (isMounted) {
            setFetchedProducts(data);
          }
        }
      } catch (e) {
        console.error("Failed to load products from database for LatestLaunchSection:", e);
      } finally {
        if (isMounted) {
          setFetching(false);
        }
      }
    }

    loadLatestProducts();
    return () => {
      isMounted = false;
    };
  }, [propProducts]);

  // Extract distinct categories from database products
  const categories = useMemo(() => {
    const list = Array.from(new Set(products.map((p) => p.category))).filter(Boolean);
    return list.length > 0 ? list : ["Serums", "Masks", "Cleansers", "Eye Care"];
  }, [products]);

  // Derived active tab: if selectedTab is in categories, use it; otherwise default to categories[0]
  const activeTab = useMemo(() => {
    if (selectedTab && categories.includes(selectedTab)) {
      return selectedTab;
    }
    return categories[0] || "";
  }, [selectedTab, categories]);

  // Select active product from database matching current tab
  const activeProduct = useMemo(() => {
    if (products.length === 0) return null;
    return (
      products.find(
        (p) => p.category.toLowerCase() === activeTab.toLowerCase()
      ) || products[0]
    );
  }, [products, activeTab]);

  const handleNextTab = () => {
    if (categories.length === 0) return;
    const idx = categories.indexOf(activeTab);
    const nextIdx = (idx + 1) % categories.length;
    setSelectedTab(categories[nextIdx]);
    setRotate((r) => r + 90);
  };

  const handlePrevTab = () => {
    if (categories.length === 0) return;
    const idx = categories.indexOf(activeTab);
    const prevIdx = (idx - 1 + categories.length) % categories.length;
    setSelectedTab(categories[prevIdx]);
    setRotate((r) => r - 90);
  };

  // Prepare gallery thumbnails from DB product
  const thumbnails = useMemo(() => {
    if (!activeProduct) return ["/cosmetic1.avif", "/cosmetic2.avif"];
    const list =
      activeProduct.gallery && activeProduct.gallery.length > 0
        ? activeProduct.gallery
        : [activeProduct.image];

    if (list.length === 1) {
      return [list[0], list[0]];
    }
    return list.slice(0, 3);
  }, [activeProduct]);

  if (loading && products.length === 0) {
    return (
      <section className="bg-[#faf6ef]/30 w-full py-20 px-6 sm:px-12 md:px-16 border-t border-[#e8d9c0]/30">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center py-20 text-[#6b5c44]">
          <div className="w-8 h-8 border-2 border-[#b8935a] border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-xs uppercase tracking-widest font-semibold text-[#8a7b68]">
            Loading latest launches from database...
          </p>
        </div>
      </section>
    );
  }

  if (!activeProduct) {
    return null;
  }

  return (
    <section className="bg-[#faf6ef]/30 w-full py-20 px-6 sm:px-12 md:px-16 border-t border-[#e8d9c0]/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Top bar with heading and categories */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-4 border-b border-[#e8d9c0]/20">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#b8935a]" />
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#b8935a]">
                Live Storefront Launches
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1a1208] lobster-two-bold">
              Latest Product Launch <br className="hidden sm:inline" /> Available Now!
            </h2>
            <p className="text-xs text-[#6b5c44] tracking-widest uppercase mt-2 font-semibold">
              Sourced Directly from Our Master Atelier Collection
            </p>
          </div>

          {/* Interactive tabs dynamically loaded from PostgreSQL categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedTab(cat);
                  setRotate((r) => r + 45);
                }}
                className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === cat
                    ? "bg-[#1a1208] text-white border border-[#1a1208] shadow-xs"
                    : "bg-white/80 text-[#6b5c44] border border-[#e8d9c0] hover:bg-white hover:text-[#1a1208]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Layout: Thumbnails & Navigation, Rotating Dial, and Product Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center mt-6">
          {/* 1. Left Column: Navigation & Product Thumbnails */}
          <div className="md:col-span-3 flex flex-row md:flex-col justify-between md:justify-center items-center gap-6">
            {/* Nav buttons */}
            <div className="flex gap-3">
              <button
                onClick={handlePrevTab}
                className="w-10 h-10 rounded-full border border-[#1a1208]/20 flex items-center justify-center hover:bg-[#1a1208] hover:text-white hover:border-[#1a1208] transition cursor-pointer"
                aria-label="Previous category"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextTab}
                className="w-10 h-10 rounded-full border border-[#1a1208]/20 flex items-center justify-center hover:bg-[#1a1208] hover:text-white hover:border-[#1a1208] transition cursor-pointer"
                aria-label="Next category"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Overlapping Arched thumbnails */}
            <div className="flex gap-4 md:flex-col items-center mt-4">
              {thumbnails.map((src, i) => (
                <div
                  key={`${src}-${i}`}
                  className="relative w-16 sm:w-20 aspect-[2/3] rounded-[1.25rem] overflow-hidden shadow-xs border border-[#e8d9c0]/60 bg-white transform md:-rotate-3 hover:rotate-0 transition duration-300"
                >
                  <Image
                    src={src}
                    alt={`${activeProduct.name} thumbnail ${i + 1}`}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 2. Center Column: Large rotating Dial spinner */}
          <div className="md:col-span-5 flex justify-center items-center relative py-6">
            <div className="relative w-72 h-72 sm:w-85 sm:h-85 flex items-center justify-center">
              {/* Rotating outer text SVG */}
              <div
                className="absolute inset-0 w-full h-full animate-[spin_60s_linear_infinite]"
                style={{
                  transform: `rotate(${rotate}deg)`,
                  transition: "transform 1s cubic-bezier(0.25, 1, 0.5, 1)",
                }}
              >
                <svg className="w-full h-full" viewBox="0 0 300 300">
                  <defs>
                    <path
                      id="textPath"
                      d="M 150, 150 m -120, 0 a 120,120 0 1,1 240,0 a 120,120 0 1,1 -240,0"
                    />
                  </defs>
                  <text className="text-[10px] uppercase font-bold tracking-[0.22em] fill-[#6b5c44]">
                    <textPath href="#textPath" startOffset="0%">
                      Revitalize Your Skin and Spirit at Our Beauty Center • Revitalize Your Skin and Spirit •
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Central diverse models circle */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <Image
                  src="/diverse_models.png"
                  alt="Radiant models"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* 3. Right Column: Detailed Product Card */}
          <div className="md:col-span-4 flex flex-col gap-4 bg-white p-6 sm:p-8 rounded-[2.5rem] border border-[#e8d9c0]/60 shadow-sm relative">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#b8935a]">
                {activeProduct.category}
              </span>
              {activeProduct.isBestSeller && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#faf6ef] border border-[#e8d9c0] text-[9px] uppercase font-bold text-[#1a1208]">
                  Bestseller
                </span>
              )}
            </div>

            <Link href={`/shop/${activeProduct.id}`}>
              <h3 className="text-xl sm:text-2xl font-serif text-[#1a1208] lobster-two-bold leading-tight hover:text-[#b8935a] transition">
                {activeProduct.name}
              </h3>
            </Link>

            <p className="text-xs text-[#8a7b68] italic font-serif">
              {activeProduct.tagline}
            </p>

            <p className="text-xs text-[#6b5c44] leading-relaxed line-clamp-3">
              {activeProduct.description}
            </p>

            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-xl font-serif font-bold text-[#1a1208]">
                ${activeProduct.price.toFixed(2)}
              </span>
              {activeProduct.originalPrice && (
                <span className="text-xs text-[#8a7b68] line-through">
                  ${activeProduct.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="ml-auto text-[10px] text-[#8a7b68]">
                {activeProduct.size}
              </span>
            </div>

            <div className="flex flex-col gap-2.5 mt-2">
              <button
                onClick={() => addToCart(activeProduct, 1)}
                className="w-full bg-[#1a1208] text-white py-3.5 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-[#b8935a] transition flex items-center justify-center gap-2 group cursor-pointer shadow-sm"
              >
                <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition" />
                <span>Add to Cart (${activeProduct.price.toFixed(2)})</span>
              </button>

              <Link
                href={`/shop/${activeProduct.id}`}
                className="w-full text-center py-2 text-xs font-semibold text-[#6b5c44] hover:text-[#1a1208] transition"
              >
                View Full Formulation Details →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
