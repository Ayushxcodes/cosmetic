"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";

const products = [
  {
    id: 1,
    category: "Serum",
    name: "Sakura Brightening Serum",
    price: "¥ 8,400",
    tag: "Best Seller",
    bg: "bg-[#F7E8E0]",
  },
  {
    id: 2,
    category: "Moisturiser",
    name: "Camellia Deep Moisture",
    price: "¥ 5,800",
    original: "¥ 7,200",
    tag: null,
    bg: "bg-[#E8D9C0]",
  },
  {
    id: 3,
    category: "Cleanser",
    name: "Yuzu Foam Cleanser",
    price: "¥ 4,600",
    tag: "New",
    bg: "bg-[#F2E8DF]",
  },
  {
    id: 4,
    category: "Eye Care",
    name: "Pearl Eye Repair Elixir",
    price: "¥ 9,800",
    tag: null,
    bg: "bg-[#EDE4DA]",
  },
];

export default function ProductsSection() {
  const categories = useMemo(() => ["All", ...new Set(products.map((p) => p.category))], []);

  const [filter, setFilter] = useState("All");

  // create 12 items (3 rows x 4 cols) by repeating the base products
  const expanded = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({ ...products[i % products.length], _idx: i }));
  }, []);

  const visible = useMemo(() => {
    return expanded.filter((p) => filter === "All" || p.category === filter);
  }, [expanded, filter]);

  return (
    <section className="w-full py-16">
      <div className="mx-auto max-w-7xl px-8 lg:px-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div>
            <div className="text-sm tracking-wider text-[#b8935a] uppercase font-medium">Curated for You</div>
            <h2 className="text-[32px] sm:text-[44px] font-serif font-black text-[#1a1208] leading-tight mb-0">Bestsellers</h2>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-start sm:justify-end">
            <div className="flex gap-2 flex-wrap">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`text-sm px-3 py-1 rounded-full ${filter === c ? "bg-[#b8935a] text-white" : "bg-white/80 text-[#6b5c44]"}`}
                >
                  {c}
                </button>
              ))}
            </div>

            <Link href="#" className="text-sm text-[#6b5c44] hover:text-[#1a1208]">
              View All Products →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visible.map((p, idx) => (
            <article key={`${p.id}-${p._idx}`} className={`bg-white rounded-2xl shadow-md overflow-hidden transform hover:-translate-y-1 transition`}>
              <div className={`relative h-44 sm:h-52 md:h-56 flex items-center justify-center ${p.bg}`}>
                <div className="w-36 h-full flex items-center justify-center">
                  <svg width="80" height="120" viewBox="0 0 80 120" className="opacity-90">
                    <rect x="12" y="10" width="56" height="100" rx="12" fill="#E8BFAC" opacity="0.6" />
                    <rect x="20" y="10" width="36" height="40" rx="8" fill="#C97B6A" opacity="0.8" />
                    <rect x="28" y="2" width="20" height="12" rx="6" fill="#8B4A3C" opacity="0.7" />
                  </svg>
                </div>

                {p.tag && (
                  <span className="absolute left-3 top-3 text-xs font-semibold px-3 py-1 rounded-full text-white" style={{ background: "#8B4A3C" }}>
                    {p.tag}
                  </span>
                )}

                <button className="absolute right-3 bottom-3 bg-white/90 text-[#1a1208] px-3 py-1 rounded-md text-sm shadow">Quick Add</button>
              </div>

              <div className="p-6">
                <div className="text-xs text-[#6b5c44] mb-1">{p.category}</div>
                <h3 className="text-lg font-semibold text-[#1a1208] mb-2">{p.name}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
