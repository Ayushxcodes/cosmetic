"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function IntroSection() {
  return (
    <section className="bg-[#faf6ef] w-full py-20 px-6 sm:px-12 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Title row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1a1208] lobster-two-bold leading-tight max-w-xl">
            Your Beauty And Success <br className="hidden sm:inline" /> Start Here!
          </h2>
          
          {/* About us circle badge */}
          <Link 
            href="/about" 
            className="group relative flex items-center justify-center w-16 h-16 rounded-full border border-[#1a1208]/20 bg-white hover:bg-[#1a1208] hover:text-white transition-all duration-300 shadow-sm"
          >
            <div className="flex flex-col items-center">
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              <span className="text-[9px] uppercase font-bold tracking-widest mt-1">About</span>
            </div>
          </Link>
        </div>

        {/* 3-Column Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 items-stretch mt-4">
          
          {/* Left Column: Facial Treatment Card */}
          <div className="flex flex-col gap-4 bg-white p-5 rounded-[2rem] border border-[#e8d9c0]/50 shadow-sm hover:shadow-md transition">
            <div className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden">
              <Image
                src="/facial_treatment.png"
                alt="Skincare treatment"
                fill
                className="object-cover hover:scale-105 transition duration-500"
              />
            </div>
            <p className="text-sm text-[#6b5c44] leading-relaxed font-serif italic mt-2">
              Revitalize Your Skin and Spirit at Our Beauty Center, offering direct organic botanical formulations.
            </p>
            <Link 
              href="/about" 
              className="inline-flex items-center gap-2 border border-[#1a1208]/20 hover:border-[#1a1208] rounded-full px-5 py-2.5 text-xs uppercase font-bold tracking-wider text-[#1a1208] mt-auto w-fit transition"
            >
              Read More <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Center Column: Swatch smear artwork / Beauty Potential */}
          <div className="flex flex-col justify-between items-center bg-white p-6 rounded-[2rem] border border-[#e8d9c0]/50 shadow-sm relative overflow-hidden text-center">
            <div className="absolute top-4 left-6 text-xs text-[#b8935a] font-bold tracking-[0.2em] uppercase">
              Core Philosophy
            </div>
            
            {/* Tilted swatch */}
            <div className="relative w-48 h-48 my-auto transform rotate-6 hover:rotate-12 transition-transform duration-500">
              <Image
                src="/cream_swatch.png"
                alt="Silky lotion swatch"
                fill
                className="object-contain mix-blend-multiply"
              />
            </div>

            <div className="mt-auto">
              <h3 className="text-xl font-serif text-[#1a1208] lobster-two-bold mb-2">
                Discover Your Beauty Potential
              </h3>
              <p className="text-xs text-[#6b5c44]">
                We unlock nature&apos;s active enzymes to heal and restore.
              </p>
            </div>
          </div>

          {/* Right Column: Salon Interior landscape card */}
          <div className="flex flex-col gap-4 bg-white p-5 rounded-[2rem] border border-[#e8d9c0]/50 shadow-sm hover:shadow-md transition">
            <div className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden">
              <Image
                src="/salon_interior.png"
                alt="Luxury salon interior space"
                fill
                className="object-cover hover:scale-105 transition duration-500"
              />
            </div>
            <p className="text-sm text-[#6b5c44] leading-relaxed font-serif italic mt-2">
              Step into an oasis designed to relax, restore, and inspire ultimate skin longevity.
            </p>
            <Link 
              href="/about" 
              className="inline-flex items-center gap-2 border border-[#1a1208]/20 hover:border-[#1a1208] rounded-full px-5 py-2.5 text-xs uppercase font-bold tracking-wider text-[#1a1208] mt-auto w-fit transition"
            >
              Learn More <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
