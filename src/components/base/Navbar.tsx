"use client"
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Share2 } from "lucide-react";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);

  const socialLinks = [
    {
      label: "Instagram",
      href: "#",
      className: "bg-[#d62976] hover:bg-[#b91d63]",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="4" width="16" height="16" rx="5" />
          <circle cx="12" cy="12" r="3.5" />
          <circle cx="17" cy="7" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: "#",
      className: "bg-[#1877f2] hover:bg-[#1264cc]",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14 8.5h2V5.2c-.35-.05-1.55-.15-2.95-.15-2.9 0-4.9 1.8-4.9 5.1V13H5v3.7h3.15V24h3.85v-7.3h3l.5-3.7h-3.5v-2.5c0-1.05.3-2 2-2Z" />
        </svg>
      ),
    },
    {
      label: "Twitter",
      href: "#",
      className: "bg-[#1a1208] hover:bg-[#3a2a17]",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="M4 4l16 16M20 4 4 20" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="w-full z-50 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-3 flex justify-between items-center lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <div className="flex items-center">
          <Link href="/" className="flex items-center" aria-label="Niimi home">
            <Image
              src="/niimi_logo.png"
              alt="Niimi"
              width={1280}
              height={1280}
              className="h-15 md:h-15 w-auto object-fit"
              priority
            />
            <h1 className="text-xl md:text-3xl tracking-wider text-[#6b5c44]">Niimi Cosmetics</h1>
          </Link>
        </div>

        <ul className="hidden lg:flex items-center justify-center gap-6 text-sm text-[#6b5c44]">
          <li><Link href="/about" className="hover:text-[#1a1208]">About</Link></li>
          <li><Link href="#" className="hover:text-[#1a1208]">Collections</Link></li>
          <li><Link href="#" className="hover:text-[#1a1208]">Rituals</Link></li>
          <li><Link href="/team" className="hover:text-[#1a1208]">Team</Link></li>
        </ul>

        <div className="flex items-center justify-end gap-4">
          <button aria-label="search" className="p-2 rounded-full hover:bg-white/80 transition">
            <svg className="w-5 h-5 text-[#6b5c44]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </button>

          <button aria-label="account" className="p-2 rounded-full hover:bg-white/80 transition">
            <svg className="w-5 h-5 text-[#6b5c44]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </button>

          <div className="relative hidden lg:block">
            <button aria-label="cart" className="p-2 rounded-full hover:bg-white/80 transition">
              <svg className="w-5 h-5 text-[#6b5c44]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </button>
            <span className="absolute -top-1 -right-1 bg-[#d4a853] text-white text-[10px] font-bold rounded-full px-1.5">3</span>
          </div>

          {/* Mobile hamburger toggle */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="p-2 rounded-md lg:hidden inline-flex items-center justify-center"
          >
            {open ? (
              <svg className="w-6 h-6 text-[#6b5c44]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            ) : (
              <svg className="w-6 h-6 text-[#6b5c44]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile slide-over menu */}
      <div className={`lg:hidden fixed inset-0 z-40 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`} aria-hidden={!open}>
        <div className={`absolute inset-0 bg-black/30 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={() => setOpen(false)} />

        <aside className={`absolute right-0 top-0 h-full w-64 bg-white p-6 shadow-xl transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="text-lg font-medium tracking-[0.25em] text-[#b8935a] uppercase lobster-two-bold">Niimi</Link>
            <button aria-label="Close menu" onClick={() => setOpen(false)} className="p-2 rounded-md">
              <svg className="w-5 h-5 text-[#6b5c44]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <nav className="flex flex-col gap-4 text-[#6b5c44]">
            <Link href="/about" onClick={() => setOpen(false)} className="py-2 hover:text-[#1a1208]">About</Link>
            <Link href="#" onClick={() => setOpen(false)} className="py-2 hover:text-[#1a1208]">Collections</Link>
            <Link href="#" onClick={() => setOpen(false)} className="py-2 hover:text-[#1a1208]">Rituals</Link>
            <Link href="/team" onClick={() => setOpen(false)} className="py-2 hover:text-[#1a1208]">Team</Link>
          </nav>

          <div className="mt-6">
            <button className="w-full rounded-full bg-[#c8923a] px-4 py-2 text-white font-semibold" onClick={() => setOpen(false)}>Shop Now</button>
          </div>
        </aside>
      </div>

      <div className="fixed bottom-6 right-6 z-[60] flex flex-col-reverse items-center gap-3">
        <button
          aria-label={socialOpen ? "Close social links" : "Open social links"}
          aria-expanded={socialOpen}
          onClick={() => setSocialOpen(!socialOpen)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#c8923a] text-white shadow-lg shadow-[#1a1208]/20 transition hover:bg-[#a97428] focus:outline-none focus:ring-2 focus:ring-[#1a1208] focus:ring-offset-2"
        >
          <Share2 className={`h-6 w-6 transition-transform duration-300 ${socialOpen ? "rotate-45" : ""}`} />
        </button>

        <div className="flex flex-col-reverse items-center gap-3">
          {socialLinks.map((social, index) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              target="_blank"
              rel="noreferrer"
              className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-md transition-all duration-300 ${social.className} ${socialOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-4 opacity-0 pointer-events-none"}`}
              style={{ transitionDelay: socialOpen ? `${index * 60}ms` : "0ms" }}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
