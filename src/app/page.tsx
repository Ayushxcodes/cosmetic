"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Sparkles, ShieldCheck, Eye, Compass, ArrowRight } from "lucide-react";

import VeluraHero from "@/components/Landing/HeroSection";
import MarqueeSection from "@/components/Landing/MarqueeSection";
import PhilosophySection from "@/components/Landing/PhilosophySection";
import ProductsSection from "@/components/Landing/ProductsSection";
import FounderSection from "@/components/Landing/FounderSection";

export default function Homepage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full bg-[#faf6ef] text-[#1a1208] overflow-hidden">
      
      {/* 1. Hero Section */}
      <VeluraHero />

      {/* 2. Marquee Ticker */}
      <MarqueeSection />

      {/* 3. Brand Manifesto Section (Why We Exist) */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 border-b border-[#e8d9c0]/30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Manifesto Text */}
          <div className={`lg:col-span-7 flex flex-col gap-6 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs tracking-[0.25em] text-[#b8935a] uppercase font-bold">The Manifesto</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1a1208] lobster-two-bold leading-tight">
              Confidence over Confusion.<br />
              <em className="not-italic text-[#b8935a]">Skincare is not a chore.</em>
            </h2>
            <div className="w-16 h-0.5 bg-[#b8935a]" />
            
            <p className="text-lg text-[#6b5c44] leading-relaxed max-w-2xl font-medium">
              We never exaggerate what our products can do. Beauty should fit into real life, rooted in healthy skin rather than impossible standards.
            </p>

            <p className="text-sm text-[#6b5c44] leading-relaxed max-w-2xl">
              NIIMI is India&apos;s premium destination for authentic East Asian beauty, offering thoughtfully curated skincare and cosmetics manufactured in Japan and China. Through honest education, complete transparency, and uncompromising quality, NIIMI aims to make J-Beauty and C-Beauty accessible and trusted across India.
            </p>

            <p className="text-sm text-[#6b5c44] leading-relaxed max-w-2xl">
              We believe that authentic products, honest education, and simple rituals can help people care for themselves in ways that fit their real lives. Skincare shouldn&apos;t become another burden.
            </p>

            <div className="pt-4 flex">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full bg-[#c8923a] px-8 py-3.5 font-bold text-white shadow-md hover:bg-[#a97428] transition-colors duration-200 text-xs uppercase tracking-wider"
              >
                Read Our Story
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Manifesto Visual */}
          <div className={`lg:col-span-5 relative w-full aspect-[4/5] max-w-[420px] mx-auto rounded-3xl overflow-hidden bg-[#f5e9d6] shadow-xl border border-[#e8d9c0]/50 transition-all duration-1000 delay-200 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
            <Image
              src="/cosmetic2.avif"
              alt="Niimi East Asian Skincare ingredients"
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1208]/20 via-transparent to-transparent" />
          </div>

        </div>
      </section>

      {/* 4. Products Section (Bestsellers Grid) */}
      

      {/* 5. Philosophy Section (3 Pillars Slideshow) */}
      <PhilosophySection />

      {/* 6. Brand Values Overview Grid */}
      <section className="bg-[#f5e9d6]/30 py-20 md:py-28 border-t border-b border-[#e8d9c0]/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs tracking-[0.25em] text-[#b8935a] uppercase font-bold block mb-2">Our Pillars</span>
            <h2 className="text-3xl md:text-5xl font-serif lobster-two-bold text-[#1a1208]">Brand Values</h2>
            <p className="text-[#6b5c44] text-sm mt-3 max-w-xl mx-auto">
              Rooted in J-Beauty and C-Beauty traditions, we live by five primary commitments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                name: "Care",
                desc: "Every formulation is designed to respect and nourish your skin&apos;s natural biology.",
                icon: <Heart className="w-5 h-5" />
              },
              {
                name: "Simplicity",
                desc: "Authentic beauty without unnecessary steps. Simple habits that last for years.",
                icon: <Sparkles className="w-5 h-5" />
              },
              {
                name: "Authenticity",
                desc: "True, direct-sourcing from Japan and China — zero compromise on safety.",
                icon: <ShieldCheck className="w-5 h-5" />
              },
              {
                name: "Transparency",
                desc: "Complete ingredient disclosure. We never exaggerate what our products can do.",
                icon: <Eye className="w-5 h-5" />
              },
              {
                name: "Curiosity",
                desc: "Exploring ancient botanicals alongside advanced digital and formulation science.",
                icon: <Compass className="w-5 h-5" />
              }
            ].map((val, i) => (
              <div 
                key={val.name}
                className={`p-6 rounded-2xl bg-white border border-[#e8d9c0] shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#faf6ef] border border-[#e8d9c0] flex items-center justify-center text-[#b8935a] mb-4">
                    {val.icon}
                  </div>
                  <h4 className="text-lg font-bold text-[#1a1208] mb-2">{val.name}</h4>
                  <p className="text-xs text-[#6b5c44] leading-relaxed">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Founders Section */}
     

      {/* 8. Customer Pledge (Callout Banner) */}
      <section className="max-w-5xl mx-auto px-6 py-20 md:py-28 text-center border-t border-[#e8d9c0]/30">
        <div className={`flex flex-col items-center gap-6 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-xs tracking-[0.25em] text-[#b8935a] uppercase font-bold block">Our Pledge</span>
          
          <div className="relative p-8 md:p-12 rounded-[2.5rem] bg-[#f5e9d6]/40 border border-[#e8d9c0] max-w-3xl mx-auto">
            <div className="absolute top-4 left-6 text-6xl text-[#b8935a]/25 font-serif pointer-events-none">&ldquo;</div>
            <p className="text-lg md:text-xl lobster-two-regular-italic text-[#6b5c44] leading-relaxed relative z-10">
              When someone says, &quot;NIIMI changed how I take care of myself,&quot; we know we have succeeded — not because we sold another product, but because we helped create a lasting relationship between a person and their own wellbeing.
            </p>
            <div className="absolute bottom-2 right-6 text-6xl text-[#b8935a]/25 font-serif pointer-events-none">&rdquo;</div>
          </div>

          <p className="text-xs text-[#6b5c44] max-w-md mt-4 leading-relaxed">
            Our goal is not to encourage you to buy more products. Our goal is to help you build self-care habits you genuinely look forward to and continue for a lifetime.
          </p>

          <div className="pt-6 flex flex-wrap gap-4 justify-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full bg-[#1a1208] px-8 py-3.5 font-bold text-white hover:bg-[#2e200c] transition-colors duration-200 text-xs uppercase tracking-wider"
            >
              Explore Our Story
            </Link>
            <Link
              href="/team"
              className="inline-flex items-center gap-2 rounded-full border border-[#1a1208] px-8 py-3.5 font-bold text-[#1a1208] hover:bg-[#faf6ef] transition-colors duration-200 text-xs uppercase tracking-wider"
            >
              Meet the Founders
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}