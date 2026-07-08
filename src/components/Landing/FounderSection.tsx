"use client"
import { useEffect, useState } from "react";
import Image from "next/image";

export default function FounderSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className={`relative w-full px-6 py-12 bg-white/80 overflow-hidden font-sans ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} transition-all duration-700`}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="text-3xl sm:text-4xl font-medium tracking-wider text-[#b8935a] uppercase dancing-script-philosophy">Founders</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-serif text-[#1a1208] lobster-two-bold">Meet the team behind Niimi</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

          <article className={`group flex flex-col bg-white/95 rounded-3xl shadow-lg overflow-hidden transform transition-all duration-500 border border-transparent will-change-transform hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.01] transform-gpu ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '120ms' }}>
            <div className="relative w-full h-72 md:h-96 rounded-t-3xl overflow-hidden bg-[#f7efe3] flex items-center justify-center">
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
              <Image src="/sumiran.jpeg" alt="Sumiran" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain transform transition-transform duration-700 group-hover:scale-105" />
            </div>

            <div className="p-6 md:p-8 flex flex-col justify-start gap-4">
              <h3 className="text-2xl md:text-3xl font-semibold text-[#1a1208] tracking-wide">Sumiran</h3>
              <div className="h-px w-16 bg-gradient-to-r from-[#b8935a] to-transparent" />
              <p className="text-sm md:text-base text-[#6b5c44] leading-relaxed">Sumiran an entrepreneur, researcher, and economics professional with over seven years of international experience across the USA, India, Japan, and the Netherlands. With academic training in Social and Applied Economics from the USA & Entrepreneurship from the Netherlands, she combines economic insight, applied analytics, and business strategy to create impactful, data-driven solutions & business Start-Ups.</p>

              <p className="text-sm md:text-base text-[#6b5c44] leading-relaxed">Having worked on export initiatives in collaboration with government bodies and international organizations, Sumiran has developed expertise in leadership, strategic thinking, econometrics, and data modelling. Her global experience across academia, entrepreneurship, and cross-cultural environments has shaped a multidisciplinary approach to innovation, and business growth.</p>

              <p className="text-sm md:text-base text-[#6b5c44] leading-relaxed">Passionate about self-entrepreneurship journey vis-a-viz bridging global niche technologies, AI based automation. Sumiran, brainchild the most ambitious venture of affordable cosmetics, beauty & health into the daily life, of common human beings, especially Gen Z. Everybody has a right to be “Gorgeous by Looks” is mission & motto.</p>
            </div>
          </article>

          <article className={`group flex flex-col bg-white/95 rounded-3xl shadow-lg overflow-hidden transform transition-all duration-500 border border-transparent will-change-transform hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.01] transform-gpu ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '220ms' }}>
            <div className="relative w-full h-72 md:h-96 rounded-t-3xl overflow-hidden bg-[#f7efe3] flex items-center justify-center">
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
              <Image src="/nikita.jpeg" alt="Nikita" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain transform transition-transform duration-700 group-hover:scale-105" />
            </div>

            <div className="p-6 md:p-8 flex flex-col justify-start gap-4">
              <h3 className="text-2xl md:text-3xl font-semibold text-[#1a1208] tracking-wide">Nikita</h3>
              <div className="h-px w-16 bg-gradient-to-r from-[#b8935a] to-transparent" />
              <p className="text-sm md:text-base text-[#6b5c44] leading-relaxed">Nikita is an E-commerce expert with a strong professional and academic background, including successfully running an E-commerce start-up during the early stages of the online retail industry.</p>

              <p className="text-sm md:text-base text-[#6b5c44] leading-relaxed">To further enhance her knowledge of the latest technology-oriented marketing tools, she completed a Master’s degree in Digital Communications and its role in Entrepreneurship from one of Europe’s leading institutions. She possesses exceptional end-to-end expertise across the entire spectrum of E-commerce business operations, including content writing, product specification development, editing, photoshoots, backend administration, and inventory management.</p>

              <p className="text-sm md:text-base text-[#6b5c44] leading-relaxed">With professional experience in both India and Europe, Nikita has developed specialist expertise in start-ups, digital marketing, innovation, and research development. Cosmetics, beauty, and health are areas especially close to Nikita’s heart, inspiring her to conceive, plan, and create a platform offering some of the world’s most advanced technology-oriented product lines. “Discover the East Asian Beauty” is the mission statement of Niimi Cosmetics.</p>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
}
