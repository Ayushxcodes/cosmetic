"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  image: string;
}

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState("Skin Care");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);

  const bgImages = [
    "/hero_model_portrait.png",
    "/model_face_mask.png",
    "/cosmetic_product_bg.png"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [bgImages.length]);

  const categories = [
    { name: "Skin Care", image: "/cream_on_hand.png" },
    { name: "Facial", image: "/facial_treatment.png" },
    { name: "Face Cleaner", image: "/model_face_mask.png" },
    { name: "Cosmetics", image: "/model4.webp" },
    { name: "Beauty", image: "/salon_interior.png" }
  ];

  const carouselItems: ServiceItem[] = [
    {
      id: "01",
      title: "Facial Care",
      desc: "Discover Your Radiant Beauty at Our Premier Beauty Center",
      image: "/facial_treatment.png"
    },
    {
      id: "02",
      title: "Hand Cream",
      desc: "Discover Your Radiant Beauty at Our Premier Beauty Center",
      image: "/cream_on_hand.png"
    },
    {
      id: "03",
      title: "Body Rituals",
      desc: "Discover Your Radiant Beauty at Our Premier Beauty Center",
      image: "/salon_interior.png"
    },
    {
      id: "04",
      title: "Nail Care",
      desc: "Discover Your Radiant Beauty at Our Premier Beauty Center",
      image: "/model4.webp"
    }
  ];

  const handleNext = () => {
    setCarouselIndex((prev) => (prev + 1) % carouselItems.length);
  };

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  return (
    <section className="relative min-h-screen w-full bg-[#87675d] overflow-hidden text-white flex flex-col justify-between pt-24 pb-12 px-6 sm:px-12 md:px-16">
      
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
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto w-full max-w-7xl mx-auto">
        
        {/* Left Side Column */}
        <div className="lg:col-span-6 flex flex-col gap-6 max-w-xl">
          <div>
            <span className="text-xs tracking-[0.25em] text-white/80 uppercase font-bold block mb-1">
              Niimi Cosmetics — Discover the East Asian Beauty
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-serif leading-[1.1] lobster-two-bold tracking-wide">
              Good Looks is Our <span className="underline decoration-white/20">Birthright</span>
            </h2>
          </div>
          
          <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-md">
            Luxury skincare that nourishes your skin from within, designed for radiant beauty and lasting results.
          </p>

          {/* Category Thumbnail Links */}
          <div className="flex flex-wrap gap-4 pt-2">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveTab(cat.name)}
                className="flex flex-col items-center gap-1.5 group transition-all duration-300"
              >
                <div
                  className={`relative w-14 h-14 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                    activeTab === cat.name
                      ? "border-white scale-110 shadow-lg"
                      : "border-white/20 hover:border-white/60"
                  }`}
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-white/90 group-hover:text-white transition-colors">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side Column (Gallery View Badge) */}
        <div className="lg:col-span-6 flex justify-end lg:pr-12">
          <div className="relative group cursor-pointer flex flex-col items-center gap-2">
            <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm group-hover:scale-105 transition-transform duration-300">
              <Play className="w-6 h-6 text-white fill-white ml-1" />
            </div>
            {/* Spinning text overlay */}
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-white/85">
              Gallery View
            </span>
          </div>
        </div>

      </div>

      {/* ── Bottom Section (Carousel + Slider Progress) ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Carousel Slider Indicator (e.g. 01 ------- 04) */}
        <div className="flex items-center gap-4 text-sm font-semibold tracking-wider w-full md:w-auto">
          <span>{carouselItems[carouselIndex].id}</span>
          <div className="relative h-[2px] bg-white/20 w-32 md:w-48 overflow-hidden rounded-full">
            <div 
              className="absolute left-0 top-0 h-full bg-white transition-all duration-500 rounded-full"
              style={{ 
                width: `${((carouselIndex + 1) / carouselItems.length) * 100}%`,
              }}
            />
          </div>
          <span className="text-white/50">{`0${carouselItems.length}`}</span>

          {/* Nav arrows */}
          <div className="flex items-center gap-2 ml-4">
            <button 
              onClick={handlePrev}
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition"
              aria-label="Previous service"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={handleNext}
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition"
              aria-label="Next service"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Cards (Single Card view with transition) */}
        <div className="w-full md:max-w-md flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/15 p-3 rounded-2xl shadow-xl transition-all duration-300">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
            <Image 
              src={carouselItems[carouselIndex].image} 
              alt={carouselItems[carouselIndex].title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-serif font-bold tracking-wider uppercase text-white/95 leading-none mb-1">
              {carouselItems[carouselIndex].title}
            </h4>
            <p className="text-xs text-white/70 leading-relaxed truncate">
              {carouselItems[carouselIndex].desc}
            </p>
          </div>
          <button 
            className="w-8 h-8 rounded-full bg-white text-[#87675d] flex items-center justify-center hover:scale-105 transition flex-shrink-0"
            aria-label="View Details"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
      
    </section>
  );
}
