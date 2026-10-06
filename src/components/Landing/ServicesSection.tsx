"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles, ShieldCheck } from "lucide-react";

interface CosmeticCategoryItem {
  name: string;
  japaneseName: string;
  tagline: string;
  origin: string;
  avatar: string;
  href: string;
}

export default function ServicesSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const categories: CosmeticCategoryItem[] = [
    {
      name: "Botanical Serums",
      japaneseName: "美容液 (Biyōeki)",
      tagline: "Fermented Galactomyces & Kyoto Camellia Japonica for luminous glass skin",
      origin: "Kyoto Ateliers",
      avatar: "/cosmetic1.avif",
      href: "/shop?category=Serums",
    },
    {
      name: "Hydro-Plumping Masks",
      japaneseName: "フェイスマスク (Mask)",
      tagline: "Deep-sea Okinawa mineral replenishment & bio-cellulose saturation",
      origin: "Okinawa Marine Labs",
      avatar: "/cosmetic2.avif",
      href: "/shop?category=Masks",
    },
    {
      name: "Rice & Matcha Cleansers",
      japaneseName: "洗顔料 (Sengan-ryō)",
      tagline: "Ceremonial Uji matcha & fermented rice micro-foam barrier defense",
      origin: "Uji Green Tea Estates",
      avatar: "/cosmetic3.avif",
      href: "/shop?category=Cleansers",
    },
    {
      name: "Restorative Eye Elixirs",
      japaneseName: "アイケア (Eye Care)",
      tagline: "Yoshino cherry blossom polyphenols & firming bio-peptides",
      origin: "Nara Botanical Labs",
      avatar: "/cosmetic4.avif",
      href: "/shop?category=Eye%20Care",
    },
    {
      name: "Barrier Creams & Balms",
      japaneseName: "保湿クリーム (Cream)",
      tagline: "Hokkaido plant squalane & bio-ceramide lipid matrix recovery",
      origin: "Hokkaido Bio-Ateliers",
      avatar: "/cream_swatch.png",
      href: "/shop?category=Creams%20%26%20Balms",
    },
  ];

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
            {categories.map((item, idx) => (
              <Link
                key={item.name}
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
                      <span className="text-base sm:text-lg font-serif font-bold text-[#1a1208] group-hover:text-[#b8935a] transition-colors">
                        {item.name}
                      </span>
                      <span className="text-[11px] font-sans text-[#8a7b68] font-medium hidden sm:inline">
                        {item.japaneseName}
                      </span>
                    </div>
                    <p className="text-xs text-[#6b5c44] leading-snug truncate max-w-sm">
                      {item.tagline}
                    </p>
                    <span className="text-[10px] uppercase tracking-wider text-[#b8935a] font-semibold mt-0.5">
                      Origin: {item.origin}
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
            ))}
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
              src="/cream_on_hand.png"
              alt="Authentic Japanese botanical cream application"
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
