"use client"
import React, { useState } from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full z-50 relative">
      <div className="mx-auto max-w-7xl px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-medium tracking-[0.25em] text-[#b8935a] uppercase lobster-two-bold">
            Nimi
          </Link>

          <ul className="hidden lg:flex items-center gap-6 text-sm text-[#6b5c44]">
            <li><Link href="#" className="hover:text-[#1a1208]">Collections</Link></li>
            <li><Link href="#" className="hover:text-[#1a1208]">Skincare</Link></li>
            <li><Link href="#" className="hover:text-[#1a1208]">Makeup</Link></li>
            <li><Link href="#" className="hover:text-[#1a1208]">Rituals</Link></li>
            <li><Link href="#" className="hover:text-[#1a1208]">About</Link></li>
          </ul>
        </div>

        <div className="flex items-center gap-4">
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
      <div className={`lg:hidden fixed inset-0 z-40 pointer-events-none ${open ? 'pointer-events-auto' : ''}`} aria-hidden={!open}>
        <div className={`absolute inset-0 bg-black/30 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={() => setOpen(false)} />

        <aside className={`absolute right-0 top-0 h-full w-64 bg-white p-6 shadow-xl transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="text-lg font-medium tracking-[0.25em] text-[#b8935a] uppercase lobster-two-bold">Nimi</Link>
            <button aria-label="Close menu" onClick={() => setOpen(false)} className="p-2 rounded-md">
              <svg className="w-5 h-5 text-[#6b5c44]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <nav className="flex flex-col gap-4 text-[#6b5c44]">
            <Link href="#" onClick={() => setOpen(false)} className="py-2 hover:text-[#1a1208]">Collections</Link>
            <Link href="#" onClick={() => setOpen(false)} className="py-2 hover:text-[#1a1208]">Skincare</Link>
            <Link href="#" onClick={() => setOpen(false)} className="py-2 hover:text-[#1a1208]">Makeup</Link>
            <Link href="#" onClick={() => setOpen(false)} className="py-2 hover:text-[#1a1208]">Rituals</Link>
            <Link href="#" onClick={() => setOpen(false)} className="py-2 hover:text-[#1a1208]">About</Link>
          </nav>

          <div className="mt-6">
            <button className="w-full rounded-full bg-[#c8923a] px-4 py-2 text-white font-semibold" onClick={() => setOpen(false)}>Shop Now</button>
          </div>
        </aside>
      </div>
    </nav>
  );
};

export default Navbar;