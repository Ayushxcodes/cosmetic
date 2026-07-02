"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";

interface Product {
  name: string;
  price: string;
  desc: string;
  image: string;
  thumbnails: string[];
}

export default function LatestLaunchSection() {
  const [activeTab, setActiveTab] = useState("Serums");
  const [rotate, setRotate] = useState(0);

  const categories = ["Serums", "Masks", "Cleaners", "Eye Cream"];

  const productsByCategory: Record<string, Product> = {
    Serums: {
      name: "PRISM AHA + BHA Exfoliating Glow Serum",
      price: "$56.00",
      desc: "Experience the ultimate skin renewal. Formulated with premium J-Beauty enzymes to gently dissolve dull cells, revealing a radiant, smooth, and deeply hydrated complexion.",
      image: "/cosmetic1.avif",
      thumbnails: ["/cosmetic1.avif", "/cosmetic2.avif"]
    },
    Masks: {
      name: "HYDRA BOTANICAL Intense Moisture Mask",
      price: "$48.00",
      desc: "Immerse your skin in luxury. Infused with wild green tea botanical extracts and deep-sea mineral water, this mask delivers immediate calming relief and lasting plumpness.",
      image: "/cosmetic2.avif",
      thumbnails: ["/cosmetic2.avif", "/cosmetic3.avif"]
    },
    Cleaners: {
      name: "PURE ZEN Balancing Cream Cleanser",
      price: "$38.00",
      desc: "Gently wash away impurities. A rich, milky texture that protects your skin's natural moisture barrier while leaving it soft, refreshed, and perfectly balanced.",
      image: "/cosmetic3.avif",
      thumbnails: ["/cosmetic3.avif", "/cosmetic4.avif"]
    },
    "Eye Cream": {
      name: "BRIGHT BLOOM Caffeine Eye Repair",
      price: "$64.00",
      desc: "Revitalize tired eyes. Combining advanced peptide complexes with ancient ginseng root extract to visibly reduce puffiness, smooth fine lines, and brighten dark circles.",
      image: "/cosmetic4.avif",
      thumbnails: ["/cosmetic4.avif", "/cosmetic1.avif"]
    }
  };

  const activeProduct = productsByCategory[activeTab] || productsByCategory["Serums"];

  const handleNextTab = () => {
    const idx = categories.indexOf(activeTab);
    const nextIdx = (idx + 1) % categories.length;
    setActiveTab(categories[nextIdx]);
    setRotate((r) => r + 90);
  };

  const handlePrevTab = () => {
    const idx = categories.indexOf(activeTab);
    const prevIdx = (idx - 1 + categories.length) % categories.length;
    setActiveTab(categories[prevIdx]);
    setRotate((r) => r - 90);
  };

  return (
    <section className="bg-[#faf6ef]/30 w-full py-20 px-6 sm:px-12 md:px-16 border-t border-[#e8d9c0]/30 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Top bar with heading and categories */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-4 border-b border-[#e8d9c0]/20">
          <div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1a1208] lobster-two-bold">
              Latest Product Launch <br className="hidden sm:inline" /> Available Now!
            </h2>
            <p className="text-xs text-[#6b5c44] tracking-widest uppercase mt-2 font-semibold">
              Experience the Ultimate Beauty Makeover
            </p>
          </div>

          {/* Interactive tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveTab(cat);
                  setRotate((r) => r + 45);
                }}
                className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === cat
                    ? "bg-[#1a1208] text-white border-[#1a1208]"
                    : "bg-transparent text-[#6b5c44] border border-[#e8d9c0] hover:bg-white hover:text-[#1a1208]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Layout: Thumbnails & Navigation, Rotating Dial, and Product Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center mt-6">
          
          {/* 1. Left Column: Navigation & Product Thumbnails */}
          <div className="md:col-span-3 flex flex-row md:flex-col justify-between md:justify-center items-center gap-6">
            
            {/* Nav buttons */}
            <div className="flex gap-3">
              <button
                onClick={handlePrevTab}
                className="w-10 h-10 rounded-full border border-[#1a1208]/20 flex items-center justify-center hover:bg-[#1a1208] hover:text-white hover:border-[#1a1208] transition"
                aria-label="Previous category"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextTab}
                className="w-10 h-10 rounded-full border border-[#1a1208]/20 flex items-center justify-center hover:bg-[#1a1208] hover:text-white hover:border-[#1a1208] transition"
                aria-label="Next category"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Overlapping Arched thumbnails */}
            <div className="flex gap-4 md:flex-col items-center mt-4">
              {activeProduct.thumbnails.map((src, i) => (
                <div
                  key={i}
                  className="relative w-16 sm:w-20 aspect-[2/3] rounded-[1.25rem] overflow-hidden shadow-sm border border-[#e8d9c0]/40 bg-white transform md:-rotate-3 hover:rotate-0 transition duration-300"
                >
                  <Image
                    src={src}
                    alt="Thumbnail product"
                    fill
                    className="object-cover p-2"
                  />
                </div>
              ))}
            </div>

          </div>

          {/* 2. Center Column: Large rotating Dial spinner */}
          <div className="md:col-span-5 flex justify-center items-center relative py-6">
            <div className="relative w-72 h-72 sm:w-85 sm:h-85 flex items-center justify-center">
              
              {/* Rotating outer text SVG */}
              <div 
                className="absolute inset-0 w-full h-full animate-[spin_60s_linear_infinite]"
                style={{ 
                  transform: `rotate(${rotate}deg)`,
                  transition: "transform 1s cubic-bezier(0.25, 1, 0.5, 1)",
                }}
              >
                <svg className="w-full h-full" viewBox="0 0 300 300">
                  <defs>
                    <path
                      id="textPath"
                      d="M 150, 150 m -120, 0 a 120,120 0 1,1 240,0 a 120,120 0 1,1 -240,0"
                    />
                  </defs>
                  <text className="text-[10px] uppercase font-bold tracking-[0.22em] fill-[#6b5c44]">
                    <textPath href="#textPath" startOffset="0%">
                      Revitalize Your Skin and Spirit at Our Beauty Center • Revitalize Your Skin and Spirit •
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Central diverse models circle */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <Image
                  src="/diverse_models.png"
                  alt="Radiant models"
                  fill
                  className="object-cover"
                />
              </div>

            </div>
          </div>

          {/* 3. Right Column: Detailed Product Card */}
          <div className="md:col-span-4 flex flex-col gap-5 bg-white p-6 sm:p-8 rounded-[2.5rem] border border-[#e8d9c0]/50 shadow-md relative">
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#b8935a]">
              Featured Launch
            </span>
            
            <h3 className="text-xl sm:text-2xl font-serif text-[#1a1208] lobster-two-bold leading-tight">
              {activeProduct.name}
            </h3>

            <p className="text-sm text-[#6b5c44] leading-relaxed">
              {activeProduct.desc}
            </p>

            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl sm:text-3xl font-bold text-[#1a1208]">{activeProduct.price}</span>
              <span className="text-xs text-[#6b5c44]/60 line-through">$72.00</span>
            </div>

            <button className="w-full mt-4 bg-[#1a1208] text-white py-3.5 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-[#b8935a] transition flex items-center justify-center gap-2 group">
              <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition" />
              Add to Cart
            </button>
          </div>

        </div>

      </div>

    </section>
  );
}
