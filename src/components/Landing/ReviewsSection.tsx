"use client";
import React from "react";
import Image from "next/image";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";

interface Testimonial {
  name: string;
  rating: number;
  text: string;
  avatar: string;
}

export default function ReviewsSection() {
  const testimonials: Testimonial[] = [
    {
      name: "Alice Agatha",
      rating: 4.8,
      text: "Perfect Service, this place is the right place if you want to indulge yourself once is a while. The natural serums are absolute game-changers.",
      avatar: "/model1.webp"
    },
    {
      name: "Mella Julianda",
      rating: 4.2,
      text: "Perfect Service, this place is the right place if you want to indulge yourself once is a while. Deeply impressed by their authentic East Asian formulations.",
      avatar: "/model3.jpg"
    },
    {
      name: "Sara Wilson",
      rating: 4.2,
      text: "Perfect Service, this place is the right place if you want to indulge yourself once is a while. Extremely professional and peaceful clinic layout.",
      avatar: "/facial_treatment.png"
    },
    {
      name: "Lucy Taylor",
      rating: 4.5,
      text: "Perfect Service, this place is the right place if you want to indulge yourself once is a while. Highly recommend their weekly signature facials.",
      avatar: "/model4.webp"
    }
  ];

  return (
    <section className="bg-white w-full py-20 px-6 sm:px-12 md:px-16 border-t border-[#e8d9c0]/30">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Title and Customer Stack */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-4 border-b border-[#e8d9c0]/20">
          <div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1a1208] lobster-two-bold">
              Glowing Reviews
            </h2>
            <p className="text-xs text-[#6b5c44] tracking-widest uppercase mt-2 font-semibold">
              Revitalize Your Skin and Spirit at Our Beauty Center
            </p>
          </div>

          {/* Stacked Avatars */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3.5 overflow-hidden">
              {testimonials.map((t, idx) => (
                <div key={idx} className="relative w-11 h-11 rounded-full border-2 border-white overflow-hidden shadow-sm flex-shrink-0">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#1a1208]">+42 Reviews</span>
              <span className="text-[10px] text-[#6b5c44]">From verified clients</span>
            </div>
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#faf6ef]/30 border border-[#e8d9c0]/40 p-6 rounded-[2rem] flex flex-col justify-between min-h-[220px] shadow-sm hover:shadow-md transition duration-300 relative"
            >
              {/* Star Rating indicator */}
              <div className="flex items-center gap-1.5 mb-4">
                <Star className="w-3.5 h-3.5 fill-[#b8935a] text-[#b8935a]" />
                <span className="text-xs font-bold text-[#1a1208]">{t.rating}</span>
              </div>

              {/* Review Text */}
              <p className="text-sm text-[#6b5c44] leading-relaxed italic flex-1 mb-4">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* User Avatar & Name */}
              <div className="flex items-center gap-3 mt-auto pt-2 border-t border-[#e8d9c0]/10">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#e8d9c0]/50 flex-shrink-0">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-xs font-serif font-bold text-[#1a1208] lobster-two-bold">
                  {t.name}
                </span>
              </div>

            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-end gap-3 mt-2">
          <button 
            className="w-10 h-10 rounded-full border border-[#1a1208]/20 flex items-center justify-center hover:bg-[#1a1208] hover:text-white transition"
            aria-label="Previous reviews"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button 
            className="w-10 h-10 rounded-full border border-[#1a1208]/20 flex items-center justify-center hover:bg-[#1a1208] hover:text-white transition"
            aria-label="Next reviews"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
