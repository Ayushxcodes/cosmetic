"use client"
import { useState, useEffect } from "react";
import Image from "next/image";

export default function VeluraHero() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const rightCards = [
    "/model1.webp",
    "/model2.jpeg",
    "/model3.jpg",
    "/model4.webp",
  ];

  return (
    <section className={`relative min-h-[calc(100vh-72px)] w-full overflow-hidden bg-[#faf6ef] flex items-center justify-center px-8 py-12 font-sans transform transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-20 -right-20 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-[#f5deb3] via-[#f0c98e] to-[#faf6ef] opacity-60 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[320px] h-[320px] rounded-full bg-[#e8d9c0] opacity-40 blur-2xl" />
      </div>

        <div className="pointer-events-auto absolute bottom-4 right-15 md:bottom-[90px] md:right-20 z-20 block">
          <p className="dancing-script-philosophy text-[#b8935a] text-2xl md:text-2xl lg:text-5xl tracking-wide   rounded-md px-2 py-1 md:bg-transparent md:rounded-none md:px-0 md:py-0">&quot;Good Looks is Our Birthright&quot;</p>
        </div>

      <div className="relative z-10 mx-auto max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_auto_1fr] gap-6 items-center">
        <div className={`flex flex-col gap-6 justify-center lg:justify-self-start lg:-ml-12 xl:-ml-50 transform transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '100ms' }}>
          <div className="block lg:hidden w-full flex justify-center mb-6">
            <div className="relative w-[300px] sm:w-[360px] h-[320px] sm:h-[420px] rounded-2xl overflow-hidden">
              <Image src="/image.png" alt="Model / product" fill className="object-cover" />
            </div>
          </div>
          <div>
            <p className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black  tracking-[0.25em] text-[#b8935a] uppercase mb-1 dancing-script-philosophy">Niimi</p>
            <h1 className="lobster-two-bold font-serif text-[clamp(2.4rem,5vw,4.25rem)] leading-[1.02] font-black text-[#1a1208]">Cosmetics</h1>
            <p className="mt-3 text-[#6b5c44] text-base leading-relaxed max-w-[20rem]">Luxury skincare that nourishes your skin from within, designed for radiant beauty and lasting results.</p>
            <button className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#c8923a] px-6 py-2 text-3xl font-semibold text-white shadow-md hover:bg-[#a97428] transition-colors duration-200 w-full sm:w-auto justify-center dancing-script-philosophy">About Us
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
          </div>

          
        </div>

        

        <div className={`flex flex-col gap-4 lg:justify-self-end lg:-mr-12 xl:-mr-2 lg:self-start lg:pt-12 xl:pt-1 transform transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '200ms' }}>
              <div className="mb-8 lg:mb-12 w-full">
                <p className="text-4xl sm:text-6xl lg:text-8xl font-medium tracking-[0.12em] sm:tracking-[0.18em] lg:tracking-[0.2em] text-[#b8935a] uppercase text-center lg:text-right leading-tight break-words dancing-script-philosophy">Luxurious</p>
              </div>

          {/* card moved to its own right column */}

          <div className="flex items-center justify-center">
            <div className="relative flex flex-col items-center -mt-4 lg:-mt-12 w-full">
              <div className="relative w-full max-w-[520px]">
                  <div className="w-full h-full relative md:min-h-[420px] lg:min-h-[620px] hidden lg:block">
                    <Image src="/image.png" alt="Model / product" fill className="object-cover" />
                  </div>
              </div>

              <button className="mt-3 rounded-full bg-[#1a1208] text-white px-8 py-3 text-3xl font-bold tracking-wide shadow-lg hover:bg-[#2e200c] transition-colors duration-200 hidden lg:inline-flex w-full sm:w-auto dancing-script-philosophy">
                learn more
              </button>
            </div>
          </div>

        </div>

        <div className="flex flex-col gap-4 lg:justify-self-end lg:-mr-12 xl:-mr-30 lg:self-start lg:pt-12 xl:pt-1">
          <div className="w-full">
            <div className="flex gap-3 lg:grid lg:grid-cols-2 lg:gap-3 justify-end overflow-x-auto py-2">
              {rightCards.map((src, i) => (
                <div key={i} className="relative w-20 sm:w-24 lg:w-28 aspect-square rounded-2xl bg-white/80 border border-[#e8d9c0] overflow-hidden flex items-center justify-center shadow-sm flex-shrink-0">
                  <Image src={src} alt={`Card ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
    </section>
  );
}
