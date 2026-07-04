"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const shopLinks = [
    { label: "Bestsellers", href: "#" },
    { label: "New Arrivals", href: "#" },
    { label: "Serums", href: "#" },
    { label: "Rituals Collection", href: "#" }
  ];

  const helpLinks = [
    { label: "Customer Support", href: "#" },
    { label: "Shipping & Delivery", href: "#" },
    { label: "Returns & Exchanges", href: "#" },
    { label: "FAQs", href: "#" }
  ];

  const servicesLinks = [
    { label: "Facial Care", href: "#" },
    { label: "Beauty", href: "#" },
    { label: "Cosmetics", href: "#" },
    { label: "Body Massages", href: "#" }
  ];

  const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "Manifesto", href: "/about" },
    { label: "Meet the Team", href: "/team" },
    { label: "Press & Media", href: "#" }
  ];

  const careersLinks = [
    { label: "Open Positions", href: "#" },
    { label: "Culture & Life", href: "#" },
    { label: "Internships", href: "#" }
  ];

  return (
    <footer className="bg-white text-[#1a1208] border-t border-[#e8d9c0]/30 pt-16 pb-10 px-6 sm:px-12 md:px-16 w-full">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Upper Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-10 border-b border-[#e8d9c0]/20">
          
          {/* Left Block: Logo & Statement */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <Link href="/" className="block">
              <Image
                src="/official_logo.png"
                alt="Niimi Cosmetics"
                width={120}
                height={50}
                className="object-contain"
                style={{ height: "auto" }}
              />
            </Link>
            <p className="text-sm text-[#6b5c44] leading-relaxed max-w-sm">
              We want to make honest, premium J-Beauty and C-Beauty accessible to all, providing direct botanical formulations without compromises.
            </p>
          </div>

          {/* Links Columns Grid */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-5 gap-6 sm:gap-4">
            
            {/* Shop Column */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs uppercase tracking-widest font-bold text-[#b8935a]">shop</h4>
              <ul className="flex flex-col gap-2">
                {shopLinks.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-xs text-[#6b5c44] hover:text-[#1a1208] transition">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help Column */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs uppercase tracking-widest font-bold text-[#b8935a]">help</h4>
              <ul className="flex flex-col gap-2">
                {helpLinks.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-xs text-[#6b5c44] hover:text-[#1a1208] transition">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Column */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs uppercase tracking-widest font-bold text-[#b8935a]">services</h4>
              <ul className="flex flex-col gap-2">
                {servicesLinks.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-xs text-[#6b5c44] hover:text-[#1a1208] transition">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs uppercase tracking-widest font-bold text-[#b8935a]">company</h4>
              <ul className="flex flex-col gap-2">
                {companyLinks.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-xs text-[#6b5c44] hover:text-[#1a1208] transition">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Careers Column */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs uppercase tracking-widest font-bold text-[#b8935a]">careers</h4>
              <ul className="flex flex-col gap-2">
                {careersLinks.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-xs text-[#6b5c44] hover:text-[#1a1208] transition">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Lower Row: Contact details, Socials & Legal */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-xs text-[#6b5c44] pt-2">
          
          {/* Contact Details */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 font-semibold">
            <span>+91 93100 46426</span>
            <span>support@niimicosmetics.com</span>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#1a1208] transition" aria-label="Instagram">
              <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="#" className="hover:text-[#1a1208] transition" aria-label="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a href="#" className="hover:text-[#1a1208] transition" aria-label="Twitter">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </a>
          </div>

          {/* Legal / Copyright */}
          <div className="flex gap-4">
            <Link href="#" className="hover:text-[#1a1208] transition">Privacy Policy</Link>
            <span>© {new Date().getFullYear()} Niimi Cosmetics</span>
          </div>

        </div>

      </div>
    </footer>
  );
}
