"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";

export default function TransformationSection() {
  return (
    <section className="bg-white w-full py-20 px-6 sm:px-12 md:px-16 border-t border-[#e8d9c0]/30">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Header line */}
        <div className="flex justify-between items-center pb-2 border-b border-[#e8d9c0]/30">
          <h2 className="text-3xl sm:text-4xl font-serif text-[#1a1208] lobster-two-bold">
            Exclusive Beauty <br className="sm:hidden" /> Transformation Awaits
          </h2>
          <Link 
            href="#" 
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1a1208] hover:text-[#b8935a] transition"
          >
            More Services <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Left card: Holistic Approach (Span 6 columns) */}
          <div className="md:col-span-6 bg-[#9c7d73] text-white p-8 sm:p-10 rounded-[2.5rem] flex flex-col justify-between min-h-[360px] shadow-sm relative group overflow-hidden">
            {/* Subtle glow orb */}
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
            
            {/* Details badge top right */}
            <div className="self-end">
              <div className="w-12 h-12 rounded-full bg-white/15 border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#9c7d73] transition duration-300">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-4">
              <h3 className="text-2xl sm:text-3xl font-serif lobster-two-bold leading-tight">
                Holistic Approach
              </h3>
              
              <p className="text-sm text-white/80 leading-relaxed max-w-md">
                Enhance Your Natural Beauty with Our Expert Services, matching organic formulas to your biological rhythms.
              </p>

              {/* Tag pill */}
              <span className="w-fit px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-xs tracking-wider uppercase font-semibold">
                ✦ Skin Care
              </span>
            </div>
          </div>

          {/* Middle card: Portrait Model applying cream (Span 3 columns) */}
          <div className="md:col-span-3 relative aspect-[3/4] md:aspect-auto rounded-[2.5rem] overflow-hidden group shadow-sm border border-[#e8d9c0]/30 min-h-[360px]">
            <Image
              src="/facial_treatment.png"
              alt="Applying serum"
              fill
              className="object-cover group-hover:scale-105 transition duration-500"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 text-white">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#b8935a]">Advanced</span>
              <h4 className="text-lg font-serif lobster-two-bold mt-1">Luminous Skin</h4>
            </div>
          </div>

          {/* Right card: Portrait Model showcasing skin (Span 3 columns) */}
          <div className="md:col-span-3 relative aspect-[3/4] md:aspect-auto rounded-[2.5rem] overflow-hidden group shadow-sm border border-[#e8d9c0]/30 min-h-[360px]">
            <Image
              src="/model3.jpg"
              alt="Beautiful clean skin"
              fill
              className="object-cover group-hover:scale-105 transition duration-500"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 text-white">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#b8935a]">Natural</span>
              <h4 className="text-lg font-serif lobster-two-bold mt-1">Glow Restoration</h4>
            </div>
          </div>

        </div>

        {/* Bottom row: nav arrows */}
        <div className="flex justify-end gap-3 mt-2">
          <button 
            className="w-10 h-10 rounded-full border border-[#1a1208]/20 flex items-center justify-center hover:bg-[#1a1208] hover:text-white transition"
            aria-label="Previous"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button 
            className="w-10 h-10 rounded-full border border-[#1a1208]/20 flex items-center justify-center hover:bg-[#1a1208] hover:text-white transition"
            aria-label="Next"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
