"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TeamClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const team = [
    {
      name: "Sumiran",
      role: "Co-Founder & Director of Strategy",
      image: "/sumiran.png",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
      twitter: "https://twitter.com",
      bio1: "Sumiran is an entrepreneur, researcher, and economics professional with over seven years of international experience across the USA, India, Japan, and the Netherlands. With academic training in Social and Applied Economics from the USA & Entrepreneurship from the Netherlands, she combines economic insight, applied analytics, and business strategy to create impactful, data-driven solutions & business Start-Ups.",
      bio2: "Having worked on export initiatives in collaboration with government bodies and international organizations, Sumiran has developed expertise in leadership, strategic thinking, econometrics, and data modelling. Her global experience across academia, entrepreneurship, and cross-cultural environments has shaped a multidisciplinary approach to innovation, and business growth.",
      bio3: "Passionate about self-entrepreneurship journey vis-a-vis bridging global niche technologies, AI based automation. Sumiran, brainchild the most ambitious venture of affordable cosmetics, beauty & health into the daily life of common human beings, especially Gen Z. 'Everybody has a right to be Gorgeous by Looks' is her mission & motto.",
    },
    {
      name: "Nikita",
      role: "Co-Founder & Director of E-commerce",
      image: "/nikita.jpeg",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
      twitter: "https://twitter.com",
      bio1: "Nikita is an E-commerce expert with a strong professional and academic background, including successfully running an E-commerce start-up during the early stages of the online retail industry.",
      bio2: "To further enhance her knowledge of the latest technology-oriented marketing tools, she completed a Master’s degree in Digital Communications and its role in Entrepreneurship from one of Europe’s leading institutions. She possesses exceptional end-to-end expertise across the entire spectrum of E-commerce business operations, including content writing, product specification development, editing, photoshoots, backend administration, and inventory management.",
      bio3: "With professional experience in both India and Europe, Nikita has developed specialist expertise in start-ups, digital marketing, innovation, and research development. Cosmetics, beauty, and health are areas especially close to Nikita’s heart, inspiring her to conceive, plan, and create a platform offering some of the world’s most advanced technology-oriented product lines. 'Good Looks is Our Birthright' is her mission statement.",
    },
  ];

  return (
    <div className="w-full bg-[#faf6ef] text-[#1a1208] font-sans min-h-screen py-20 px-6 sm:px-12 md:px-16">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation back */}
        <div className="mb-12">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm text-[#9c7d73] hover:text-[#1a1208] font-semibold transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to About
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-xs tracking-[0.25em] text-[#9c7d73] uppercase font-bold block mb-3">
            The Founders
          </span>
          <h1 className="text-4xl md:text-6xl font-serif lobster-two-bold text-[#1a1208]">
            Meet Our Team
          </h1>
          <div className="w-16 h-0.5 bg-[#9c7d73]/30 mx-auto mt-4" />
          <p className="mt-4 text-[#6b5c44] text-sm sm:text-base max-w-xl mx-auto">
            The visionary minds bridging economics, digital strategy, and cosmetic innovation.
          </p>
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 gap-16">
          {team.map((member, index) => (
            <article
              key={member.name}
              className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-start bg-white border border-[#e8d9c0]/50 p-8 md:p-12 rounded-[2.5rem] shadow-sm hover:shadow-md transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Image & Social Column */}
              <div className="flex flex-col gap-4 w-full lg:w-1/3 flex-shrink-0 items-center">
                {/* Image Container */}
                <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden bg-[#faf6ef]/30 border border-[#e8d9c0]/40 group">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 350px"
                    className="object-contain transition-transform duration-700 group-hover:scale-103"
                  />
                </div>

                {/* Social Links below image */}
                <div className="flex gap-4 justify-center mt-2">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-[#faf6ef] border border-[#e8d9c0]/40 flex items-center justify-center text-[#6b5c44] hover:bg-[#9c7d73] hover:text-white hover:border-[#9c7d73] transition-all duration-300 shadow-sm"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-[#faf6ef] border border-[#e8d9c0]/40 flex items-center justify-center text-[#6b5c44] hover:bg-[#9c7d73] hover:text-white hover:border-[#9c7d73] transition-all duration-300 shadow-sm"
                    aria-label={`${member.name} Instagram`}
                  >
                    <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="4" y="4" width="16" height="16" rx="5" />
                      <circle cx="12" cy="12" r="3.5" />
                      <circle cx="17" cy="7" r="0.8" fill="currentColor" stroke="none" />
                    </svg>
                  </a>
                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-[#faf6ef] border border-[#e8d9c0]/40 flex items-center justify-center text-[#6b5c44] hover:bg-[#9c7d73] hover:text-white hover:border-[#9c7d73] transition-all duration-300 shadow-sm"
                    aria-label={`${member.name} Twitter`}
                  >
                    <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2.4" viewBox="0 0 24 24">
                      <path d="M4 4l16 16M20 4 4 20" strokeLinecap="round" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Content Column */}
              <div className="flex flex-col gap-6 lg:w-2/3">
                <div>
                  <h2 className="text-3xl md:text-4xl font-serif lobster-two-bold text-[#1a1208]">
                    {member.name}
                  </h2>
                  <p className="text-[#9c7d73] font-semibold text-lg tracking-wide mt-1">
                    {member.role}
                  </p>
                </div>
                <div className="h-0.5 w-16 bg-[#9c7d73]" />
                <div className="flex flex-col gap-4 text-sm md:text-base text-[#6b5c44] leading-relaxed">
                  <p>{member.bio1}</p>
                  <p>{member.bio2}</p>
                  <p>{member.bio3}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
