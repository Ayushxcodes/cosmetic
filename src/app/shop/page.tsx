"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Heart, ShoppingBag, Sparkles, Check, Star, ArrowRight } from "lucide-react";
import { Product } from "@/types/ecommerce";
import { useCart } from "@/context/CartContext";

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [addingId, setAddingId] = useState<string | null>(null);

  const { addToCart, wishlist, toggleWishlist } = useCart();

  const categories = [
    "All",
    "Serums",
    "Creams & Balms",
    "Cleansers",
    "Masks",
    "Eye Care",
    "Ritual Sets",
  ];

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory =
          activeCategory === "All" ||
          p.category.toLowerCase() === activeCategory.toLowerCase();
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        // featured default
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return 0;
      });
  }, [products, activeCategory, searchQuery, sortBy]);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAddingId(product.id);
    addToCart(product, 1);
    setTimeout(() => {
      setAddingId(null);
    }, 600);
  };

  return (
    <div className="w-full bg-[#faf6ef] min-h-screen text-[#1a1208]">
      
      {/* Editorial Hero Header */}
      <section className="relative w-full py-16 sm:py-24 px-6 border-b border-[#e8d9c0]/50 overflow-hidden bg-gradient-to-b from-[#f5ede0] to-[#faf6ef]">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 border border-[#e8d9c0] text-[10px] uppercase font-bold tracking-[0.25em] text-[#b8935a] mb-4">
            <Sparkles className="w-3 h-3 text-[#b8935a]" />
            Official Niimi Store
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif lobster-two-bold text-[#1a1208] max-w-3xl leading-[1.15]">
            The Curated Skincare Collection
          </h1>
          <p className="mt-4 text-xs sm:text-sm text-[#6b5c44] max-w-xl font-normal leading-relaxed">
            Formulated in harmony with ancient Japanese botanical wisdom and modern cellular dermatological science. Each formula restores your skin&apos;s natural luminosity.
          </p>

          <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-xs text-[#6b5c44] font-medium">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" /> 100% Cruelty-Free
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" /> Complimentary Express Shipping over $50
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" /> 30-Day Ritual Guarantee
            </span>
          </div>
        </div>
      </section>

      {/* Filter and Control Bar */}
      <section className="sticky top-0 z-30 bg-[#faf6ef]/95 backdrop-blur-md border-b border-[#e8d9c0]/60 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4">
          
          {/* Categories Pill Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 lg:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider shrink-0 transition-all ${
                  activeCategory === cat
                    ? "bg-[#1a1208] text-white shadow-sm"
                    : "bg-white/60 text-[#6b5c44] border border-[#e8d9c0] hover:bg-white hover:text-[#1a1208]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3">
            {/* Search Box */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-[#6b5c44]/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search formulations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 rounded-full border border-[#e8d9c0] bg-white text-xs text-[#1a1208] placeholder-[#6b5c44]/50 focus:outline-none focus:ring-1 focus:ring-[#1a1208] transition"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "featured" | "price-asc" | "price-desc" | "rating")}
                aria-label="Sort products"
                className="bg-white border border-[#e8d9c0] text-[#1a1208] text-xs font-medium rounded-full px-3.5 py-2 pr-7 focus:outline-none focus:ring-1 focus:ring-[#1a1208] cursor-pointer appearance-none relative"
                style={{
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b5c44' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.6rem center",
                  backgroundSize: "0.85em",
                }}
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

        </div>
      </section>

      {/* Product Catalog Grid */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-[2rem] border border-[#e8d9c0]/40 p-6 animate-pulse space-y-4"
              >
                <div className="aspect-square bg-[#faf6ef] rounded-2xl" />
                <div className="h-4 bg-[#f3ebd9] rounded-md w-3/4" />
                <div className="h-3 bg-[#f3ebd9] rounded-md w-1/2" />
                <div className="h-8 bg-[#f3ebd9] rounded-full w-full" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-24 text-center">
            <h3 className="text-xl font-serif lobster-two-bold text-[#1a1208] mb-2">
              No Formulations Match Your Selection
            </h3>
            <p className="text-xs text-[#6b5c44] mb-6">
              Try adjusting your category filter or search keywords.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="bg-[#1a1208] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#b8935a] transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const isWish = wishlist.includes(product.id);
              const discountPercent = product.originalPrice
                ? Math.round(
                    ((product.originalPrice - product.price) / product.originalPrice) * 100
                  )
                : 0;

              return (
                <div
                  key={product.id}
                  className="group bg-white border border-[#e8d9c0]/60 hover:border-[#b8935a]/50 rounded-[2.25rem] p-5 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative"
                >
                  {/* Badges & Wishlist Header */}
                  <div className="flex justify-between items-start z-10">
                    <div className="flex flex-col gap-1.5">
                      {product.isBestSeller && (
                        <span className="bg-[#b8935a] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full w-fit shadow-xs">
                          Best Seller
                        </span>
                      )}
                      {discountPercent > 0 && (
                        <span className="bg-[#1a1208] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full w-fit">
                          Save {discountPercent}%
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(product.id);
                      }}
                      className="w-9 h-9 rounded-full bg-[#faf6ef] flex items-center justify-center text-[#6b5c44] hover:text-red-500 transition shadow-xs"
                      aria-label="Wishlist toggle"
                    >
                      <Heart
                        className={`w-4 h-4 transition ${
                          isWish ? "fill-red-500 text-red-500" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Product Clickable Image */}
                  <Link
                    href={`/shop/${product.id}`}
                    className="relative w-full aspect-square my-3 rounded-[1.75rem] overflow-hidden bg-gradient-to-b from-[#faf6ef]/70 to-[#faf6ef] flex items-center justify-center cursor-pointer"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-5 group-hover:scale-108 transition duration-500"
                    />
                  </Link>

                  {/* Product Info */}
                  <div className="flex flex-col flex-1 justify-between pt-2">
                    <div>
                      <div className="flex justify-between items-center text-[10px] text-[#6b5c44] uppercase tracking-wider mb-1 font-semibold">
                        <span>{product.category}</span>
                        <span className="flex items-center gap-1 text-[#b8935a]">
                          <Star className="w-3 h-3 fill-[#b8935a]" /> {product.rating} ({product.reviewCount})
                        </span>
                      </div>

                      <Link href={`/shop/${product.id}`}>
                        <h2 className="text-lg font-serif lobster-two-bold text-[#1a1208] group-hover:text-[#b8935a] transition line-clamp-1">
                          {product.name}
                        </h2>
                      </Link>

                      <p className="text-xs text-[#6b5c44] line-clamp-2 mt-1 leading-relaxed">
                        {product.tagline}
                      </p>
                    </div>

                    {/* Price and Add to Cart Row */}
                    <div className="mt-5 pt-3 border-t border-[#e8d9c0]/40 flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-bold text-[#1a1208]">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-[#6b5c44]/60 line-through">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-[#6b5c44] block">
                          {product.size}
                        </span>
                      </div>

                      <button
                        onClick={(e) => handleQuickAdd(product, e)}
                        disabled={addingId === product.id}
                        className="bg-[#1a1208] text-white hover:bg-[#b8935a] px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 shadow-xs group-hover:shadow"
                      >
                        {addingId === product.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-white" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Quick Add</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Skincare Ritual Consultation Banner */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-16 mb-8">
        <div className="bg-[#1a1208] text-white rounded-[2.5rem] p-8 sm:p-14 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="relative z-10 max-w-xl">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#b8935a]">
              Personalized Consultation
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif lobster-two-bold text-white mt-2 mb-3">
              Uncertain Which Ritual Suits Your Skin?
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Explore our ritual guidelines curated by master estheticians to find your personalized balance of cleansers, active serums, and deep hydration veils.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Link
              href="/rituals"
              className="inline-flex items-center gap-2 bg-[#b8935a] hover:bg-[#a07e49] text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition shadow-lg"
            >
              <span>Explore The Rituals</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
