"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/types/ecommerce";

interface ServicesSectionProps {
  products?: Product[];
  loading?: boolean;
}

const WIDE_SHOWCASE_IMAGES = [
  {
    src: "/products/pro-shots/reluce/6sku_3.png",
    alt: "ReLUCE Japanese Botanical Skincare Showcase",
  },
  {
    src: "/products/pro-shots/latte-botanical/latte_4sku.jpg",
    alt: "Latte Botanical Complete Ritual Lineup",
  },
  {
    src: "/products/pro-shots/cha-no-sui/2xgola7z.png",
    alt: "Cha no Sui Kyoto Uji Matcha Skincare Collection",
  },
  {
    src: "/products/pro-shots/kankitsu-ohji/kankitsu_web_image_01.jpg",
    alt: "Kankitsu Ohji Pore & Peeling Formulations",
  },
  {
    src: "/products/pro-shots/dotbye/20498.webp",
    alt: "dotbye Strawberry Pore Cleansing Pro Showcase",
  },
  {
    src: "/products/pro-shots/junsuhada/9076.webp",
    alt: "Junsuhada Medicated Japanese Peppermint Water",
  },
  {
    src: "/products/pro-shots/savon-doron/41278.jpg",
    alt: "Savon Doron Mineral Clay Esthe Facial Wash",
  },
  {
    src: "/products/pro-shots/latte-botanical/latte_3sku.jpg",
    alt: "Latte Botanical Natural Cleansing Gel Lineup",
  },
];

export default function ServicesSection({
  products: _propProducts,
  loading: _propLoading,
}: ServicesSectionProps = {}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = WIDE_SHOWCASE_IMAGES.length;

  // Auto-play slideshow every 4.5s
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [total, isPaused]);

  const handleNext = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  return (
    <section 
      className="w-full bg-[#faf6ef] py-4 sm:py-8 md:py-10 px-2 sm:px-4 md:px-6 lg:px-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="w-full max-w-[1920px] mx-auto">
        
        {/* ── Panoramic Full-Screen Showcase Banner ── */}
        <div className="relative w-full h-[65vh] sm:h-[75vh] lg:h-[82vh] min-h-[480px] sm:min-h-[580px] lg:min-h-[680px] rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] overflow-hidden shadow-2xl border border-[#e8d9c0]/80 bg-[#140e0a] group">
          
          <Link
            href="/shop"
            className="absolute inset-0 block w-full h-full cursor-pointer"
            aria-label="View products collection"
          >
            {/* Slides with smooth cross-fade transition */}
            {WIDE_SHOWCASE_IMAGES.map((img, idx) => {
              const isActive = idx === currentIndex;
              return (
                <div
                  key={img.src}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    isActive ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    priority={idx === 0 || idx === 1}
                    className="object-cover object-center group-hover:scale-102 transition-transform duration-1000 ease-out"
                    sizes="100vw"
                  />
                </div>
              );
            })}

            {/* Subtle cinematic vignette */}
            <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-black/25" />
          </Link>

          {/* Left Navigation Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/45 hover:bg-black/80 text-white backdrop-blur-md border border-white/25 flex items-center justify-center transition-all duration-300 opacity-80 hover:opacity-100 hover:scale-110 shadow-xl cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8" />
          </button>

          {/* Right Navigation Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/45 hover:bg-black/80 text-white backdrop-blur-md border border-white/25 flex items-center justify-center transition-all duration-300 opacity-80 hover:opacity-100 hover:scale-110 shadow-xl cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8" />
          </button>

          {/* Bottom Bar: Slide Counter & Indicators */}
          <div className="absolute bottom-5 sm:bottom-8 inset-x-0 z-30 flex items-center justify-center gap-3 sm:gap-4 pointer-events-none">
            <div className="flex items-center gap-2 sm:gap-3 bg-black/50 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border border-white/20 shadow-lg pointer-events-auto">
              
              {/* Slide Counter */}
              <span className="text-white text-xs sm:text-sm font-bold tracking-widest font-mono">
                {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>

              <span className="w-px h-3.5 bg-white/30" />

              {/* Indicator Dots */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {WIDE_SHOWCASE_IMAGES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`transition-all duration-500 rounded-full h-1.5 sm:h-2 cursor-pointer ${
                      currentIndex === idx
                        ? "w-7 sm:w-9 bg-[#b8935a] shadow-md"
                        : "w-2 sm:w-2.5 bg-white/40 hover:bg-white/80"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
