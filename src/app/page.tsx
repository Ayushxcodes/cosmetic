"use client";

import React from "react";
import HeroSection from "@/components/Landing/HeroSection";
import IntroSection from "@/components/Landing/IntroSection";
import ServicesSection from "@/components/Landing/ServicesSection";
import LatestLaunchSection from "@/components/Landing/LatestLaunchSection";
import TransformationSection from "@/components/Landing/TransformationSection";
import CatalogueSection from "@/components/Landing/CatalogueSection";
import ReviewsSection from "@/components/Landing/ReviewsSection";
import ScrollReveal from "@/components/base/ScrollReveal";

export default function Homepage() {
  return (
    <div className="w-full bg-[#faf6ef] text-[#1a1208] overflow-hidden flex flex-col">
      {/* 1. Hero Section (Animate on load) */}
      <ScrollReveal distance="translate-y-4" duration={800}>
        <HeroSection />
      </ScrollReveal>

      {/* 2. Intro Section */}
      <ScrollReveal distance="translate-y-8" duration={1000}>
        <IntroSection />
      </ScrollReveal>

      {/* 3. Services Section */}
      <ScrollReveal distance="translate-y-8" duration={1000}>
        <ServicesSection />
      </ScrollReveal>

      {/* 4. Latest Product Launch Section */}
      <ScrollReveal distance="translate-y-8" duration={1000}>
        <LatestLaunchSection />
      </ScrollReveal>

      {/* 5. Transformation Section */}
      <ScrollReveal distance="translate-y-8" duration={1000}>
        <TransformationSection />
      </ScrollReveal>

      {/* 6. Catalogue Section */}
      <ScrollReveal distance="translate-y-8" duration={1000}>
        <CatalogueSection />
      </ScrollReveal>

      {/* 7. Reviews Section */}
      <ScrollReveal distance="translate-y-8" duration={1000}>
        <ReviewsSection />
      </ScrollReveal>
    </div>
  );
}