import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="w-full z-50">
      <div className="mx-auto max-w-7xl px-8 py-6 flex items-center justify-between">
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

          <div className="relative">
            <button aria-label="cart" className="p-2 rounded-full hover:bg-white/80 transition">
              <svg className="w-5 h-5 text-[#6b5c44]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </button>
            <span className="absolute -top-1 -right-1 bg-[#d4a853] text-white text-[10px] font-bold rounded-full px-1.5">3</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;