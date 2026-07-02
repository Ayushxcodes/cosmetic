"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Heart, ArrowUpRight } from "lucide-react";

interface CatalogItem {
  id: string;
  name: string;
  price: string;
  image: string;
}

export default function CatalogueSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const catalogItems: CatalogItem[] = [
    { id: "1", name: "Glow Serum", price: "$56.00", image: "/cosmetic1.avif" },
    { id: "2", name: "BB Cream", price: "$56.00", image: "/cosmetic2.avif" },
    { id: "3", name: "Sun Cream", price: "$56.00", image: "/cosmetic3.avif" }
  ];

  const filteredItems = catalogItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFavorite = (id: string) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="bg-[#faf6ef]/30 w-full py-20 px-6 sm:px-12 md:px-16 border-t border-[#e8d9c0]/30">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Header with search bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-4 border-b border-[#e8d9c0]/20">
          <div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1a1208] lobster-two-bold">
              Your Beauty Catalogue
            </h2>
            <p className="text-xs text-[#6b5c44] tracking-widest uppercase mt-2 font-semibold">
              Experience the Ultimate Beauty Makeover
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:max-w-xs">
            <Search className="w-4 h-4 text-[#6b5c44]/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search for product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[#e8d9c0] bg-white text-sm text-[#1a1208] placeholder-[#6b5c44]/50 focus:outline-none focus:ring-1 focus:ring-[#1a1208] transition"
            />
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          
          {/* Card 1: Read More CTA card */}
          <div className="bg-[#faf6ef] border border-[#e8d9c0]/60 p-8 rounded-[2.5rem] flex flex-col justify-between min-h-[300px] shadow-sm relative group">
            <div className="flex flex-col gap-3">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#b8935a]">Curated Collection</span>
              <h3 className="text-2xl font-serif text-[#1a1208] lobster-two-bold leading-tight">
                Authentic J-Beauty & C-Beauty Formulations
              </h3>
            </div>
            
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-[#1a1208]/20 hover:border-[#1a1208] rounded-full px-6 py-3 text-xs uppercase font-bold tracking-wider text-[#1a1208] bg-white hover:shadow transition w-fit"
            >
              Read More <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Product Cards */}
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#e8d9c0]/40 rounded-[2.5rem] p-5 flex flex-col justify-between min-h-[300px] shadow-sm hover:shadow-md transition relative group"
            >
              {/* Wishlist Heart Icon */}
              <button
                onClick={() => toggleFavorite(item.id)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#faf6ef] flex items-center justify-center text-[#6b5c44] hover:text-[#e11d48] transition shadow-sm z-10"
                aria-label="Add to favorites"
              >
                <Heart 
                  className={`w-4 h-4 ${favorites[item.id] ? "fill-[#e11d48] text-[#e11d48]" : ""}`} 
                />
              </button>

              {/* Product Image */}
              <div className="relative w-full aspect-square max-h-40 rounded-[1.75rem] overflow-hidden bg-[#faf6ef]/30 my-2">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Info & Action button row */}
              <div className="flex justify-between items-end mt-4">
                <div>
                  <h4 className="text-base font-serif font-bold text-[#1a1208] lobster-two-bold mb-1">
                    {item.name}
                  </h4>
                  <span className="text-sm font-semibold text-[#6b5c44]">{item.price}</span>
                </div>

                {/* Arrow detail button */}
                <button
                  className="w-9 h-9 rounded-full bg-[#1a1208] text-white flex items-center justify-center hover:bg-[#b8935a] transition group-hover:translate-x-1 group-hover:-translate-y-1 duration-300"
                  aria-label="View Product"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}

          {/* Fallback for empty filter results */}
          {filteredItems.length === 0 && (
            <div className="col-span-1 sm:col-span-3 py-16 text-center text-[#6b5c44]/60 text-sm">
              No products found matching your search.
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
