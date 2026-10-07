"use client";
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { Product } from "@/types/ecommerce";

interface CosmeticCategoryItem {
  id: string;
  title: string;
  desc: string;
  image: string;
  href: string;
}

interface HeroSectionProps {
  products?: Product[];
  loading?: boolean;
}

export default function HeroSection({
  products: propProducts,
  loading: propLoading,
}: HeroSectionProps = {}) {
  const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);
  const [fetching, setFetching] = useState<boolean>(!propProducts || propProducts.length === 0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    if (propProducts && propProducts.length > 0) return;
    let isMounted = true;
    async function load() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          if (isMounted) setFetchedProducts(data);
        }
      } catch (e) {
        console.error("HeroSection error loading products:", e);
      } finally {
        if (isMounted) setFetching(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [propProducts]);

  const products = propProducts && propProducts.length > 0 ? propProducts : fetchedProducts;
  const loading = propLoading ?? (propProducts && propProducts.length > 0 ? false : fetching);

  const bgImages = [
    "/hero_model_portrait.png",
    "/model_face_mask.png",
    "/facial_treatment.png",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [bgImages.length]);

  // Dynamically extract categories from DB products
  const categories = useMemo(() => {
    if (!products || products.length === 0) return [];
    const map = new Map<string, string>();
    products.forEach((p) => {
      if (!map.has(p.category)) {
        map.set(p.category, p.image);
      }
    });
    return Array.from(map.entries()).map(([name, image]) => ({
      name,
      href: `/shop?category=${encodeURIComponent(name)}`,
      image,
    }));
  }, [products]);

  // Dynamically build carousel items from database products
  const carouselItems: CosmeticCategoryItem[] = useMemo(() => {
    if (!products || products.length === 0) return [];
    const featured = products.filter((p) => p.isFeatured);
    const list = featured.length >= 3 ? featured : products;
    return list.slice(0, 5).map((p, idx) => ({
      id: String(idx + 1).padStart(2, "0"),
      title: p.name,
      desc: p.tagline || p.description,
      image: p.image,
      href: `/shop/${p.id}`,
    }));
  }, [products]);

  const totalItems = carouselItems.length;
  const currentIdx = totalItems > 0 ? carouselIndex % totalItems : 0;
  const activeItem = totalItems > 0 ? carouselItems[currentIdx] : null;

  const handleNext = () => {
    if (totalItems > 0) {
      setCarouselIndex((prev) => (prev + 1) % totalItems);
    }
  };

  const handlePrev = () => {
    if (totalItems > 0) {
      setCarouselIndex((prev) => (prev - 1 + totalItems) % totalItems);
    }
  };

  return (
    <section className="relative min-h-screen w-full bg-[#87675d] overflow-hidden text-white flex flex-col justify-between pt-24 pb-12 px-6 sm:px-12 md:px-16">
      
      {/* ── Background Face Portrait Slideshow ── */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-3/5 h-full pointer-events-none z-0">
        {bgImages.map((src, idx) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              bgIndex === idx ? "opacity-60 lg:opacity-85" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt="Model beauty background"
              fill
              priority={idx === 0}
              className="object-cover object-center lg:object-right-top mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#87675d] via-[#87675d]/60 to-transparent lg:from-[#87675d] lg:via-[#87675d]/20" />
          </div>
        ))}
      </div>

      {/* ── Hero Content Container ── */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto w-full max-w-7xl mx-auto">
        
        {/* Left Side Column */}
        <div className="lg:col-span-6 flex flex-col gap-6 max-w-xl">
          <div>
            <span className="text-xs tracking-[0.25em] text-[#e8d9c0] uppercase font-bold block mb-1">
              Niimi Cosmetics — Japanese Botanical Heritage • 日本の美
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-serif leading-[1.1] lobster-two-bold tracking-wide">
              Authentic Japanese <span className="underline decoration-white/20">Cosmetics</span>
            </h2>
          </div>
          
          <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-md">
            Directly formulated in Japanese botanical ateliers. Rooted in traditional Hakko fermentation science and rare East Asian botanicals for radiant porcelain glass skin.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#87675d] text-xs font-bold uppercase tracking-widest hover:bg-[#faf6ef] hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Shop Collection <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/rituals"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest hover:bg-white/20 hover:scale-105 transition-all duration-300"
            >
              Discover Rituals
            </Link>
          </div>

          {/* Category Thumbnail Links (Derived dynamically from DB products) */}
          <div className="flex flex-wrap gap-4 sm:gap-5 pt-2">
            {loading && categories.length === 0 ? (
              <div className="flex gap-3">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="w-20 h-20 rounded-2xl bg-white/10 animate-pulse" />
                ))}
              </div>
            ) : (
              categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className="flex flex-col items-center gap-2 group transition-all duration-300 cursor-pointer"
                >
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-white/30 group-hover:border-white group-hover:scale-105 shadow-lg group-hover:shadow-2xl transition-all duration-300 bg-white/10 backdrop-blur-xs p-1">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover rounded-xl group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-[11px] sm:text-xs uppercase tracking-widest font-bold text-white/90 group-hover:text-white transition-colors">
                    {cat.name}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Right Side Column (Gallery View Badge) */}
        <div className="lg:col-span-6 flex justify-end lg:pr-12">
          <Link
            href="/rituals"
            className="relative group cursor-pointer flex flex-col items-center gap-2"
          >
            <div className="w-24 h-24 rounded-full border border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-sm group-hover:scale-110 group-hover:bg-white/20 group-hover:border-white transition-all duration-300 shadow-xl">
              <Play className="w-8 h-8 text-white fill-white ml-1 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-white/90 group-hover:text-white transition-colors">
              Gallery & Rituals
            </span>
          </Link>
        </div>

      </div>

      {/* ── Bottom Section (Carousel + Slider Progress) ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Carousel Slider Indicator */}
        {activeItem ? (
          <div className="flex items-center gap-4 text-sm font-semibold tracking-wider w-full md:w-auto">
            <span>{activeItem.id}</span>
            <div className="relative h-[2px] bg-white/20 w-32 md:w-48 overflow-hidden rounded-full">
              <div 
                className="absolute left-0 top-0 h-full bg-white transition-all duration-500 rounded-full"
                style={{ 
                  width: `${((currentIdx + 1) / totalItems) * 100}%`,
                }}
              />
            </div>
            <span className="text-white/50">{`0${totalItems}`}</span>

            {/* Nav arrows */}
            <div className="flex items-center gap-2 ml-4">
              <button 
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white/50 transition cursor-pointer"
                aria-label="Previous product"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white/50 transition cursor-pointer"
                aria-label="Next product"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="w-48 h-6 bg-white/10 rounded-full animate-pulse" />
        )}

        {/* Carousel Cards (Single Card view with dynamic DB product) */}
        {activeItem ? (
          <Link
            href={activeItem.href}
            className="w-full md:max-w-lg flex items-center gap-5 bg-white/15 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/40 p-4 rounded-2xl shadow-xl transition-all duration-300 group cursor-pointer"
          >
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 bg-white/20 p-1">
              <Image 
                src={activeItem.image} 
                alt={activeItem.title}
                fill
                className="object-cover rounded-lg group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-base sm:text-lg font-serif font-bold tracking-wider uppercase text-white/95 leading-tight mb-1 group-hover:text-white transition-colors truncate">
                {activeItem.title}
              </h4>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed line-clamp-2">
                {activeItem.desc}
              </p>
            </div>
            <div 
              className="w-10 h-10 rounded-full bg-white text-[#87675d] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#faf6ef] transition-transform duration-300 flex-shrink-0 shadow-sm"
              aria-label="View Product"
            >
              <ArrowRight className="w-5 h-5" />
            </div>
          </Link>
        ) : (
          <div className="w-full md:max-w-lg h-28 bg-white/10 rounded-2xl animate-pulse" />
        )}

      </div>
      
    </section>
  );
}
