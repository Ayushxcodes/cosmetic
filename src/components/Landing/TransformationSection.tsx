"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  Heart,
  Star,
  Sparkles,
  Check,
} from "lucide-react";
import { Product } from "@/types/ecommerce";
import { useCart } from "@/context/CartContext";

interface TransformationSectionProps {
  products?: Product[];
  loading?: boolean;
}

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: "prism-aha-bha-glow-serum",
    name: "PRISM AHA + BHA Glow Serum",
    tagline: "Cellular resurfacing & luminous glass skin elixir",
    category: "Serums",
    price: 56,
    originalPrice: 68,
    image: "/cosmetic1.avif",
    gallery: ["/cosmetic1.avif", "/cream_swatch.png"],
    description: "Formulated with fermented rice filtrate, Kyoto camellia essence, and micro-dosed AHAs to dissolve impurities and impart a luminous porcelain finish.",
    benefits: ["Refines pores", "Restores moisture barrier", "Glass skin radiance"],
    ingredients: ["Camellia Japonica Seed Oil", "Fermented Rice Filtrate (Galactomyces)", "Glycolic & Lactic Acid 5%"],
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
    id: "hydra-botanical-moisture-mask",
    name: "HYDRA BOTANICAL Intense Moisture Mask",
    tagline: "Deep-sea mineral replenishment & plumping veil",
    category: "Masks",
    price: 48,
    originalPrice: 58,
    image: "/cosmetic2.avif",
    gallery: ["/cosmetic2.avif", "/cream_on_hand.png"],
    description: "Infused with wild green tea botanical extracts and deep-sea Okinawa mineral water for lasting 72-hour moisture plumping.",
    benefits: ["72-hour deep moisture", "Soothes redness", "Bouncy skin texture"],
    ingredients: ["Okinawa Deep Sea Water", "Uji Matcha Extract", "Plant Squalane"],
    howToUse: "Smooth a generous layer for 15-20 minutes.",
    size: "80g / 2.8 oz",
    skinType: "Dry, Dehydrated, Sensitive",
    rating: 4.8,
    reviewCount: 94,
    stock: 35,
    isFeatured: true,
    isBestSeller: true,
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "zen-clarity-tea-tree-cleanser",
    name: "ZEN CLARITY Rice & Matcha Cleanser",
    tagline: "Micro-foaming botanical cleanser with ceremonial green tea",
    category: "Cleansers",
    price: 38,
    originalPrice: 45,
    image: "/cosmetic3.avif",
    gallery: ["/cosmetic3.avif"],
    description: "Enriched with fermented rice water and stone-ground ceremonial matcha to gently dissolve makeup and environmental micro-pollutants.",
    benefits: ["Sulfate-free micro foam", "Preserves natural acid mantle", "Deep pore clarification"],
    ingredients: ["Fermented Rice Water", "Ceremonial Uji Matcha", "Centella Asiatica"],
    howToUse: "Massage 1 pump onto damp skin and rinse.",
    size: "150ml / 5.1 fl oz",
    skinType: "All Skin Types, Sensitive",
    rating: 4.9,
    reviewCount: 112,
    stock: 28,
    isFeatured: true,
    isBestSeller: true,
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "bloom-radiance-eye-renewal-cream",
    name: "BLOOM RADIANCE Eye Renewal Cream",
    tagline: "Yoshino cherry blossom peptide awakening elixir",
    category: "Eye Care",
    price: 52,
    originalPrice: 64,
    image: "/cosmetic4.avif",
    gallery: ["/cosmetic4.avif"],
    description: "Infused with Yoshino cherry blossom polyphenols and firming bio-peptides that brighten dark circles and firm delicate under-eye contours.",
    benefits: ["Brightens dark circles", "De-puffs under eyes", "Smoothes fine lines"],
    ingredients: ["Yoshino Cherry Blossom", "Copper Tripeptide-1", "Hyaluronic Acid"],
    howToUse: "Gently tap a rice-grain amount around orbit of eye.",
    size: "20ml / 0.7 fl oz",
    skinType: "All Skin Types",
    rating: 4.8,
    reviewCount: 76,
    stock: 22,
    isFeatured: false,
    isBestSeller: true,
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "velvet-barrier-nourishing-cream",
    name: "VELVET BARRIER Squalane Moisture Cream",
    tagline: "Hokkaido plant squalane & bio-ceramide lipid matrix",
    category: "Creams & Balms",
    price: 62,
    originalPrice: 75,
    image: "/cream_swatch.png",
    gallery: ["/cream_swatch.png"],
    description: "A rich yet weightless whipped cream formulated with pure olive squalane and 5 skin-identical ceramides to lock in deep hydration.",
    benefits: ["Reinforces skin moisture barrier", "Silky velvet finish", "Non-greasy nourishment"],
    ingredients: ["Pure Plant Squalane", "5 Bio-Identical Ceramides", "Reishi Mushroom"],
    howToUse: "Warm between fingers and press onto face and neck.",
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
    name: "NIHON KIREI Japanese Master Ritual Box",
    tagline: "The complete 5-step porcelain glass skin transformation ceremony",
    category: "Ritual Sets",
    price: 168,
    originalPrice: 210,
    image: "/cosmetic_product_bg.png",
    gallery: ["/cosmetic_product_bg.png"],
    description: "The crown jewel of Japanese botanical rituals. Includes our bestselling cleanser, glow serum, moisture veil mask, eye renewal, and velvet barrier cream in an artisanal paulownia gift box.",
    benefits: ["Complete 5-step ritual", "Saves $48 compared to individual items", "Artisanal paulownia box included"],
    ingredients: ["Kyoto Camellia", "Okinawa Marine Minerals", "Fermented Rice", "Uji Matcha"],
    howToUse: "Follow the 5-step morning and evening ritual guide.",
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

export default function TransformationSection({
  products: propProducts,
}: TransformationSectionProps) {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [spotlightIndex, setSpotlightIndex] = useState<number>(0);
  const [addedId, setAddedId] = useState<string | null>(null);

  // Active items from props or fallback
  const items = useMemo(() => {
    if (propProducts && propProducts.length > 0) {
      return propProducts;
    }
    return FALLBACK_PRODUCTS;
  }, [propProducts]);

  // Categories list
  const categories = useMemo(() => {
    const list = ["All", "Bestsellers", "Serums", "Masks", "Cleansers", "Eye Care"];
    return list;
  }, []);

  // Filtered items based on category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return items;
    if (selectedCategory === "Bestsellers") return items.filter((p) => p.isBestSeller);
    return items.filter(
      (p) => p.category.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  }, [items, selectedCategory]);

  // Make sure spotlightIndex stays valid
  const safeSpotlightIndex = spotlightIndex % Math.max(1, filteredProducts.length);
  const spotlightProduct = filteredProducts[safeSpotlightIndex] || items[0] || FALLBACK_PRODUCTS[0];

  // Secondary items (the rest of the filtered list)
  const secondaryProducts = useMemo(() => {
    if (filteredProducts.length <= 1) {
      return items.filter((p) => p.id !== spotlightProduct?.id).slice(0, 2);
    }
    const result: Product[] = [];
    for (let i = 1; i <= 2; i++) {
      const idx = (safeSpotlightIndex + i) % filteredProducts.length;
      result.push(filteredProducts[idx]);
    }
    return result;
  }, [filteredProducts, safeSpotlightIndex, spotlightProduct?.id, items]);

  const handlePrev = () => {
    setSpotlightIndex((prev) =>
      prev === 0 ? Math.max(0, filteredProducts.length - 1) : prev - 1
    );
  };

  const handleNext = () => {
    setSpotlightIndex((prev) => (prev + 1) % Math.max(1, filteredProducts.length));
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <section className="bg-white w-full py-20 px-6 sm:px-12 md:px-16 border-t border-[#e8d9c0]/30 relative">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Header line */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 pb-4 border-b border-[#e8d9c0]/30">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#b8935a]" />
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#b8935a]">
                ✦ 匠の技 (TAKUMI CRAFT) · SIGNATURE FORMULATIONS ✦
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1a1208] lobster-two-bold">
              Transformative Japanese Cosmetics
            </h2>
            <p className="text-xs text-[#6b5c44] tracking-wider mt-1.5 max-w-xl">
              Clinically formulated botanicals, fermented camellia essences, and time-honored artisanal elixirs that renew skin texture and impart a luminous glass glow.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 bg-[#faf6ef] p-1.5 rounded-full border border-[#e8d9c0]/60">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSpotlightIndex(0);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#1a1208] text-white shadow-xs"
                      : "text-[#6b5c44] hover:text-[#1a1208] hover:bg-white/60"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <Link 
              href="/shop" 
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1a1208] hover:text-[#b8935a] transition whitespace-nowrap pl-2"
            >
              All Formulations <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 3-Column Luxury Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Card 1: HERO SPOTLIGHT PRODUCT (Spans 6 columns) */}
          {spotlightProduct && (
            <div className="md:col-span-6 bg-gradient-to-br from-[#1a1208] via-[#241a12] to-[#1a1208] text-[#faf6ef] p-8 sm:p-10 rounded-[2.5rem] flex flex-col justify-between min-h-[460px] shadow-xl relative group overflow-hidden border border-[#b8935a]/30">
              {/* Subtle radial glow orb */}
              <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#b8935a]/15 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#b8935a]/10 blur-3xl pointer-events-none" />

              {/* Top row: Badges and Wishlist */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#b8935a]/25 border border-[#b8935a]/40 text-[#f5ebd9] text-[10px] tracking-widest uppercase font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#b8935a]" />
                    Featured Spotlight
                  </span>
                  {spotlightProduct.isBestSeller && (
                    <span className="px-2.5 py-1 rounded-full bg-white/10 text-white text-[10px] tracking-wider uppercase font-semibold">
                      ★ #1 Bestseller
                    </span>
                  )}
                </div>

                <button
                  onClick={() => toggleWishlist(spotlightProduct.id)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition cursor-pointer"
                  aria-label="Wishlist"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      wishlist.includes(spotlightProduct.id)
                        ? "fill-[#e11d48] text-[#e11d48]"
                        : "text-white"
                    }`}
                  />
                </button>
              </div>

              {/* Center showcase: Product Image & Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center my-6 z-10">
                {/* Product Image Frame */}
                <Link
                  href={`/shop/${spotlightProduct.id}`}
                  className="relative aspect-square w-full max-w-[220px] mx-auto rounded-3xl bg-white/5 border border-white/10 p-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-radial from-white/10 via-transparent to-transparent opacity-60" />
                  <Image
                    src={spotlightProduct.image}
                    alt={spotlightProduct.name}
                    fill
                    className="object-contain p-3 drop-shadow-2xl"
                    priority
                  />
                </Link>

                {/* Info */}
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-1 text-[#b8935a] text-xs">
                    <Star className="w-3.5 h-3.5 fill-[#b8935a]" />
                    <span className="font-bold">{spotlightProduct.rating?.toFixed(1) || "4.9"}</span>
                    <span className="text-white/60 text-[11px]">
                      ({spotlightProduct.reviewCount || 120} reviews)
                    </span>
                  </div>

                  <span className="text-[11px] uppercase tracking-widest text-[#b8935a] font-semibold">
                    {spotlightProduct.category} • {spotlightProduct.size || "50ml"}
                  </span>

                  <Link href={`/shop/${spotlightProduct.id}`}>
                    <h3 className="text-2xl sm:text-3xl font-serif lobster-two-bold leading-tight hover:text-[#b8935a] transition">
                      {spotlightProduct.name}
                    </h3>
                  </Link>

                  <p className="text-xs text-white/75 line-clamp-2 leading-relaxed">
                    {spotlightProduct.tagline || spotlightProduct.description}
                  </p>

                  {/* Botanical Ingredient Callout */}
                  {spotlightProduct.ingredients && spotlightProduct.ingredients.length > 0 && (
                    <div className="text-[10px] text-white/60 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10 w-fit">
                      <span className="text-[#b8935a] font-semibold">Key Actives: </span>
                      {spotlightProduct.ingredients.slice(0, 2).join(", ")}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Row: Price & Actions */}
              <div className="pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 z-10">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-bold font-serif text-white">
                    ${spotlightProduct.price.toFixed(2)}
                  </span>
                  {spotlightProduct.originalPrice && (
                    <span className="text-sm line-through text-white/50">
                      ${spotlightProduct.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {spotlightProduct.originalPrice && (
                    <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      Save ${(spotlightProduct.originalPrice - spotlightProduct.price).toFixed(0)}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2.5">
                  <Link
                    href={`/shop/${spotlightProduct.id}`}
                    className="px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-white hover:bg-white/10 transition border border-white/20"
                  >
                    Details
                  </Link>
                  <button
                    onClick={(e) => handleAddToCart(e, spotlightProduct)}
                    className="px-5 py-2.5 rounded-full bg-[#b8935a] hover:bg-[#a6824a] text-[#1a1208] text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl cursor-pointer"
                  >
                    {addedId === spotlightProduct.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#1a1208]" />
                        <span>Added to Bag</span>
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
          )}

          {/* Cards 2 & 3: SECONDARY FEATURED PRODUCTS (Span 3 columns each) */}
          {secondaryProducts.map((product) => {
            const isWish = wishlist.includes(product.id);
            const isJustAdded = addedId === product.id;

            return (
              <div
                key={product.id}
                className="md:col-span-3 bg-[#faf6ef]/70 hover:bg-[#faf6ef] border border-[#e8d9c0]/80 rounded-[2.5rem] p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all duration-300 relative group"
              >
                {/* Top: Category Tag and Wishlist */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#b8935a] bg-white px-2.5 py-1 rounded-full border border-[#e8d9c0]/60">
                    {product.category}
                  </span>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="w-8 h-8 rounded-full bg-white hover:bg-stone-50 border border-[#e8d9c0]/80 flex items-center justify-center text-[#6b5c44] hover:text-[#e11d48] transition cursor-pointer shadow-xs"
                    aria-label="Wishlist"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        isWish ? "fill-[#e11d48] text-[#e11d48]" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Product Image */}
                <Link
                  href={`/shop/${product.id}`}
                  className="relative w-full aspect-square rounded-2xl bg-white p-4 my-3 flex items-center justify-center overflow-hidden border border-[#e8d9c0]/40 group-hover:border-[#b8935a]/50 transition duration-300"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.originalPrice && (
                    <span className="absolute top-2.5 left-2.5 text-[9px] font-bold uppercase tracking-wider bg-[#1a1208] text-white px-2 py-0.5 rounded-full">
                      Sale
                    </span>
                  )}
                </Link>

                {/* Product Details */}
                <div className="space-y-1.5 my-2">
                  {/* Rating */}
                  <div className="flex items-center gap-1 text-[#b8935a] text-[11px]">
                    <Star className="w-3 h-3 fill-[#b8935a]" />
                    <span className="font-bold">{product.rating?.toFixed(1) || "4.8"}</span>
                    <span className="text-[#6b5c44]/60 text-[10px]">
                      ({product.reviewCount || 85})
                    </span>
                  </div>

                  <Link href={`/shop/${product.id}`}>
                    <h4 className="text-base font-serif lobster-two-bold text-[#1a1208] group-hover:text-[#b8935a] transition line-clamp-1">
                      {product.name}
                    </h4>
                  </Link>

                  <p className="text-[11px] text-[#6b5c44] line-clamp-2 leading-relaxed">
                    {product.tagline || product.description}
                  </p>

                  <div className="text-[10px] text-[#8a7b68] font-mono">
                    {product.size || "Standard Size"}
                  </div>
                </div>

                {/* Bottom: Price & Add to Cart */}
                <div className="pt-3 border-t border-[#e8d9c0]/60 flex items-center justify-between gap-2 mt-auto">
                  <div>
                    <span className="text-base font-bold text-[#1a1208]">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs line-through text-[#6b5c44]/60 block -mt-1">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="px-3.5 py-2 rounded-full bg-[#1a1208] hover:bg-[#b8935a] text-white text-xs font-semibold transition-colors duration-200 flex items-center gap-1.5 cursor-pointer shadow-xs"
                    aria-label="Add to bag"
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-[11px]">Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3 h-3" />
                        <span className="text-[11px]">Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}

        </div>

        {/* Bottom row: Counter and Nav Arrows */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-[#e8d9c0]/30 text-xs text-[#6b5c44]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#1a1208]">
              Formulation {safeSpotlightIndex + 1} of {filteredProducts.length}
            </span>
            <span>•</span>
            <span className="text-[11px]">
              Showing authentic Japanese formulations from store database
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-[#8a7b68]">Cycle Formulations:</span>
            <button 
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-[#1a1208]/20 flex items-center justify-center hover:bg-[#1a1208] hover:text-white hover:border-[#1a1208] transition cursor-pointer"
              aria-label="Previous formulation"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-[#1a1208]/20 flex items-center justify-center hover:bg-[#1a1208] hover:text-white hover:border-[#1a1208] transition cursor-pointer"
              aria-label="Next formulation"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
