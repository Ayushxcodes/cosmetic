"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  Eye, 
  Compass, 
  Clock, 
  Smile, 
  CheckCircle,
  HelpCircle,
  BookOpen
} from "lucide-react";

export default function AboutClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full bg-[#faf6ef] text-[#1a1208] font-sans overflow-hidden">
      
      {/* Hero Section - The Vision */}
      <section className="relative py-24 md:py-32 px-6 text-center border-b border-[#e8d9c0]/40 bg-radial from-[#faf6ef] to-[#f5e9d6]/30">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -left-20 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-[#f5deb3] via-[#f0c98e] to-[#faf6ef] opacity-40 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full bg-[#e8d9c0] opacity-25 blur-2xl" />
        </div>

        <div className={`relative z-10 max-w-4xl mx-auto transition-all duration-1000 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-xs tracking-[0.25em] text-[#b8935a] uppercase font-bold block mb-4">Our Vision</span>
          <h1 className="text-4xl md:text-6xl font-serif lobster-two-bold text-[#1a1208] leading-tight mb-8">
            Skincare as a <br className="hidden sm:inline" />
            <span className="text-[#b8935a] italic font-normal">Lifelong Ritual</span> of Self-Care
          </h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#b8935a] to-transparent mx-auto mb-8" />
          <p className="text-xl md:text-2xl lobster-two-regular-italic text-[#6b5c44] leading-relaxed max-w-3xl mx-auto">
            &quot;To inspire a generation that sees skincare not as a pursuit of perfection, but as a lifelong act of self-care, empowered by authentic beauty, and timeless care.&quot;
          </p>
        </div>
      </section>

      {/* Mission & Position (Why We Exist) */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Visual Column */}
          <div className={`lg:col-span-5 relative w-full aspect-[4/5] max-w-[450px] mx-auto rounded-3xl overflow-hidden bg-[#f5e9d6] shadow-xl border border-[#e8d9c0]/50 transition-all duration-1000 delay-100 ${mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
            <Image
              src="/cosmetic3.avif"
              alt="Niimi authentic East Asian beauty"
              fill
              sizes="(max-width: 768px) 100vw, 450px"
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1208]/30 via-transparent to-transparent" />
          </div>

          {/* Narrative Column */}
          <div className={`lg:col-span-7 flex flex-col gap-6 transition-all duration-1000 delay-200 ${mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
            <span className="text-xs tracking-[0.25em] text-[#b8935a] uppercase font-bold">Why NIIMI Exists</span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1a1208] lobster-two-bold leading-tight">
              India&apos;s Premium Destination for <br />
              <em className="not-italic text-[#b8935a]">East Asian Beauty</em>
            </h2>
            <div className="w-16 h-0.5 bg-[#b8935a]" />
            
            <p className="text-[#1a1208] font-medium text-lg leading-relaxed">
              NIIMI exists because Indian consumers deserve access to authentic East Asian beauty without having to question quality, authenticity, or safety.
            </p>
            
            <p className="text-[#6b5c44] leading-relaxed">
              We believe beauty should be simple, trustworthy, enjoyable, and rooted in healthy skin rather than impossible standards. People deserve access to authentic East Asian beauty without confusion, compromise, or unrealistic expectations.
            </p>
            
            <p className="text-[#6b5c44] leading-relaxed">
              Our mission is to curate authentic products, share trusted knowledge, and create meaningful beauty experiences that help people build simple, confident, and lasting self-care habits.
            </p>

            <div className="mt-4 p-5 rounded-2xl bg-[#f5e9d6]/40 border border-[#e8d9c0]/50 flex gap-4 items-start">
              <BookOpen className="w-6 h-6 text-[#b8935a] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-[#1a1208] text-sm uppercase tracking-wider mb-1">Purpose → Education → Products</h4>
                <p className="text-xs text-[#6b5c44] leading-relaxed">
                  We don&apos;t just sell products; we offer a path. High-quality skincare and cosmetics manufactured in their country of origin (Japan and China), supported by honest education rather than marketing hype.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Philosophy Section (4 Pillars) */}
      <section className="bg-[#f5e9d6]/50 py-20 md:py-28 border-t border-b border-[#e8d9c0]/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs tracking-[0.25em] text-[#b8935a] uppercase font-bold block mb-2">Our Philosophy</span>
            <h2 className="text-3xl md:text-5xl font-serif lobster-two-bold text-[#1a1208]">Beauty that fits real life</h2>
            <p className="text-[#6b5c44] text-sm mt-3 max-w-xl mx-auto">
              We choose a path of simplicity and truth. Skincare should never feel like an obligation or a burden.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Pillar 1 */}
            <div className={`group bg-white/90 border border-[#e8d9c0] p-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "100ms" }}>
              <div className="w-12 h-12 rounded-2xl bg-[#faf6ef] border border-[#e8d9c0] flex items-center justify-center text-[#b8935a] mb-6 group-hover:bg-[#b8935a] group-hover:text-white transition-all duration-300">
                <Smile className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#1a1208] mb-3">Skin, Not Perfection</h3>
              <p className="text-xs text-[#6b5c44] leading-relaxed">
                The focus is on skin health and not always perfection. Buy it because everyone deserves confidence, not to satisfy impossible standards.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className={`group bg-white/90 border border-[#e8d9c0] p-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "200ms" }}>
              <div className="w-12 h-12 rounded-2xl bg-[#faf6ef] border border-[#e8d9c0] flex items-center justify-center text-[#b8935a] mb-6 group-hover:bg-[#b8935a] group-hover:text-white transition-all duration-300">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#1a1208] mb-3">Never a Burden</h3>
              <p className="text-xs text-[#6b5c44] leading-relaxed">
                We don&apos;t believe skincare should become another burden. Beauty should fit into real life naturally, bringing joy and comfort rather than stress.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className={`group bg-white/90 border border-[#e8d9c0] p-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "300ms" }}>
              <div className="w-12 h-12 rounded-2xl bg-[#faf6ef] border border-[#e8d9c0] flex items-center justify-center text-[#b8935a] mb-6 group-hover:bg-[#b8935a] group-hover:text-white transition-all duration-300">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#1a1208] mb-3">Luxury is Time</h3>
              <p className="text-xs text-[#6b5c44] leading-relaxed">
                Luxury today is no longer just about expensive or rare ingredients. Luxury is Time. Authentic beauty without unnecessary complexity.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className={`group bg-white/90 border border-[#e8d9c0] p-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "400ms" }}>
              <div className="w-12 h-12 rounded-2xl bg-[#faf6ef] border border-[#e8d9c0] flex items-center justify-center text-[#b8935a] mb-6 group-hover:bg-[#b8935a] group-hover:text-white transition-all duration-300">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#1a1208] mb-3">Honest Sourcing</h3>
              <p className="text-xs text-[#6b5c44] leading-relaxed">
                We never exaggerate what our products can do. Through curated J-Beauty and C-Beauty, we deliver authentic results without marketing hype.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Brand Values Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.25em] text-[#b8935a] uppercase font-bold block mb-2">Our Foundation</span>
          <h2 className="text-3xl md:text-5xl font-serif lobster-two-bold text-[#1a1208]">Core Values</h2>
          <p className="text-[#6b5c44] text-sm mt-3 max-w-xl mx-auto">
            These five guiding principles shape every product we curate, every ritual we share, and every decision we make.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          
          {[
            {
              name: "Care",
              desc: "Deep respect for your skin, your time, and your personal wellbeing. We approach beauty with mindfulness.",
              icon: <Heart className="w-5 h-5" />
            },
            {
              name: "Simplicity",
              desc: "Providing authentic beauty without unnecessary steps or confusion. Sustainable habits over complex steps.",
              icon: <Sparkles className="w-5 h-5" />
            },
            {
              name: "Authenticity",
              desc: "Direct origin products from Japan and China. Genuine ingredients, genuine traditions, and real results.",
              icon: <ShieldCheck className="w-5 h-5" />
            },
            {
              name: "Transparency",
              desc: "Uncompromising honesty about safety, sourcing, and what skincare can realistically achieve.",
              icon: <Eye className="w-5 h-5" />
            },
            {
              name: "Curiosity",
              desc: "Bridging the finest heritage traditions of East Asia with the latest technological and digital sciences.",
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
      </section>

      {/* The Change NIIMI Wants to Create & Goals */}
      <section className="relative w-full min-h-[550px] flex items-center justify-center bg-[#1a1208] text-white py-20 md:py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <Image
            src="/makeup.webp"
            alt="Niimi authentic cosmetics detail"
            fill
            sizes="100vw"
            className="object-cover filter grayscale"
          />
          <div className="absolute inset-0 bg-[#1a1208]/90 mix-blend-multiply" />
        </div>

        <div className={`relative z-10 max-w-4xl mx-auto text-center flex flex-col gap-6 items-center transition-all duration-1000 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-xs tracking-[0.25em] text-[#b8935a] uppercase font-bold">The Change We Seek</span>
          <h2 className="text-3xl md:text-5xl font-serif lobster-two-bold leading-tight text-white">
            Confidence over Confusion
          </h2>
          
          <p className="text-gray-300 leading-relaxed text-base max-w-3xl">
            In a world where skincare is often driven by fleeting trends, unrealistic expectations, and overwhelming routines, we choose a different path. We believe that authentic products, honest education, and simple rituals can help people care for themselves in ways that fit their real lives.
          </p>

          <div className="w-16 h-px bg-[#b8935a] my-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl text-left mt-2">
            <div>
              <h4 className="text-[#b8935a] font-bold text-sm uppercase tracking-wider mb-2">Our True Goal</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Our goal is not to encourage people to buy more products. Our goal is to help people build beauty habits they genuinely enjoy and continue for years.
              </p>
            </div>
            <div>
              <h4 className="text-[#b8935a] font-bold text-sm uppercase tracking-wider mb-2">Empowered by Knowledge</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                We envision a world where taking care of yourself is simple, authentic, and joyful. A world where people no longer feel overwhelmed by beauty, but empowered by quality, safety, and thoughtful products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Pledge Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 md:py-28 text-center">
        <div className={`flex flex-col items-center gap-6 transition-all duration-1000 delay-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-xs tracking-[0.25em] text-[#b8935a] uppercase font-bold block">Our Commitment</span>
          <h2 className="text-2xl md:text-3xl font-serif text-[#1a1208] lobster-two-bold">
            The Customer Pledge
          </h2>
          
          <div className="w-12 h-0.5 bg-[#b8935a]" />

          <div className="relative p-8 md:p-12 rounded-[2rem] bg-[#f5e9d6]/30 border border-[#e8d9c0] mt-4 max-w-3xl">
            <div className="absolute top-4 left-6 text-6xl text-[#b8935a]/20 font-serif pointer-events-none">&ldquo;</div>
            <p className="text-lg md:text-xl lobster-two-regular-italic text-[#6b5c44] leading-relaxed relative z-10">
              When someone says, &quot;NIIMI changed how I take care of myself,&quot; we know we have succeeded—not because we sold another product, but because we helped create a lasting relationship between a person and their own wellbeing.
            </p>
            <div className="absolute bottom-2 right-6 text-6xl text-[#b8935a]/20 font-serif pointer-events-none">&rdquo;</div>
          </div>

          <p className="text-xs text-[#6b5c44] mt-4 max-w-lg">
            By introducing the finest beauty traditions and innovations of Japan and China with honesty and care, we aim to transform skincare from a routine you feel obligated to follow into a ritual you genuinely look forward to.
          </p>

          <div className="pt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href="/team"
              className="inline-flex items-center gap-2 rounded-full bg-[#c8923a] px-8 py-3.5 font-bold text-white shadow-md hover:bg-[#a97428] transition-colors duration-200 text-sm uppercase tracking-wider"
            >
              Meet the Founders
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-[#1a1208] px-8 py-3.5 font-bold text-[#1a1208] hover:bg-[#1a1208] hover:text-white transition-all duration-200 text-sm uppercase tracking-wider"
            >
              Explore Rituals
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
