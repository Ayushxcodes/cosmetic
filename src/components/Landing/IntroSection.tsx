"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ShoppingBag, Heart, Star, Sparkles, Check } from "lucide-react";
import { Product } from "@/types/ecommerce";
import { useCart } from "@/context/CartContext";

interface IntroSectionProps {
  products?: Product[];
  loading?: boolean;
}

const FALLBACK_INTRO_PRODUCTS: Product[] = [
  {
    id: "prism-aha-bha-glow-serum",
    name: "PRISM AHA + BHA Glow Serum",
    tagline: "Cellular resurfacing & luminous glass skin elixir",
    category: "Serums",
    price: 56,
    originalPrice: 68,
    image: "/cosmetic1.avif",
    gallery: ["/cosmetic1.avif", "/cream_swatch.png"],
    description: "Engineered in Kyoto botanical ateliers, our formula blends fermented galactomyces and cold-pressed camellia seed oils for porcelain glass skin.",
    benefits: ["Visibly shrinks enlarged pores", "Restores moisture barrier", "Glass skin radiance"],
    ingredients: ["Camellia Japonica Seed Oil", "Fermented Rice Filtrate", "Glycolic & Lactic Acid 5%"],
    howToUse: "Apply 3-4 drops after cleansing.",
    size: "50ml / 1.7 fl oz",
    skinType: "All Skin Types, Sensitive",
    rating: 4.9,
    reviewCount: 128,
    stock: 42,
    isFeatured: true,
    isBestSeller: true,
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "velvet-barrier-nourishing-cream",
    name: "VELVET BARRIER Squalane Cream",
    tagline: "Hokkaido plant squalane & bio-ceramide lipid matrix",
    category: "Creams & Balms",
    price: 62,
    originalPrice: 75,
    image: "/cream_swatch.png",
    gallery: ["/cream_swatch.png"],
    description: "A weightless whipped cream formulated with pure olive squalane and 5 skin-identical ceramides to restore skin moisture balance.",
    benefits: ["Reinforces skin moisture barrier", "Silky velvet finish", "Deep cellular nourishment"],
    ingredients: ["Pure Plant Squalane", "5 Bio-Identical Ceramides", "Reishi Mushroom"],
    howToUse: "Warm between fingers and press onto face.",
    size: "50ml / 1.7 fl oz",
    skinType: "Dry, Compromised Barrier",
    rating: 5.0,
    reviewCount: 88,
    stock: 19,
    isFeatured: true,
    isBestSeller: true,
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "zen-ritual-exclusive-cosmetic-set",
    name: "NIHON KIREI Master Ritual Box",
    tagline: "The complete 5-step porcelain glass skin transformation ceremony",
    category: "Ritual Sets",
    price: 168,
    originalPrice: 210,
    image: "/cosmetic_product_bg.png",
    gallery: ["/cosmetic_product_bg.png"],
    description: "Experience authentic Japanese cosmetics crafted to nurture your skin barrier and cultivate lasting vitality with our complete 5-step ritual.",
    benefits: ["Complete 5-step ritual", "Saves $48 compared to individual items", "Artisanal paulownia gift box"],
    ingredients: ["Kyoto Camellia", "Okinawa Marine Minerals", "Fermented Rice", "Uji Matcha"],
    howToUse: "Follow the 5-step ritual guide.",
    size: "5-Piece Master Set",
    skinType: "All Skin Types",
    rating: 5.0,
    reviewCount: 142,
    stock: 14,
    isFeatured: true,
    isBestSeller: true,
    createdAt: "2026-01-01T00:00:00.000Z",
  },
];

export default function IntroSection({
  products: propProducts,
}: IntroSectionProps) {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  // Pick 3 hero items for the 3 columns
  const showcaseProducts = useMemo(() => {
    if (propProducts && propProducts.length >= 3) {
      // Find a serum, a cream/mask, and a set/bestseller if available
      const serum = propProducts.find((p) => p.category === "Serums") || propProducts[0];
      const cream =
        propProducts.find((p) => p.category === "Creams & Balms" || p.category === "Masks") ||
        propProducts[1];
      const setOrBestseller =
        propProducts.find((p) => p.category === "Ritual Sets" || p.id.includes("set")) ||
        propProducts[2];

      const list = [serum, cream, setOrBestseller];
      // ensure 3 distinct items
      const unique = Array.from(new Set(list));
      if (unique.length === 3) return unique;
      return propProducts.slice(0, 3);
    }
    return FALLBACK_INTRO_PRODUCTS;
  }, [propProducts]);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  const product1 = showcaseProducts[0] || FALLBACK_INTRO_PRODUCTS[0];
  const product2 = showcaseProducts[1] || FALLBACK_INTRO_PRODUCTS[1];
  const product3 = showcaseProducts[2] || FALLBACK_INTRO_PRODUCTS[2];

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 lg:gap-10 items-stretch mt-2">
          
          {/* Column 1: Botanical Elixir Product Card */}
          <div className="flex flex-col justify-between bg-white p-6 rounded-[2.5rem] border border-[#e8d9c0]/80 shadow-sm hover:shadow-lg transition-all duration-300 relative group">
            {/* Top row */}
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

            {/* Product Image */}
            <Link
              href={`/shop/${product1.id}`}
              className="relative w-full aspect-[4/3] rounded-[1.75rem] overflow-hidden bg-[#faf6ef]/40 p-4 my-2 flex items-center justify-center group-hover:scale-102 transition duration-500"
            >
              <Image
                src={product1.image}
                alt={product1.name}
                fill
                className="object-contain p-2 drop-shadow-md group-hover:scale-108 transition-transform duration-500"
              />
            </Link>

            {/* Product Details */}
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

            {/* Price & Add to Bag */}
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

          {/* Column 2: Swatch / Formulation Texture Showcase */}
          <div className="flex flex-col justify-between bg-white p-6 rounded-[2.5rem] border border-[#e8d9c0]/80 shadow-sm hover:shadow-lg transition-all duration-300 relative group overflow-hidden">
            {/* Top row */}
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

            {/* Central artistic swatch & product visual */}
            <Link
              href={`/shop/${product2.id}`}
              className="relative w-full aspect-[4/3] rounded-[1.75rem] overflow-hidden bg-gradient-to-b from-[#faf6ef] to-[#f5ebd9] p-4 my-2 flex items-center justify-center group cursor-pointer"
            >
              {/* Tilted silky texture swatch */}
              <div className="relative w-36 h-36 transform group-hover:rotate-12 transition-transform duration-500">
                <Image
                  src={product2.image || "/cream_swatch.png"}
                  alt={product2.name}
                  fill
                  className="object-contain drop-shadow-lg p-2"
                />
              </div>

              <div className="absolute bottom-2.5 bg-white/90 backdrop-blur-xs text-[#1a1208] px-3 py-0.5 rounded-full text-[9px] uppercase font-bold tracking-widest border border-[#e8d9c0]">
                {product2.size || "50ml • Pure Actives"}
              </div>
            </Link>

            {/* Product Details */}
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

            {/* Price & Add to Bag */}
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

          {/* Column 3: Master Ritual Box / Luxury Set Card */}
          <div className="flex flex-col justify-between bg-white p-6 rounded-[2.5rem] border border-[#e8d9c0]/80 shadow-sm hover:shadow-lg transition-all duration-300 relative group">
            {/* Top row */}
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

            {/* Product Image */}
            <Link
              href={`/shop/${product3.id}`}
              className="relative w-full aspect-[4/3] rounded-[1.75rem] overflow-hidden bg-[#faf6ef]/40 p-4 my-2 flex items-center justify-center group-hover:scale-102 transition duration-500"
            >
              <Image
                src={product3.image}
                alt={product3.name}
                fill
                className="object-contain p-2 drop-shadow-md group-hover:scale-108 transition-transform duration-500"
              />
              {product3.originalPrice && (
                <span className="absolute top-3 left-3 text-[9px] font-bold uppercase tracking-wider bg-[#b8935a] text-[#1a1208] px-2.5 py-0.5 rounded-full">
                  Special Gift Box
                </span>
              )}
            </Link>

            {/* Product Details */}
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

            {/* Price & Add to Bag */}
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

        </div>

      </div>
    </section>
  );
}
