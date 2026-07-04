"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Heart, 
  Moon, 
  Sun,
  Flame
} from "lucide-react";

interface RitualStep {
  num: string;
  title: string;
  subtitle: string;
  desc: string;
  product: string;
}

interface Ritual {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  duration: string;
  focus: string;
  image: string;
  steps: RitualStep[];
}

export default function RitualsClient() {
  const [activeRitual, setActiveRitual] = useState("morning");

  const rituals: Record<string, Ritual> = {
    morning: {
      id: "morning",
      name: "Morning Glow Ritual",
      tagline: "Unveil skin that radiates health from within",
      description: "Science and ceremony meet in the Niimi Morning Ritual. Four intentional steps designed to energize, hydrate, and shield your skin for the day ahead.",
      icon: <Sun className="w-5 h-5" />,
      duration: "10 mins",
      focus: "Radiance & Protection",
      image: "/facial_treatment.png",
      steps: [
        {
          num: "01",
          title: "Cleanse & Purify",
          subtitle: "Yuzu Foam Cleanser",
          desc: "Begin by washing away overnight oils and impurities without disrupting your skin's delicate pH balance. Massage onto damp skin in gentle circular motions, then rinse with lukewarm water.",
          product: "Yuzu Foam Cleanser"
        },
        {
          num: "02",
          title: "Tone & Prep",
          subtitle: "Sakura Water Essence",
          desc: "Splash 3-4 drops into your palms and pat gently into your face and neck. This nutrient-rich essence prepares your skin, allowing it to absorb subsequent treatments efficiently.",
          product: "Sakura Water Essence"
        },
        {
          num: "03",
          title: "Targeted Treatment",
          subtitle: "Sakura Brightening Serum",
          desc: "Press 2 drops of serum into your skin using warm palms. Focus on areas needing extra radiance. The warmth of your hands activates the botanical enzymes.",
          product: "Sakura Brightening Serum"
        },
        {
          num: "04",
          title: "Nourish & Lock",
          subtitle: "Camellia Moisture Cream",
          desc: "Seal in hydration with a pea-sized amount of moisturiser. Smooth upward and outward to form a weightless protective layer that keeps skin plump all day.",
          product: "Camellia Moisture Cream"
        }
      ]
    },
    evening: {
      id: "evening",
      name: "Evening Restorative Ritual",
      tagline: "Heal, hydrate, and recover under the stars",
      description: "A deeply nourishing ceremony to wash away daily stressors. Nourish your skin barrier while you sleep with rich botanical restoratives and deep hydration.",
      icon: <Moon className="w-5 h-5" />,
      duration: "15 mins",
      focus: "Deep Recovery & Nutrition",
      image: "/cream_on_hand.png",
      steps: [
        {
          num: "01",
          title: "Double Cleanse",
          subtitle: "Rice Bran Cleansing Oil",
          desc: "Start with an oil cleanser to dissolve makeup, sunscreen, and pollution. Follow with a gentle water-based wash to ensure pores are completely clear.",
          product: "Rice Bran Cleansing Oil"
        },
        {
          num: "02",
          title: "Deep Hydration Mist",
          subtitle: "Rosewater & Lotus Toner",
          desc: "Mist generously to drench dry skin. This soothing botanical blend calms redness and provides an instant moisture boost after a long day.",
          product: "Rosewater & Lotus Toner"
        },
        {
          num: "03",
          title: "Cellular Renewal",
          subtitle: "Pearl Eye & Night Repair Elixir",
          desc: "Apply a small amount under eyes and across target facial zones. Rich in antioxidants and peptides, this elixir works overnight to support natural cellular repair.",
          product: "Pearl Eye Repair Elixir"
        },
        {
          num: "04",
          title: "Barrier Lock",
          subtitle: "Camellia Recovery Butter",
          desc: "Apply a slightly thicker layer of rich cream or barrier butter to lock in all moisture. Wake up to plump, deeply hydrated, and restored skin.",
          product: "Camellia Recovery Butter"
        }
      ]
    },
    weekly: {
      id: "weekly",
      name: "Weekly Detox & Purify Ritual",
      tagline: "A meditative weekend reset for skin longevity",
      description: "An intensive botanical treatment to deeply exfoliate, clarify, and soothe. A sensory spa experience in the comfort of your own home.",
      icon: <Flame className="w-5 h-5" />,
      duration: "25 mins",
      focus: "Exfoliation & Detoxification",
      image: "/salon_interior.png",
      steps: [
        {
          num: "01",
          title: "Warm Steam Prep",
          subtitle: "Herbal Steaming Compress",
          desc: "Hold a warm, damp herbal towel over your face for 60 seconds. The gentle heat relaxes facial muscles and softens pores for deeper cleansing.",
          product: "Herbal Compress"
        },
        {
          num: "02",
          title: "Polish & Exfoliate",
          subtitle: "Rice Enzyme Gentle Scrub",
          desc: "Massage a small amount of the gentle scrub in upward circles, focusing on the T-zone. Gently buff away dead skin cells to reveal fresh, smooth skin.",
          product: "Rice Enzyme Gentle Scrub"
        },
        {
          num: "03",
          title: "Clay Mask Detox",
          subtitle: "Volcanic Ash & Tea Tree Mud Mask",
          desc: "Apply an even layer of the detox mask. Let sit for 10-15 minutes as it draws out impurities and refines skin texture. Rinse thoroughly.",
          product: "Tea Tree Mud Mask"
        },
        {
          num: "04",
          title: "Soothe & Calm",
          subtitle: "Centella Asiatica Calming Gel",
          desc: "Finish by pressing a soothing gel or oil into the skin. This immediate nourishment calms raw skin, replenishes nutrients, and minimizes redness.",
          product: "Calming Gel"
        }
      ]
    }
  };

  const current = rituals[activeRitual];

  return (
    <div className="w-full bg-[#faf6ef] text-[#1a1208] font-sans overflow-hidden">
      {/* ── 1. Hero Header (Editorial Style) ── */}
      <section className="relative py-20 md:py-28 px-6 bg-gradient-to-b from-[#faf6ef] to-white border-b border-[#e8d9c0]/30">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <span className="text-xs tracking-[0.3em] text-[#9c7d73] uppercase font-bold block mb-4">
            Niimi Ceremonies
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif lobster-two-bold text-[#1a1208] leading-tight max-w-3xl">
            A <span className="text-[#9c7d73] italic font-normal">Ritual</span> Worth Waking Up For
          </h1>
          <div className="w-20 h-0.5 bg-[#9c7d73]/30 my-6" />
          <p className="text-sm sm:text-base text-[#6b5c44] leading-relaxed max-w-xl">
            We believe skincare should never be an obligation or a burden. It is a moment of pause—a quiet ceremony where ancient East Asian heritage meets modern skincare science.
          </p>
        </div>
      </section>

      {/* ── 2. Rituals Navigator & Details ── */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        
        {/* Selector Tabs */}
        <div className="flex justify-center gap-3 sm:gap-6 mb-16">
          {Object.values(rituals).map((ritual) => (
            <button
              key={ritual.id}
              onClick={() => setActiveTab(ritual.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full border text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                activeRitual === ritual.id
                  ? "bg-[#1a1208] text-white border-[#1a1208] shadow-md"
                  : "bg-white text-[#6b5c44] border-[#e8d9c0]/50 hover:border-[#1a1208] hover:text-[#1a1208]"
              }`}
            >
              {ritual.icon}
              {ritual.name.split(" ")[0]} {/* Gets Morning/Evening/Weekly */}
            </button>
          ))}
        </div>

        {/* Active Ritual Editorial Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image Collage & Meta */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-lg border border-[#e8d9c0]/50 bg-[#faf6ef]">
              <Image
                src={current.image}
                alt={current.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Quick Meta Stats */}
            <div className="grid grid-cols-2 gap-4 bg-white p-5 rounded-3xl border border-[#e8d9c0]/50 shadow-sm">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#9c7d73] mb-1">Duration</span>
                <span className="text-sm font-semibold text-[#1a1208] flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#9c7d73]" />
                  {current.duration}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#9c7d73] mb-1">Focus</span>
                <span className="text-sm font-semibold text-[#1a1208] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#9c7d73]" />
                  {current.focus}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Title + Steps */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#b8935a] block mb-2">
                {current.tagline}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#1a1208] lobster-two-bold leading-tight">
                {current.name}
              </h2>
              <p className="text-sm text-[#6b5c44] leading-relaxed mt-4">
                {current.description}
              </p>
            </div>

            {/* Steps Timeline */}
            <div className="flex flex-col">
              {current.steps.map((step) => (
                <div 
                  key={step.num}
                  className="flex gap-6 py-6 border-b border-[#e8d9c0]/30 last:border-0 items-start group"
                >
                  <span className="text-2xl font-serif text-[#9c7d73] lobster-two-bold leading-none w-8">
                    {step.num}
                  </span>
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="flex flex-wrap justify-between items-baseline gap-2">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-[#1a1208] group-hover:text-[#9c7d73] transition-colors">
                        {step.title}
                      </h4>
                      <span className="text-[10px] font-bold text-[#b8935a] uppercase tracking-widest">
                        {step.subtitle}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#6b5c44] leading-relaxed mt-1">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button className="inline-flex items-center gap-2 rounded-full bg-[#1a1208] px-8 py-3.5 font-bold text-white shadow-md hover:bg-[#9c7d73] transition-colors duration-200 text-xs sm:text-sm uppercase tracking-wider">
                Shop the {activeRitual} Collection
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </section>

      {/* ── 3. The Science Behind The Ceremony ── */}
      <section className="bg-white py-20 border-t border-b border-[#e8d9c0]/30 w-full">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="flex flex-col gap-6">
            <span className="text-xs tracking-[0.25em] text-[#9c7d73] uppercase font-bold">Scientific Heritage</span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1a1208] lobster-two-bold leading-tight">
              Why We Do Skincare <br />
              <em className="not-italic text-[#9c7d73]">Differently</em>
            </h2>
            <div className="w-16 h-0.5 bg-[#9c7d73]" />
            <p className="text-[#6b5c44] leading-relaxed text-sm">
              Skincare in East Asia has never been about quick cover-ups. It is an investment in skin longevity. By focusing on deep hydration, skin-barrier support, and active enzymes, our rituals allow botanical actives to sync with your skin&apos;s natural repair rhythms.
            </p>
            
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex gap-3 items-start">
                <div className="w-5 h-5 rounded-full bg-[#faf6ef] flex items-center justify-center text-[#9c7d73] mt-0.5 flex-shrink-0">✓</div>
                <p className="text-xs text-[#1a1208] font-medium leading-relaxed">
                  <strong>Botanical Synergies:</strong> Japanese camellia, rice enzymes, and sakura waters blended for maximum synergy.
                </p>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-5 h-5 rounded-full bg-[#faf6ef] flex items-center justify-center text-[#9c7d73] mt-0.5 flex-shrink-0">✓</div>
                <p className="text-xs text-[#1a1208] font-medium leading-relaxed">
                  <strong>Barrier Support:</strong> Gentle pH-balanced formulas that protect rather than strip your skin microbiome.
                </p>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-md">
            <Image
              src="/diverse_models.png"
              alt="East Asian skincare wisdom"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

        </div>
      </section>

      {/* ── 4. Call to Action / Footer Pledge ── */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="flex flex-col items-center gap-6">
          <Heart className="w-8 h-8 text-[#9c7d73]" />
          <h2 className="text-2xl md:text-3xl font-serif text-[#1a1208] lobster-two-bold">
            Start Your Own Ritual
          </h2>
          <p className="text-xs sm:text-sm text-[#6b5c44] leading-relaxed max-w-md">
            Take our custom skin quiz or read our detailed product manuals to find the perfect ritual steps for your skin type.
          </p>
          <div className="pt-4 flex flex-wrap gap-4 justify-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full bg-[#1a1208] px-8 py-3.5 font-bold text-white shadow-md hover:bg-[#9c7d73] transition-colors duration-200 text-xs sm:text-sm uppercase tracking-wider"
            >
              Learn Our Philosophy
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-[#1a1208] px-8 py-3.5 font-bold text-[#1a1208] hover:bg-[#1a1208] hover:text-white transition-all duration-200 text-xs sm:text-sm uppercase tracking-wider"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );

  // Helper function to switch tabs
  function setActiveTab(id: string) {
    setActiveRitual(id);
  }
}
