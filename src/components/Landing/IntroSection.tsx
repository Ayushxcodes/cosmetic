"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ShoppingBag, Heart, Star, Sparkles, Check } from "lucide-react";
import { Product } from "@/types/ecommerce";
import { useCart } from "@/context/CartContext";

interface IntroSectionProps {
  products?: Product[];
  loading?: boolean;
}

export default function IntroSection({
  products: propProducts,
  loading: propLoading,
}: IntroSectionProps = {}) {
  const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);
  const [fetching, setFetching] = useState<boolean>(!propProducts || propProducts.length === 0);
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  useEffect(() => {
    if (propProducts && propProducts.length > 0) return;
    let isMounted = true;
    async function load() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          if (isMounted) setFetchedProducts(data);
        }
      } catch (e) {
        console.error("IntroSection error loading products:", e);
      } finally {
        if (isMounted) setFetching(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [propProducts]);

  const products = propProducts && propProducts.length > 0 ? propProducts : fetchedProducts;
  const loading = propLoading ?? (propProducts && propProducts.length > 0 ? false : fetching);

  // Pick 3 hero items for the 3 columns directly from DB products
  const showcaseProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    if (products.length >= 3) {
      const serum = products.find((p) => p.category === "Serums") || products[0];
      const cream =
        products.find((p) => p.category === "Creams & Balms" || p.category === "Masks") ||
        products[1];
      const setOrBestseller =
        products.find((p) => p.category === "Ritual Sets" || p.id.includes("set") || p.isFeatured) ||
        products[2];

      const list = [serum, cream, setOrBestseller];
      const unique = Array.from(new Set(list));
      if (unique.length === 3) return unique;
      return products.slice(0, 3);
    }
    return products.slice(0, 3);
  }, [products]);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  const product1 = showcaseProducts[0];
  const product2 = showcaseProducts[1];
  const product3 = showcaseProducts[2];

  return (
    <section className="bg-[#faf6ef] w-full py-20 px-6 sm:px-12 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Title row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#b8935a]" />
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#b8935a]">
                ✦ 日本の美と知恵 · AUTHENTIC J-BEAUTY DISCOVERIES ✦
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1a1208] lobster-two-bold leading-tight max-w-2xl">
              Authentic Japanese Cosmetics <br className="hidden sm:inline" /> Crafted for Glass Skin
            </h2>
          </div>
          
          {/* Explore all shop circle badge */}
          <Link 
            href="/shop" 
            className="group relative flex items-center justify-center w-16 h-16 rounded-full border border-[#1a1208]/20 bg-white hover:bg-[#1a1208] hover:text-white transition-all duration-300 shadow-sm shrink-0 cursor-pointer"
          >
            <div className="flex flex-col items-center">
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              <span className="text-[9px] uppercase font-bold tracking-widest mt-1">Shop</span>
            </div>
          </Link>
        </div>

        {/* 3-Column Editorial Product Grid */}
        {loading || showcaseProducts.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mt-2">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white p-6 rounded-[2.5rem] border border-[#e8d9c0]/80 h-[500px] animate-pulse flex flex-col justify-between"
              >
                <div className="w-24 h-6 bg-[#faf6ef] rounded-full" />
                <div className="w-full h-64 bg-[#faf6ef] rounded-[2rem] my-4" />
                <div className="space-y-2">
                  <div className="w-3/4 h-5 bg-[#faf6ef] rounded" />
                  <div className="w-1/2 h-4 bg-[#faf6ef] rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 lg:gap-10 items-stretch mt-2">
            
            {/* Column 1: Botanical Elixir Product Card */}
            {product1 && (
              <div className="flex flex-col justify-between bg-white p-6 rounded-[2.5rem] border border-[#e8d9c0]/80 shadow-sm hover:shadow-lg transition-all duration-300 relative group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#b8935a] bg-[#faf6ef] px-3 py-1 rounded-full border border-[#e8d9c0]/60">
                    {product1.category}
                  </span>

                  <button
                    onClick={() => toggleWishlist(product1.id)}
                    className="w-8 h-8 rounded-full bg-[#faf6ef] hover:bg-stone-100 border border-[#e8d9c0]/80 flex items-center justify-center text-[#6b5c44] hover:text-[#e11d48] transition cursor-pointer"
                    aria-label="Wishlist"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        wishlist.includes(product1.id) ? "fill-[#e11d48] text-[#e11d48]" : ""
                      }`}
                    />
                  </button>
                </div>

                <Link
                  href={`/shop/${product1.id}`}
                  className="relative w-full aspect-[4/5] min-h-[320px] sm:min-h-[360px] rounded-[2rem] overflow-hidden bg-gradient-to-b from-[#faf6ef] to-[#f5ede0] p-3 my-2 flex items-center justify-center group-hover:scale-[1.02] group-hover:shadow-md transition-all duration-500"
                >
                  <Image
                    src={product1.image}
                    alt={product1.name}
                    fill
                    className="object-contain p-2 drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                <div className="space-y-1.5 my-3">
                  <div className="flex items-center gap-1 text-[#b8935a] text-xs">
                    <Star className="w-3.5 h-3.5 fill-[#b8935a]" />
                    <span className="font-bold">{product1.rating?.toFixed(1) || "4.9"}</span>
                    <span className="text-[#8a7b68] text-[11px]">
                      ({product1.reviewCount || 128} reviews)
                    </span>
                  </div>

                  <Link href={`/shop/${product1.id}`}>
                    <h3 className="text-xl font-serif lobster-two-bold text-[#1a1208] group-hover:text-[#b8935a] transition line-clamp-1">
                      {product1.name}
                    </h3>
                  </Link>

                  <p className="text-xs text-[#6b5c44] font-serif italic line-clamp-2 leading-relaxed">
                    {product1.tagline || product1.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#e8d9c0]/60 flex items-center justify-between gap-2 mt-auto">
                  <div>
                    <span className="text-xl font-bold font-serif text-[#1a1208]">
                      ${product1.price.toFixed(2)}
                    </span>
                    {product1.originalPrice && (
                      <span className="text-xs line-through text-[#8a7b68] block -mt-1">
                        ${product1.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => handleAddToCart(e, product1)}
                    className="px-4 py-2.5 rounded-full bg-[#1a1208] hover:bg-[#b8935a] text-white text-xs font-semibold uppercase tracking-wider transition-colors duration-200 flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    {addedId === product1.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Column 2: Swatch / Texture Showcase */}
            {product2 && (
              <div className="flex flex-col justify-between bg-white p-6 rounded-[2.5rem] border border-[#e8d9c0]/80 shadow-sm hover:shadow-lg transition-all duration-300 relative group overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#b8935a] bg-[#faf6ef] px-3 py-1 rounded-full border border-[#e8d9c0]/60 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#b8935a]" />
                    Japanese Science
                  </span>

                  <button
                    onClick={() => toggleWishlist(product2.id)}
                    className="w-8 h-8 rounded-full bg-[#faf6ef] hover:bg-stone-100 border border-[#e8d9c0]/80 flex items-center justify-center text-[#6b5c44] hover:text-[#e11d48] transition cursor-pointer"
                    aria-label="Wishlist"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        wishlist.includes(product2.id) ? "fill-[#e11d48] text-[#e11d48]" : ""
                      }`}
                    />
                  </button>
                </div>

                <Link
                  href={`/shop/${product2.id}`}
                  className="relative w-full aspect-[4/5] min-h-[320px] sm:min-h-[360px] rounded-[2rem] overflow-hidden bg-gradient-to-b from-[#faf6ef] to-[#f5ebd9] p-3 my-2 flex items-center justify-center group cursor-pointer group-hover:scale-[1.02] group-hover:shadow-md transition-all duration-500"
                >
                  <Image
                    src={product2.image}
                    alt={product2.name}
                    fill
                    className="object-contain p-2 drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                  />

                  {product2.size && (
                    <div className="absolute bottom-3 bg-white/95 backdrop-blur-xs text-[#1a1208] px-3.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest border border-[#e8d9c0] shadow-sm">
                      {product2.size}
                    </div>
                  )}
                </Link>

                <div className="space-y-1.5 my-3">
                  <div className="flex items-center gap-1 text-[#b8935a] text-xs">
                    <Star className="w-3.5 h-3.5 fill-[#b8935a]" />
                    <span className="font-bold">{product2.rating?.toFixed(1) || "5.0"}</span>
                    <span className="text-[#8a7b68] text-[11px]">
                      ({product2.reviewCount || 88} reviews)
                    </span>
                  </div>

                  <Link href={`/shop/${product2.id}`}>
                    <h3 className="text-xl font-serif lobster-two-bold text-[#1a1208] group-hover:text-[#b8935a] transition line-clamp-1">
                      {product2.name}
                    </h3>
                  </Link>

                  <p className="text-xs text-[#6b5c44] font-serif italic line-clamp-2 leading-relaxed">
                    {product2.tagline || product2.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#e8d9c0]/60 flex items-center justify-between gap-2 mt-auto">
                  <div>
                    <span className="text-xl font-bold font-serif text-[#1a1208]">
                      ${product2.price.toFixed(2)}
                    </span>
                    {product2.originalPrice && (
                      <span className="text-xs line-through text-[#8a7b68] block -mt-1">
                        ${product2.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => handleAddToCart(e, product2)}
                    className="px-4 py-2.5 rounded-full bg-[#1a1208] hover:bg-[#b8935a] text-white text-xs font-semibold uppercase tracking-wider transition-colors duration-200 flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    {addedId === product2.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Column 3: Set / Ritual Card */}
            {product3 && (
              <div className="flex flex-col justify-between bg-white p-6 rounded-[2.5rem] border border-[#e8d9c0]/80 shadow-sm hover:shadow-lg transition-all duration-300 relative group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#b8935a] bg-[#faf6ef] px-3 py-1 rounded-full border border-[#e8d9c0]/60">
                    {product3.category}
                  </span>

                  <button
                    onClick={() => toggleWishlist(product3.id)}
                    className="w-8 h-8 rounded-full bg-[#faf6ef] hover:bg-stone-100 border border-[#e8d9c0]/80 flex items-center justify-center text-[#6b5c44] hover:text-[#e11d48] transition cursor-pointer"
                    aria-label="Wishlist"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        wishlist.includes(product3.id) ? "fill-[#e11d48] text-[#e11d48]" : ""
                      }`}
                    />
                  </button>
                </div>

                <Link
                  href={`/shop/${product3.id}`}
                  className="relative w-full aspect-[4/5] min-h-[320px] sm:min-h-[360px] rounded-[2rem] overflow-hidden bg-gradient-to-b from-[#faf6ef] to-[#f5ede0] p-3 my-2 flex items-center justify-center group-hover:scale-[1.02] group-hover:shadow-md transition-all duration-500"
                >
                  <Image
                    src={product3.image}
                    alt={product3.name}
                    fill
                    className="object-contain p-2 drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                  />
                  {product3.isFeatured && (
                    <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-[#b8935a] text-white px-3 py-1 rounded-full shadow-xs">
                      Curated Ritual
                    </span>
                  )}
                </Link>

                <div className="space-y-1.5 my-3">
                  <div className="flex items-center gap-1 text-[#b8935a] text-xs">
                    <Star className="w-3.5 h-3.5 fill-[#b8935a]" />
                    <span className="font-bold">{product3.rating?.toFixed(1) || "5.0"}</span>
                    <span className="text-[#8a7b68] text-[11px]">
                      ({product3.reviewCount || 142} reviews)
                    </span>
                  </div>

                  <Link href={`/shop/${product3.id}`}>
                    <h3 className="text-xl font-serif lobster-two-bold text-[#1a1208] group-hover:text-[#b8935a] transition line-clamp-1">
                      {product3.name}
                    </h3>
                  </Link>

                  <p className="text-xs text-[#6b5c44] font-serif italic line-clamp-2 leading-relaxed">
                    {product3.tagline || product3.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#e8d9c0]/60 flex items-center justify-between gap-2 mt-auto">
                  <div>
                    <span className="text-xl font-bold font-serif text-[#1a1208]">
                      ${product3.price.toFixed(2)}
                    </span>
                    {product3.originalPrice && (
                      <span className="text-xs line-through text-[#8a7b68] block -mt-1">
                        ${product3.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => handleAddToCart(e, product3)}
                    className="px-4 py-2.5 rounded-full bg-[#1a1208] hover:bg-[#b8935a] text-white text-xs font-semibold uppercase tracking-wider transition-colors duration-200 flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    {addedId === product3.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
}
