"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function PhilosophySection() {
  const slides = [
    "/cosmetic1.avif",
    "/cosmetic2.avif",
    "/cosmetic3.avif",
    "/cosmetic4.avif",
  ];

  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const prefersReduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 4000);
    return () => clearInterval(id);
  }, [slides.length]);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  return (
    <section className="w-full bg-transparent min-h-screen">
      <div className="w-full mx-auto px-4 lg:px-0 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch h-full">
        {/* Visual column (slideshow) */}
        <div className="relative flex items-stretch h-full order-1 lg:order-none">
          <div className={`relative w-full h-full min-h-[280px] sm:min-h-[360px] md:min-h-[420px] lg:min-h-screen overflow-hidden bg-[#f5e9d6] transition-all duration-700 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <Image src={slides[index]} alt={`Slide ${index + 1}`} fill className="object-cover transition-opacity duration-700" />

            <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none">
              <button
                type="button"
                className="pointer-events-auto w-9 h-9 rounded-full bg-white/80 text-[#1a1208] flex items-center justify-center shadow-md"
                aria-label="Previous slide"
                onClick={prev}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
              </button>

              <button
                type="button"
                className="pointer-events-auto w-9 h-9 rounded-full bg-white/80 text-[#1a1208] flex items-center justify-center shadow-md"
                aria-label="Next slide"
                onClick={next}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
              </button>
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-2 h-2 rounded-full ${i === index ? "bg-[#b8935a]" : "bg-white/70"}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content column */}
        <div className="flex flex-col gap-6 bg-[#f5e9d6] p-6 sm:p-10 lg:p-16 h-full order-0 lg:order-none">
          <div className={`space-y-6 transition-all duration-700 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: mounted ? "120ms" : "0ms" }}>
            <div className="text-sm tracking-wider text-[#b8935a] uppercase font-medium">Our Philosophy</div>
            <h2 className="text-4xl md:text-5xl dancing-script-philosophy leading-tight text-[#1a1208]">
              Beauty rooted
              <br />
              in <em className="not-italic text-[#b8935a]">nature</em>
            </h2>
            <p className="text-[#6b5c44] text-base max-w-prose">
              Niimi means "new sprout" in Japanese — the tender beginning of life, full of possibility. Every formula begins with this spirit: pure intention, minimal intervention, and deep respect for your skin's innate intelligence.
            </p>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-6 my-auto w-full">
            {[
              {
                title: "Ingredient Integrity",
                body: "Every component is selected for efficacy and safety. No fillers, no compromise.",
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                ),
              },
              {
                title: "Ancient Wisdom",
                body: "Drawing on centuries of Japanese skincare tradition, refined through modern science.",
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                ),
              },
              {
                title: "Transparent Practice",
                body: "Full ingredient disclosure, third-party testing, sustainable sourcing always.",
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
                ),
              },
            ].map((item, i) => (
              <div key={i} className={`flex gap-4 transition-all duration-600 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: `${200 + i * 120}ms` }}>
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white/90 border border-[#e8d9c0] flex items-center justify-center text-[#b8935a] shadow-sm">{item.icon}</div>
                <div>
                  <h4 className="font-semibold text-[#1a1208]">{item.title}</h4>
                  <p className="text-xs text-[#6b5c44]">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
