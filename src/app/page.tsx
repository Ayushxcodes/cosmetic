"use client";

import React, { useState, useEffect } from "react";
import HeroSection from "@/components/Landing/HeroSection";
import IntroSection from "@/components/Landing/IntroSection";
import ServicesSection from "@/components/Landing/ServicesSection";
import LatestLaunchSection from "@/components/Landing/LatestLaunchSection";
import TransformationSection from "@/components/Landing/TransformationSection";
import CatalogueSection from "@/components/Landing/CatalogueSection";
import ReviewsSection from "@/components/Landing/ReviewsSection";
import ScrollReveal from "@/components/base/ScrollReveal";
import { Product } from "@/types/ecommerce";

export default function Homepage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHomepageProducts() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.error("Error loading products on homepage:", err);
      } finally {
        setLoading(false);
      }
    }

    loadHomepageProducts();
  }, []);

  return (
    <div className="w-full bg-[#faf6ef] text-[#1a1208] overflow-hidden flex flex-col">
      {/* 1. Hero Section (Animate on load) */}
      <ScrollReveal distance="translate-y-4" duration={800}>
        <HeroSection products={products} loading={loading} />
      </ScrollReveal>

      {/* 2. Intro Section (Database driven products) */}
      <ScrollReveal distance="translate-y-8" duration={1000}>
        <IntroSection products={products} loading={loading} />
      </ScrollReveal>

      {/* 3. Japanese Cosmetics Categories Section (Database driven) */}
      <ScrollReveal distance="translate-y-8" duration={1000}>
        <ServicesSection products={products} loading={loading} />
      </ScrollReveal>

      {/* 4. Latest Product Launch Section (Database driven) */}
      <ScrollReveal distance="translate-y-8" duration={1000}>
        <LatestLaunchSection products={products} loading={loading} />
      </ScrollReveal>

      {/* 5. Transformative Products Section (Database driven) */}
      <ScrollReveal distance="translate-y-8" duration={1000}>
        <TransformationSection products={products} loading={loading} />
      </ScrollReveal>

      {/* 6. Catalogue Section (Database driven) */}
      <ScrollReveal distance="translate-y-8" duration={1000}>
        <CatalogueSection products={products} loading={loading} />
      </ScrollReveal>

      {/* 7. Reviews Section */}
      <ScrollReveal distance="translate-y-8" duration={1000}>
        <ReviewsSection />
      </ScrollReveal>
    </div>
  );
}