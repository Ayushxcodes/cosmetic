"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Heart, ArrowUpRight, ShoppingBag } from "lucide-react";
import { Product } from "@/types/ecommerce";
import { useCart } from "@/context/CartContext";

interface CatalogueSectionProps {
  products?: Product[];
  loading?: boolean;
}

export default function CatalogueSection({
  products: propProducts,
  loading: propLoading,
}: CatalogueSectionProps = {}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [fetchedItems, setFetchedItems] = useState<Product[]>([]);
  const [fetching, setFetching] = useState<boolean>(
    !propProducts || propProducts.length === 0
  );
  const { addToCart, wishlist, toggleWishlist } = useCart();

  const items = propProducts && propProducts.length > 0 ? propProducts : fetchedItems;
  const loading = propLoading ?? (propProducts && propProducts.length > 0 ? false : fetching);

  useEffect(() => {
    if (propProducts && propProducts.length > 0) {
      return;
    }

    let isMounted = true;
    async function loadCatalogue() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data: Product[] = await res.json();
          if (isMounted) {
            setFetchedItems(data);
          }
        }
      } catch (e) {
        console.error("Failed to load catalogue products from database:", e);
      } finally {
        if (isMounted) {
          setFetching(false);
        }
      }
    }
    loadCatalogue();
    return () => {
      isMounted = false;
    };
  }, [propProducts]);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="bg-[#faf6ef]/30 w-full py-20 px-6 sm:px-12 md:px-16 border-t border-[#e8d9c0]/30">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Header with search bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-4 border-b border-[#e8d9c0]/20">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#b8935a]" />
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#b8935a]">
                PostgreSQL Curated Archive
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1a1208] lobster-two-bold">
              Your Beauty Catalogue
            </h2>
            <p className="text-xs text-[#6b5c44] tracking-widest uppercase mt-2 font-semibold">
              Browse Authentic Formulations Directly from Store Database
            </p>
          </div>

          {/* Search bar & Shop Link */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-[#6b5c44]/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search catalogue..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[#e8d9c0] bg-white text-xs text-[#1a1208] placeholder-[#6b5c44]/50 focus:outline-none focus:ring-1 focus:ring-[#1a1208] transition"
              />
            </div>
            <Link
              href="/shop"
              className="hidden sm:inline-flex shrink-0 px-4 py-2.5 rounded-full bg-[#1a1208] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#b8935a] transition"
            >
              Shop All
            </Link>
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {/* Card 1: Editorial Collection Banner */}
          <div className="bg-[#faf6ef] border border-[#e8d9c0]/60 p-8 rounded-[2.5rem] flex flex-col justify-between min-h-[300px] shadow-sm relative group">
            <div className="flex flex-col gap-3">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#b8935a]">
                Curated Collection
              </span>
              <h3 className="text-2xl font-serif text-[#1a1208] lobster-two-bold leading-tight">
                Authentic J-Beauty &amp; C-Beauty Formulations
              </h3>
              <p className="text-xs text-[#6b5c44] leading-relaxed">
                Every bottle and elixir is verified in our active stock catalog with transparent ingredients.
              </p>
            </div>

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 border border-[#1a1208]/20 hover:border-[#1a1208] rounded-full px-6 py-3 text-xs uppercase font-bold tracking-wider text-[#1a1208] bg-white hover:shadow transition w-fit"
            >
              Explore Shop <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Loading Skeletons */}
          {loading && items.length === 0 && (
            <>
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-white border border-[#e8d9c0]/40 rounded-[2.5rem] p-5 flex flex-col justify-between min-h-[300px] animate-pulse"
                >
                  <div className="w-full aspect-square max-h-40 rounded-[1.75rem] bg-[#faf6ef]/70 my-2" />
                  <div className="space-y-2 mt-4">
                    <div className="h-3 w-16 bg-stone-200 rounded" />
                    <div className="h-5 w-3/4 bg-stone-200 rounded" />
                    <div className="h-4 w-12 bg-stone-200 rounded" />
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Product Cards From Database */}
          {filteredItems.map((item) => {
            const isWish = wishlist.includes(item.id);

            return (
              <div
                key={item.id}
                className="bg-white border border-[#e8d9c0]/40 rounded-[2.5rem] p-5 flex flex-col justify-between min-h-[300px] shadow-sm hover:shadow-md transition relative group"
              >
                {/* Wishlist Heart Icon */}
                <button
                  onClick={() => toggleWishlist(item.id)}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#faf6ef] flex items-center justify-center text-[#6b5c44] hover:text-[#e11d48] transition shadow-xs z-10 cursor-pointer"
                  aria-label="Add to favorites"
                >
                  <Heart
                    className={`w-4 h-4 ${isWish ? "fill-[#e11d48] text-[#e11d48]" : ""}`}
                  />
                </button>

                {/* Product Image */}
                <Link
                  href={`/shop/${item.id}`}
                  className="relative w-full aspect-square max-h-40 rounded-[1.75rem] overflow-hidden bg-[#faf6ef]/30 my-2 block"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition duration-500"
                  />
                </Link>

                {/* Info & Action button row */}
                <div className="flex justify-between items-end mt-4">
                  <div className="flex-1 min-w-0 pr-2">
                    <span className="text-[10px] uppercase font-bold text-[#b8935a] block truncate">
                      {item.category}
                    </span>
                    <Link href={`/shop/${item.id}`}>
                      <h4 className="text-base font-serif font-bold text-[#1a1208] lobster-two-bold mb-1 truncate hover:text-[#b8935a] transition">
                        {item.name}
                      </h4>
                    </Link>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-bold text-[#1a1208]">
                        ${item.price.toFixed(2)}
                      </span>
                      {item.originalPrice && (
                        <span className="text-[10px] text-[#8a7b68] line-through">
                          ${item.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Add to Bag button */}
                  <button
                    onClick={() => addToCart(item, 1)}
                    className="w-9 h-9 rounded-full bg-[#1a1208] text-white flex items-center justify-center hover:bg-[#b8935a] transition duration-300 shrink-0 shadow-xs cursor-pointer"
                    aria-label={`Add ${item.name} to cart`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* Fallback for empty filter results */}
          {!loading && filteredItems.length === 0 && (
            <div className="col-span-1 sm:col-span-3 py-16 text-center text-[#6b5c44]/60 text-sm">
              No products found matching your search.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
