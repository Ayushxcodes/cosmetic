"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ServiceListItem {
  name: string;
  avatar: string;
  href: string;
}

export default function ServicesSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const services: ServiceListItem[] = [
    { name: "Facials", avatar: "/model1.webp", href: "#" },
    { name: "Pedicure", avatar: "/model3.jpg", href: "#" },
    { name: "Face Cleaner", avatar: "/facial_treatment.png", href: "#" },
    { name: "Manicure", avatar: "/model4.webp", href: "#" }
  ];

  return (
    <section className="bg-white w-full py-20 px-6 sm:px-12 md:px-16 border-t border-[#e8d9c0]/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Services list */}
        <div className="lg:col-span-6 flex flex-col gap-8 w-full">
          <div className="flex justify-between items-center pb-2 border-b border-[#e8d9c0]/30">
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1a1208] lobster-two-bold">
              Service We Provide
            </h2>
            <Link 
              href="#" 
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1a1208] hover:text-[#b8935a] transition"
            >
              More Services <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex flex-col">
            {services.map((item, idx) => (
              <Link
                key={item.name}
                href={item.href}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="flex items-center justify-between py-5 border-b border-[#e8d9c0]/20 group transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  {/* Thumbnail Avatar */}
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#e8d9c0]/40 flex-shrink-0">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <span className="text-lg sm:text-xl font-medium text-[#1a1208] group-hover:translate-x-2 transition-transform duration-300">
                    {item.name}
                  </span>
                </div>

                {/* Arrow indicator */}
                <div className={`w-10 h-10 rounded-full border border-[#1a1208]/20 flex items-center justify-center transition-all duration-300 ${
                  hoveredIdx === idx ? "bg-[#1a1208] text-white border-[#1a1208]" : "bg-transparent text-[#1a1208]"
                }`}>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Column: Dynamic layout with images */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch w-full">
          
          {/* Main smiling model portrait */}
          <div className="relative aspect-[3/4] sm:aspect-auto sm:h-full min-h-[350px] rounded-[2.5rem] overflow-hidden group shadow-md">
            <Image
              src="/model1.webp"
              alt="Beautiful skin model portrait"
              fill
              className="object-cover group-hover:scale-105 transition duration-500"
            />
            {/* Hover overlay button "More Details" */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition duration-300 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-[#1a1208]/80 text-white backdrop-blur-sm border border-white/20 flex flex-col items-center justify-center scale-90 group-hover:scale-100 transition-all duration-300">
                <ArrowUpRight className="w-5 h-5 mb-0.5" />
                <span className="text-[8px] uppercase tracking-widest font-bold">Details</span>
              </div>
            </div>
          </div>

          {/* Secondary hand cream application */}
          <div className="relative aspect-[3/4] sm:aspect-auto sm:h-full min-h-[350px] rounded-[2.5rem] overflow-hidden group shadow-md border border-[#e8d9c0]/30">
            <Image
              src="/cream_on_hand.png"
              alt="Applying premium cream"
              fill
              className="object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>

        </div>

      </div>
    </section>
  );
}
