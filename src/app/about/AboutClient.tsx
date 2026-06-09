"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Shield, Sparkles } from "lucide-react";

export default function AboutClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full bg-[#faf6ef] text-[#1a1208] font-sans overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 px-6 text-center border-b border-[#e8d9c0]/40">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -left-20 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-[#f5deb3] via-[#f0c98e] to-[#faf6ef] opacity-50 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-[#e8d9c0] opacity-30 blur-2xl" />
        </div>

        <div className={`relative z-10 max-w-3xl mx-auto transition-all duration-1000 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-sm tracking-[0.2em] text-[#b8935a] uppercase font-semibold block mb-3">Our Journey</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-wide uppercase mb-4 dancing-script-philosophy text-[#b8935a]">
            Niimi Story
          </h1>
          <p className="text-xl md:text-2xl lobster-two-regular-italic text-[#6b5c44] leading-relaxed max-w-2xl mx-auto">
            &quot;Beauty rooted in nature, refined by science, and crafted with pure intention.&quot;
          </p>
        </div>
      </section>

      {/* Origin Story Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Visual Column */}
          <div className={`relative w-full aspect-[4/5] max-w-[500px] mx-auto rounded-3xl overflow-hidden bg-[#f5e9d6] shadow-xl transition-all duration-1000 delay-100 ${mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
            <Image
              src="/cosmetic3.avif"
              alt="Niimi Cosmetics natural essence"
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Narrative Column */}
          <div className={`flex flex-col gap-6 transition-all duration-1000 delay-200 ${mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#1a1208] lobster-two-bold leading-tight">
              The Meaning of <em className="not-italic text-[#b8935a]">Niimi</em>
            </h2>
            <div className="w-16 h-0.5 bg-[#b8935a]" />
            <p className="text-[#6b5c44] leading-relaxed text-base">
              Niimi means <strong>&quot;new sprout&quot;</strong> in Japanese — the tender beginning of life, full of possibility. Every formula begins with this spirit: pure intention, minimal intervention, and deep respect for your skin&apos;s innate intelligence.
            </p>
            <p className="text-[#6b5c44] leading-relaxed text-base">
              Founded on the belief that luxurious, high-quality skincare should be accessible in our daily lives, we bridge the gap between ancient Japanese skincare traditions and the latest advancements in digital and formulation sciences.
            </p>
            <p className="text-[#6b5c44] leading-relaxed text-base">
              We collaborate with global research partners and utilize cutting-edge manufacturing processes to deliver clean, active formulations that honor our mission: <em>&quot;Good Looks is Our Birthright.&quot;</em>
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/team"
                className="inline-flex items-center gap-2 rounded-full bg-[#c8923a] px-6 py-2.5 font-semibold text-white shadow-md hover:bg-[#a97428] transition-colors duration-200"
              >
                Meet the Founders
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values / Philosophy Pillars */}
      <section className="bg-[#f5e9d6] py-16 md:py-24 border-t border-b border-[#e8d9c0]/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm tracking-[0.2em] text-[#b8935a] uppercase font-semibold block mb-2">Our Pillars</span>
            <h2 className="text-3xl md:text-4xl font-serif lobster-two-bold text-[#1a1208]">What guides Niimi</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className={`group bg-white/80 border border-[#e8d9c0] p-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "150ms" }}>
              <div className="w-12 h-12 rounded-2xl bg-[#faf6ef] border border-[#e8d9c0] flex items-center justify-center text-[#b8935a] mb-6 group-hover:bg-[#b8935a] group-hover:text-white transition-all duration-300">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-[#1a1208] mb-3">Ingredient Integrity</h3>
              <p className="text-sm text-[#6b5c44] leading-relaxed">
                Every component is selected for raw efficacy, bio-compatibility, and safety. We reject fillers, parabens, and unnecessary synthetics in favor of pure performance.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className={`group bg-white/80 border border-[#e8d9c0] p-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "300ms" }}>
              <div className="w-12 h-12 rounded-2xl bg-[#faf6ef] border border-[#e8d9c0] flex items-center justify-center text-[#b8935a] mb-6 group-hover:bg-[#b8935a] group-hover:text-white transition-all duration-300">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-[#1a1208] mb-3">Ancient Wisdom</h3>
              <p className="text-sm text-[#6b5c44] leading-relaxed">
                We draw inspiration from centuries of traditional Japanese beauty rituals. By incorporating nutrient-dense botanical extracts, we honor heritage while modernizing application.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className={`group bg-white/80 border border-[#e8d9c0] p-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "450ms" }}>
              <div className="w-12 h-12 rounded-2xl bg-[#faf6ef] border border-[#e8d9c0] flex items-center justify-center text-[#b8935a] mb-6 group-hover:bg-[#b8935a] group-hover:text-white transition-all duration-300">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-[#1a1208] mb-3">Transparent Sourcing</h3>
              <p className="text-sm text-[#6b5c44] leading-relaxed">
                Honesty is key to mindful beauty. We ensure complete ingredient disclosure, third-party laboratory verification, and sustainable, ethical sourcing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Second Story Section (Full-Width Image & Text Block) */}
      <section className="relative w-full min-h-[500px] flex items-center justify-center bg-[#1a1208] text-white py-16 md:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/makeup.webp"
            alt="Niimi product detail"
            fill
            sizes="100vw"
            className="object-cover filter grayscale"
          />
          <div className="absolute inset-0 bg-[#1a1208]/80 mix-blend-multiply" />
        </div>

        <div className={`relative z-10 max-w-4xl mx-auto text-center flex flex-col gap-6 items-center transition-all duration-1000 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-sm tracking-[0.25em] text-[#b8935a] uppercase font-semibold">Scientific Craft</p>
          <h2 className="text-3xl md:text-5xl font-serif lobster-two-bold leading-tight">
            Minimalist Formulas.<br />Maximalist Results.
          </h2>
          <p className="text-gray-300 leading-relaxed text-base max-w-2xl">
            We believe in high-concentration botanical intelligence. By removing fillers, our ingredients remain potent, allowing your skin to naturally absorb, repair, and radiate from within.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white px-8 py-3 font-semibold text-white hover:bg-white hover:text-[#1a1208] transition-colors duration-200"
            >
              Explore Our Rituals
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
