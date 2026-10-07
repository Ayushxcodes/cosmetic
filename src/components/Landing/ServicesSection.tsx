"use client";
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles, ShieldCheck } from "lucide-react";
import { Product } from "@/types/ecommerce";

interface ServicesSectionProps {
  products?: Product[];
  loading?: boolean;
}

export default function ServicesSection({
  products: propProducts,
  loading: propLoading,
}: ServicesSectionProps = {}) {
  const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);
  const [fetching, setFetching] = useState<boolean>(!propProducts || propProducts.length === 0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    if (propProducts && propProducts.length > 0) return;
    let isMounted = true;
    async function loadServicesProducts() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          if (isMounted) setFetchedProducts(data);
        }
      } catch (e) {
        console.error("ServicesSection error loading products:", e);
      } finally {
        if (isMounted) setFetching(false);
      }
    }
    loadServicesProducts();
    return () => {
      isMounted = false;
    };
  }, [propProducts]);

  const products = propProducts && propProducts.length > 0 ? propProducts : fetchedProducts;
  const loading = propLoading ?? (propProducts && propProducts.length > 0 ? false : fetching);

  // Dynamically derive category showcases from database products
  const categories = useMemo(() => {
    if (!products || products.length === 0) return [];
    
    // Group products by category, pick top product for each category
    const map = new Map<string, Product>();
    products.forEach((p) => {
      if (!map.has(p.category)) {
        map.set(p.category, p);
      }
    });

    return Array.from(map.entries()).map(([catName, prod]) => ({
      name: prod.name,
      categoryName: catName,
      tagline: prod.tagline || prod.description,
      origin: "Japan Formulations",
      avatar: prod.image,
      href: `/shop?category=${encodeURIComponent(catName)}`,
    }));
  }, [products]);

  return (
    <section className="bg-white w-full py-20 px-6 sm:px-12 md:px-16 border-t border-[#e8d9c0]/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Japanese Cosmetics Categories list */}
        <div className="lg:col-span-6 flex flex-col gap-8 w-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#e8d9c0]/40">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-[#b8935a]" />
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#b8935a]">
                  Authentic J-Beauty Heritage • 日本原産
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#1a1208] lobster-two-bold">
                Japanese Cosmetics Categories
              </h2>
              <p className="text-xs text-[#6b5c44] tracking-widest uppercase mt-1 font-semibold">
                Formulated with Ancient Fermentation Science & Rare Botanicals
              </p>
            </div>

            <Link 
              href="/shop" 
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1a1208] hover:text-[#b8935a] transition self-start sm:self-auto shrink-0"
            >
              Shop All <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex flex-col">
            {loading && categories.length === 0 ? (
              <div className="space-y-4 py-4">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="flex items-center gap-4 py-3 animate-pulse">
                    <div className="w-14 h-14 rounded-2xl bg-[#faf6ef]" />
                    <div className="flex-1 space-y-2">
                      <div className="w-48 h-4 bg-[#faf6ef] rounded" />
                      <div className="w-64 h-3 bg-[#faf6ef] rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              categories.map((item, idx) => (
                <Link
                  key={item.categoryName}
                  href={item.href}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="flex items-center justify-between py-4.5 border-b border-[#e8d9c0]/20 group transition-all duration-300 hover:bg-[#faf6ef]/30 px-2 rounded-xl"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    {/* Thumbnail Avatar */}
                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-[#e8d9c0]/60 bg-[#faf6ef] flex-shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-300">
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        fill
                        className="object-contain p-1.5"
                      />
                    </div>
                    
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-base sm:text-lg font-serif font-bold text-[#1a1208] group-hover:text-[#b8935a] transition-colors truncate">
                          {item.name}
                        </span>
                        <span className="text-[11px] font-sans text-[#8a7b68] font-medium hidden sm:inline">
                          ({item.categoryName})
                        </span>
                      </div>
                      <p className="text-xs text-[#6b5c44] leading-snug truncate max-w-sm">
                        {item.tagline}
                      </p>
                      <span className="text-[10px] uppercase tracking-wider text-[#b8935a] font-semibold mt-0.5">
                        Category: {item.categoryName}
                      </span>
                    </div>
                  </div>

                  {/* Arrow indicator */}
                  <div className={`w-9 h-9 rounded-full border border-[#1a1208]/20 flex items-center justify-center transition-all duration-300 shrink-0 ml-3 ${
                    hoveredIdx === idx ? "bg-[#1a1208] text-white border-[#1a1208] translate-x-1" : "bg-transparent text-[#1a1208]"
                  }`}>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Japanese Origin & Craftsmanship Showcase */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch w-full">
          
          {/* Card 1: Japanese Model & Formulation Seal */}
          <div className="relative aspect-[3/4] sm:aspect-auto sm:h-full min-h-[420px] rounded-[2.5rem] overflow-hidden group shadow-md border border-[#e8d9c0]/40 flex flex-col justify-between p-6 sm:p-8 bg-[#1a1208] text-white">
            <Image
              src="/diverse_models.png"
              alt="Japanese cosmetic formulation models"
              fill
              className="object-cover opacity-60 group-hover:scale-105 group-hover:opacity-70 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1208] via-[#1a1208]/40 to-transparent pointer-events-none" />

            {/* Top Seal Badge */}
            <div className="relative z-10 self-start">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[10px] uppercase font-bold tracking-widest text-white">
                <ShieldCheck className="w-3.5 h-3.5 text-[#b8935a]" />
                Made in Japan • 日本品質
              </span>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 flex flex-col gap-2 mt-auto">
              <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#b8935a]">
                Bio-Fermented Skincare
              </span>
              <h3 className="text-2xl font-serif lobster-two-bold leading-tight">
                Hakko (発酵) Fermentation Mastery
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Traditional Japanese slow-fermentation micro-refines botanical actives so nutrients penetrate deeply without surface irritation.
              </p>
              <Link
                href="/shop"
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white hover:text-[#b8935a] transition"
              >
                Discover Formulations <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Japanese Botanical Texture & Swatch Card */}
          <div className="relative aspect-[3/4] sm:aspect-auto sm:h-full min-h-[420px] rounded-[2.5rem] overflow-hidden shadow-md border border-[#e8d9c0]/40 flex flex-col justify-between p-6 sm:p-8 bg-[#faf6ef]">
            <Image
              src="/JUNSUHADA/Latte Botanical/latte_4sku.jpg"
              alt="Authentic Japanese botanical skincare ritual"
              fill
              className="object-cover opacity-40 group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#faf6ef] via-[#faf6ef]/70 to-transparent pointer-events-none" />

            {/* Top Badge */}
            <div className="relative z-10 self-start">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#e8d9c0] text-[10px] uppercase font-bold tracking-widest text-[#6b5c44]">
                <Sparkles className="w-3.5 h-3.5 text-[#b8935a]" />
                Pure Botanicals
              </span>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 flex flex-col gap-2.5 mt-auto">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#b8935a]">
                  Tokyo & Kyoto Laboratories
                </span>
                <h3 className="text-2xl font-serif lobster-two-bold text-[#1a1208] leading-tight">
                  Ceremonial Purity
                </h3>
              </div>

              <div className="space-y-2 py-2 border-y border-[#e8d9c0]/60 text-xs text-[#6b5c44]">
                <div className="flex items-center justify-between">
                  <span>Fermented Rice Filtrate</span>
                  <strong className="text-[#1a1208]">100% Niigata</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Camellia Japonica Seed Oil</span>
                  <strong className="text-[#1a1208]">Cold-Pressed</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Deep-Sea Mineral Water</span>
                  <strong className="text-[#1a1208]">Okinawa Trench</strong>
                </div>
              </div>

              <Link
                href="/shop"
                className="w-full mt-1 py-3 rounded-full bg-[#1a1208] text-white text-xs font-bold uppercase tracking-wider text-center hover:bg-[#b8935a] transition duration-200"
              >
                Shop Japanese Cosmetics
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
