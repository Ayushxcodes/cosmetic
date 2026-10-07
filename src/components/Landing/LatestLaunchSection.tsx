"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShoppingBag, Star, Heart, Check, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/ecommerce";

interface LatestLaunchSectionProps {
  products?: Product[];
  loading?: boolean;
}

const FALLBACK_LAUNCH_PRODUCTS: Product[] = [
  {
    id: "prism-aha-bha-glow-serum",
    name: "ROLAND Medicated Hakka Pure Skin Water",
    tagline: "Pure Japanese Peppermint soothing barrier mist & pore water",
    category: "Serums",
    price: 56,
    originalPrice: 68,
    image: "/JUNSUHADA/JUNSUHADA/9076.jpg",
    gallery: ["/JUNSUHADA/JUNSUHADA/9076.jpg", "/JUNSUHADA/JUNSUHADA/DSC_0103.jpg"],
    description: "An authentic Japanese medicated skin water infused with natural Hokkaido Hakka (peppermint) oil, dipotassium glycyrrhizate, and calming botanicals.",
    benefits: ["Soothes acne and cools skin", "Pore tightening & sebum balance", "Glass skin clarity"],
    ingredients: ["Natural Hokkaido Hakka Oil", "Dipotassium Glycyrrhizate", "Centella Asiatica"],
    howToUse: "Apply 3-4 drops or mist after cleansing.",
    size: "150ml / 5.1 fl oz",
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
    name: "DOTBYE Keana Sauna Warming Pore Scrub Mask",
    tagline: "Thermal warming enzyme peel & blackhead dissolving scrub",
    category: "Masks",
    price: 48,
    originalPrice: 58,
    image: "/JUNSUHADA/dotbye/Dotbye.jpg",
    gallery: ["/JUNSUHADA/dotbye/Dotbye.jpg", "/JUNSUHADA/dotbye/15076.webp"],
    description: "Recreates a Japanese sauna experience. Gently heats upon skin contact to melt stubborn sebum plugs and impurities with natural papain enzymes.",
    benefits: ["Self-warming thermal activation", "Dissolves hardened blackheads", "Baby-soft smooth skin"],
    ingredients: ["Thermal Warming Complex", "Papain Fruit Enzyme", "Moroccan Clay & Japanese Sea Mud"],
    howToUse: "Smooth over skin, gently massage for 1 min, leave for 5 mins, and rinse.",
    size: "100g / 3.5 oz",
    skinType: "Dry, Dehydrated, Normal, Sensitive, Pore-prone",
    rating: 4.8,
    reviewCount: 94,
    stock: 35,
    isFeatured: true,
    isBestSeller: true,
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "pure-zen-balancing-cleanser",
    name: "LATTE BOTANICAL Plant Cleanse Trio",
    tagline: "Botanical milk, gel & deep cleansing oil trio with herbal extracts",
    category: "Cleansers",
    price: 38,
    originalPrice: 45,
    image: "/JUNSUHADA/Latte Botanical/latte_3sku.jpg",
    gallery: ["/JUNSUHADA/Latte Botanical/latte_3sku.jpg", "/JUNSUHADA/Latte Botanical/latte_4sku.jpg"],
    description: "Indulge in a luxurious botanical milk wash crafted with cold-pressed plant milks, sweet almond oil, and soothing herbal essences.",
    benefits: ["Silken milky texture rinses clean", "Protects delicate acid mantle", "Melts waterproof cosmetics"],
    ingredients: ["Botanical Herbal Milk Complex", "Sweet Almond Oil", "Rice Germ Oil"],
    howToUse: "Massage 2-3 pumps onto dry or damp skin, emulsify with warm water and rinse.",
    size: "180ml / 6.1 fl oz",
    skinType: "All Skin Types, Reactive & Sensitive",
    rating: 4.9,
    reviewCount: 112,
    stock: 28,
    isFeatured: true,
    isBestSeller: true,
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "bright-bloom-caffeine-eye-repair",
    name: "DOTBYE Keana Ichigo Strawberry Pore Cleansing Oil",
    tagline: "Japanese blackhead & sebum melting botanical oil with strawberry AHA",
    category: "Eye Care",
    price: 64,
    originalPrice: 75,
    image: "/JUNSUHADA/dotbye/1.png",
    gallery: ["/JUNSUHADA/dotbye/1.png", "/JUNSUHADA/dotbye/2.png"],
    description: "Targeted Japanese refining oil formulated with natural strawberry fruit seed polyphenols, AHA fruit acids, and nourishing botanical lipids.",
    benefits: ["Melts stubborn blackheads and sebum plugs", "Gentle enough for delicate orbital eye zone", "Illuminates dull skin tone"],
    ingredients: ["Japanese Strawberry Seed Oil", "Jojoba Seed Oil", "Camellia Japonica Seed Oil"],
    howToUse: "Dispense 2 pumps, gently massage over face and orbital contours, emulsify and rinse.",
    size: "150ml / 5.1 fl oz",
    skinType: "All Skin Types",
    rating: 4.8,
    reviewCount: 76,
    stock: 22,
    isFeatured: false,
    isBestSeller: true,
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "sakura-velvet-day-cream",
    name: "SAVON DORON Daily Esthe Clay Face Wash Trio",
    tagline: "Mineral volcanic clay, vita-vitamin C & bamboo charcoal micro-foam",
    category: "Creams & Balms",
    price: 62,
    originalPrice: 72,
    image: "/JUNSUHADA/Savon Doron/DSC08403.jpg",
    gallery: ["/JUNSUHADA/Savon Doron/DSC08403.jpg", "/JUNSUHADA/Savon Doron/41278.jpg"],
    description: "Daily aesthetic clay therapy straight from Japan. Three specialized formulations: Pure White Clay, Vita Vitamin Clay, and Charcoal Mud.",
    benefits: ["Dense marshmallow micro-foam", "Seven natural clays from France, Okinawa, and Morocco", "Esthetician spa-grade softness"],
    ingredients: ["Natural White Kaolin Clay", "Vita Vitamin C Derivatives", "Bamboo Charcoal Micro-particles"],
    howToUse: "Work a 2cm pearl into dense cushion foam with water, gently massage across face, then rinse.",
    size: "120g x 3 Tubes",
    skinType: "Normal, Dry, Sensitive, Combination",
    rating: 5.0,
    reviewCount: 88,
    stock: 19,
    isFeatured: true,
    isBestSeller: true,
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "imperial-golden-ritual-set",
    name: "JUNSUHADA x NIIMI Grand Master Ritual Set",
    tagline: "Complete Japanese botanical spa ritual: Hakka Water, Clay Wash, Cleansing Oil & Mask",
    category: "Ritual Sets",
    price: 178,
    originalPrice: 206,
    image: "/JUNSUHADA/Latte Botanical/latte_4sku.jpg",
    gallery: ["/JUNSUHADA/Latte Botanical/latte_4sku.jpg", "/JUNSUHADA/Savon Doron/41278.jpg", "/JUNSUHADA/JUNSUHADA/9076.jpg"],
    description: "The crown jewel Japanese beauty curation. Includes full-size Roland Medicated Hakka Skin Water, Latte Botanical Cleansing lineup with spa brush, Savon Doron Daily Clay Wash trio with spa headband, and Dotbye Strawberry Cleansing Oil.",
    benefits: ["Comprehensive Japanese botanical AM/PM regimen", "Includes exclusive spa headband & facial brush", "Saves $28 compared to individual items"],
    ingredients: ["Roland Hakka Water", "Latte Botanical", "Savon Doron Clay", "Dotbye Keana"],
    howToUse: "Follow the master multi-brand ritual guide.",
    size: "Complete 4-Brand Luxury Set",
    skinType: "All Skin Types",
    rating: 5.0,
    reviewCount: 142,
    stock: 14,
    isFeatured: true,
    isBestSeller: true,
    createdAt: "2026-01-01T00:00:00.000Z",
  },
];

export default function LatestLaunchSection({
  products: propProducts,
  loading: propLoading,
}: LatestLaunchSectionProps) {
  const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);
  const [fetching, setFetching] = useState<boolean>(!propProducts || propProducts.length === 0);
  const [rotate, setRotate] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeProductId, setActiveProductId] = useState<string>("");
  const [addedId, setAddedId] = useState<string | null>(null);

  const { addToCart, wishlist, toggleWishlist } = useCart();

  // Load products if not supplied by props
  useEffect(() => {
    if (propProducts && propProducts.length > 0) return;

    let isMounted = true;
    async function loadLatestProducts() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data: Product[] = await res.json();
          if (isMounted) setFetchedProducts(data);
        }
      } catch (e) {
        console.error("Failed to load products for LatestLaunchSection:", e);
      } finally {
        if (isMounted) setFetching(false);
      }
    }

    loadLatestProducts();
    return () => {
      isMounted = false;
    };
  }, [propProducts]);

  const allProducts = useMemo(() => {
    if (propProducts && propProducts.length > 0) return propProducts;
    if (fetchedProducts.length > 0) return fetchedProducts;
    return FALLBACK_LAUNCH_PRODUCTS;
  }, [propProducts, fetchedProducts]);

  const loading = propLoading ?? (propProducts && propProducts.length > 0 ? false : fetching);

  // Categories list
  const categories = useMemo(() => {
    const list = Array.from(new Set(allProducts.map((p) => p.category))).filter(Boolean);
    return ["All", ...list];
  }, [allProducts]);

  // Filtered by selected category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return allProducts;
    return allProducts.filter(
      (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [allProducts, selectedCategory]);

  // Active product determination
  const activeProduct = useMemo(() => {
    if (filteredProducts.length === 0) return allProducts[0] || FALLBACK_LAUNCH_PRODUCTS[0];
    const found = filteredProducts.find((p) => p.id === activeProductId);
    return found || filteredProducts[0];
  }, [filteredProducts, activeProductId, allProducts]);

  // Lineup of other products for the left-side thumbnail selector
  const productLineup = useMemo(() => {
    // Return all filtered products or fallback items (up to 4 items)
    return filteredProducts.slice(0, 4);
  }, [filteredProducts]);

  const handleNextProduct = () => {
    if (filteredProducts.length === 0) return;
    const currentIdx = filteredProducts.findIndex((p) => p.id === activeProduct.id);
    const nextIdx = (currentIdx + 1) % filteredProducts.length;
    setActiveProductId(filteredProducts[nextIdx].id);
    setRotate((r) => r + 60);
  };

  const handlePrevProduct = () => {
    if (filteredProducts.length === 0) return;
    const currentIdx = filteredProducts.findIndex((p) => p.id === activeProduct.id);
    const prevIdx = (currentIdx - 1 + filteredProducts.length) % filteredProducts.length;
    setActiveProductId(filteredProducts[prevIdx].id);
    setRotate((r) => r - 60);
  };

  const handleSelectProduct = (product: Product) => {
    setActiveProductId(product.id);
    setRotate((r) => r + 45);
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  if (loading && allProducts.length === 0) {
    return (
      <section className="bg-[#faf6ef]/30 w-full py-20 px-6 sm:px-12 md:px-16 border-t border-[#e8d9c0]/30">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center py-20 text-[#6b5c44]">
          <div className="w-8 h-8 border-2 border-[#b8935a] border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-xs uppercase tracking-widest font-semibold text-[#8a7b68]">
            Loading latest launches from database...
          </p>
        </div>
      </section>
    );
  }

  if (!activeProduct) return null;

  return (
    <section className="bg-[#faf6ef]/40 w-full py-20 px-6 sm:px-12 md:px-16 border-t border-[#e8d9c0]/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Top bar with heading and categories */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-4 border-b border-[#e8d9c0]/30">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#b8935a]" />
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#b8935a]">
                ✦ 匠 (TAKUMI) · STOREFRONT RECENT LAUNCHES ✦
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1a1208] lobster-two-bold">
              Latest Product Launch <br className="hidden sm:inline" /> Available Now!
            </h2>
            <p className="text-xs text-[#6b5c44] tracking-widest uppercase mt-2 font-semibold">
              Authentic Japanese Formulations Direct from Our Master Kyoto Ateliers
            </p>
          </div>

          {/* Interactive category buttons */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setRotate((r) => r + 45);
                }}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#1a1208] text-white border border-[#1a1208] shadow-xs"
                    : "bg-white/90 text-[#6b5c44] border border-[#e8d9c0] hover:bg-white hover:text-[#1a1208]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Layout: Product Selectors, Rotating Bottle Dial, and Detailed Product Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-center mt-4">
          
          {/* 1. Left Column: Product Selector Thumbnails & Carousel Arrows */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start justify-between gap-6">
            <div className="flex items-center justify-between w-full">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#8a7b68]">
                Select Formulation
              </span>
              {/* Nav arrows */}
              <div className="flex gap-2">
                <button
                  onClick={handlePrevProduct}
                  className="w-9 h-9 rounded-full border border-[#1a1208]/20 flex items-center justify-center hover:bg-[#1a1208] hover:text-white hover:border-[#1a1208] transition cursor-pointer"
                  aria-label="Previous product"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleNextProduct}
                  className="w-9 h-9 rounded-full border border-[#1a1208]/20 flex items-center justify-center hover:bg-[#1a1208] hover:text-white hover:border-[#1a1208] transition cursor-pointer"
                  aria-label="Next product"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Product Miniature Lineup: Real products shown here! */}
            <div className="grid grid-cols-3 md:grid-cols-1 gap-3 w-full">
              {productLineup.map((p) => {
                const isSelected = p.id === activeProduct.id;

                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelectProduct(p)}
                    className={`p-2.5 rounded-2xl border text-left transition-all duration-300 flex items-center gap-3 cursor-pointer group w-full ${
                      isSelected
                        ? "bg-white border-[#b8935a] shadow-md ring-2 ring-[#b8935a]/30"
                        : "bg-white/70 hover:bg-white border-[#e8d9c0]/80 hover:border-[#b8935a]/50"
                    }`}
                  >
                    {/* Bottle thumbnail */}
                    <div className="relative w-16 h-20 sm:w-20 sm:h-24 rounded-2xl bg-[#faf6ef] shrink-0 overflow-hidden p-1 border border-[#e8d9c0]/60 shadow-xs">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-contain p-1 group-hover:scale-108 transition-transform duration-300"
                      />
                    </div>

                    <div className="min-w-0 flex-1 hidden sm:block md:block">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#b8935a] block truncate">
                        {p.category}
                      </span>
                      <h4 className="text-sm font-serif font-bold text-[#1a1208] truncate group-hover:text-[#b8935a] transition">
                        {p.name}
                      </h4>
                      <span className="text-xs font-bold text-[#1a1208] block mt-1">
                        ${p.price.toFixed(2)}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="text-[11px] text-[#8a7b68] hidden md:block">
              ✦ Click any formulation to inspect in the sunburst dial
            </div>
          </div>

          {/* 2. Center Column: Large rotating Dial spinner with REAL PRODUCT BOTTLE */}
          <div className="md:col-span-5 flex justify-center items-center relative py-6">
            <div className="relative w-80 h-80 sm:w-[420px] sm:h-[420px] flex items-center justify-center">
              
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
                  <text className="text-[9.5px] uppercase font-bold tracking-[0.24em] fill-[#6b5c44]">
                    <textPath href="#textPath" startOffset="0%">
                      • NIHON KIREI JAPANESE BOTANICAL CRAFT • ARTISANAL ATELIER COSMETICS •
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Central REAL PRODUCT BOTTLE Circle Display */}
              <Link
                href={`/shop/${activeProduct.id}`}
                className="relative w-64 h-64 sm:w-[320px] sm:h-[320px] rounded-full overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-b from-[#faf6ef] via-[#fffbf5] to-[#f2e7d5] flex items-center justify-center group cursor-pointer transition-transform duration-500 hover:scale-[1.02]"
              >
                {/* Subtle radiant glow inside dial */}
                <div className="absolute inset-0 bg-radial from-[#b8935a]/20 via-transparent to-transparent opacity-80" />

                {/* Real Product Bottle Image */}
                <div className="relative w-56 h-60 sm:w-68 sm:h-76">
                  <Image
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    fill
                    className="object-contain p-2 drop-shadow-2xl group-hover:scale-108 transition-transform duration-500"
                    priority
                  />
                </div>

                {/* Floating pill badge on bottom of dial */}
                <div className="absolute bottom-4 bg-[#1a1208]/90 backdrop-blur-xs text-[#faf6ef] px-4 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest border border-[#b8935a]/50 flex items-center gap-1.5 shadow-lg">
                  <Sparkles className="w-3 h-3 text-[#b8935a]" />
                  <span>Kyoto Master Formulation</span>
                </div>
              </Link>
            </div>
          </div>

          {/* 3. Right Column: Detailed Product Card */}
          <div className="md:col-span-4 flex flex-col gap-4 bg-white p-6 sm:p-8 rounded-[2.5rem] border border-[#e8d9c0]/80 shadow-md relative">
            
            {/* Top row with category and wishlist */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#b8935a] bg-[#faf6ef] px-3 py-1 rounded-full border border-[#e8d9c0]">
                {activeProduct.category}
              </span>

              <div className="flex items-center gap-2">
                {activeProduct.isBestSeller && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[9px] uppercase font-bold text-emerald-800">
                    Bestseller
                  </span>
                )}
                <button
                  onClick={() => toggleWishlist(activeProduct.id)}
                  className="w-8 h-8 rounded-full bg-[#faf6ef] hover:bg-[#f0e6d6] border border-[#e8d9c0] flex items-center justify-center text-[#6b5c44] hover:text-[#e11d48] transition cursor-pointer"
                  aria-label="Wishlist"
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      wishlist.includes(activeProduct.id)
                        ? "fill-[#e11d48] text-[#e11d48]"
                        : ""
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Title & Star Rating */}
            <div>
              <div className="flex items-center gap-1.5 text-[#b8935a] text-xs mb-1">
                <Star className="w-3.5 h-3.5 fill-[#b8935a]" />
                <span className="font-bold">{activeProduct.rating?.toFixed(1) || "4.9"}</span>
                <span className="text-[#8a7b68] text-[11px]">
                  ({activeProduct.reviewCount || 120} reviews)
                </span>
              </div>

              <Link href={`/shop/${activeProduct.id}`}>
                <h3 className="text-xl sm:text-2xl font-serif text-[#1a1208] lobster-two-bold leading-tight hover:text-[#b8935a] transition">
                  {activeProduct.name}
                </h3>
              </Link>
            </div>

            <p className="text-xs text-[#8a7b68] italic font-serif">
              {activeProduct.tagline}
            </p>

            <p className="text-xs text-[#6b5c44] leading-relaxed line-clamp-3">
              {activeProduct.description}
            </p>

            {/* Botanical Ingredients Tag */}
            {activeProduct.ingredients && activeProduct.ingredients.length > 0 && (
              <div className="text-[10px] text-[#6b5c44] bg-[#faf6ef] p-2.5 rounded-xl border border-[#e8d9c0]/60">
                <span className="font-bold text-[#1a1208]">Key Botanical Actives: </span>
                {activeProduct.ingredients.slice(0, 3).join(" • ")}
              </div>
            )}

            {/* Pricing Row */}
            <div className="flex items-baseline gap-2 pt-1 border-t border-[#e8d9c0]/50">
              <span className="text-2xl font-serif font-bold text-[#1a1208]">
                ${activeProduct.price.toFixed(2)}
              </span>
              {activeProduct.originalPrice && (
                <span className="text-xs text-[#8a7b68] line-through">
                  ${activeProduct.originalPrice.toFixed(2)}
                </span>
              )}
              {activeProduct.originalPrice && (
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Save ${(activeProduct.originalPrice - activeProduct.price).toFixed(0)}
                </span>
              )}
              <span className="ml-auto text-[10px] text-[#8a7b68] font-mono">
                {activeProduct.size}
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-2.5 mt-1">
              <button
                onClick={(e) => handleAddToCart(e, activeProduct)}
                className="w-full bg-[#1a1208] hover:bg-[#b8935a] text-white py-3.5 rounded-full font-bold uppercase tracking-wider text-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg"
              >
                {addedId === activeProduct.id ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart (${activeProduct.price.toFixed(2)})</span>
                  </>
                )}
              </button>

              <Link
                href={`/shop/${activeProduct.id}`}
                className="w-full text-center py-1.5 text-xs font-semibold text-[#6b5c44] hover:text-[#1a1208] transition"
              >
                View Full Formulation Details →
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Strip: Additional New Launches Showcase */}
        <div className="pt-8 border-t border-[#e8d9c0]/40">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1a1208] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#b8935a]" />
              Explore More Atelier Launches
            </span>
            <Link
              href="/shop"
              className="text-xs font-bold text-[#1a1208] hover:text-[#b8935a] transition"
            >
              View Full Shop Collection →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {allProducts.slice(0, 4).map((p) => (
              <div
                key={p.id}
                onClick={() => handleSelectProduct(p)}
                className={`bg-white p-3.5 rounded-2xl border transition-all duration-300 flex items-center gap-3 cursor-pointer group ${
                  p.id === activeProduct.id
                    ? "border-[#b8935a] shadow-md ring-1 ring-[#b8935a]"
                    : "border-[#e8d9c0]/60 hover:border-[#1a1208] hover:shadow-xs"
                }`}
              >
                <div className="relative w-12 h-12 rounded-xl bg-[#faf6ef] shrink-0 overflow-hidden p-1">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-contain p-1 group-hover:scale-110 transition-transform"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h5 className="text-xs font-serif font-bold text-[#1a1208] truncate group-hover:text-[#b8935a] transition">
                    {p.name}
                  </h5>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-[11px] font-bold text-[#1a1208]">
                      ${p.price.toFixed(2)}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-[#8a7b68]">
                      {p.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
