"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { Product } from "@/types/ecommerce";

interface HeroSectionProps {
  products?: Product[];
  loading?: boolean;
}

export default function HeroSection({
  products: _propProducts,
  loading: _propLoading,
}: HeroSectionProps = {}) {
  const [bgIndex, setBgIndex] = useState(0);

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

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen w-full bg-[#87675d] overflow-hidden text-white flex flex-col justify-center py-20 lg:py-28 px-6 sm:px-12 md:px-16">
      
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
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-7xl mx-auto my-auto">
        
        {/* Left Side Column */}
        <div className="lg:col-span-7 flex flex-col gap-6 max-w-xl">
          <div>
            <span className="text-xs tracking-[0.25em] text-[#e8d9c0] uppercase font-bold block mb-1">
              Niimi Cosmetics — Japanese Botanical Heritage • 日本の美
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-serif leading-[1.1] lobster-two-bold tracking-wide">
              Authentic Japanese <span className="underline decoration-white/20">Cosmetics</span>
            </h2>
          </div>
          
          <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-md">
            Directly formulated in Japanese botanical ateliers. Rooted in traditional Hakko fermentation science and rare East Asian botanicals for radiant porcelain glass skin.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#87675d] text-xs font-bold uppercase tracking-widest hover:bg-[#faf6ef] hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Shop Collection <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/rituals"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest hover:bg-white/20 hover:scale-105 transition-all duration-300"
            >
              Discover Rituals
            </Link>
          </div>
        </div>

        {/* Right Side Column (Gallery View Badge) */}
        <div className="lg:col-span-5 flex justify-start lg:justify-end lg:pr-12">
          <Link
            href="/rituals"
            className="relative group cursor-pointer flex flex-col items-center gap-3"
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-sm group-hover:scale-110 group-hover:bg-white/20 group-hover:border-white transition-all duration-300 shadow-xl">
              <Play className="w-8 h-8 text-white fill-white ml-1 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-white/90 group-hover:text-white transition-colors">
              Gallery & Rituals
            </span>
          </Link>
        </div>

      </div>
      
    </section>
  );
}
