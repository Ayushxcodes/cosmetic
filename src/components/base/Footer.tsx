"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      await new Promise((r) => setTimeout(r, 600));
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <footer className="bg-[#f3e7cf] border-t border-[#e8d9c0] text-[#1a1208]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.6fr_1.2fr] gap-12 items-start mb-12">
          
          {/* Left Column: Contact & Address */}
          <div className="flex flex-col gap-3 order-2 lg:order-1">
            <h3 className="lobster-two-bold text-[#1a1208] text-2xl">Niimi Cosmetics</h3>
            <p className="text-[#6b5c44] text-xs leading-relaxed max-w-sm">
              Luxury skincare rooted in Japanese traditions and modern science.
            </p>
            <div className="mt-2 text-xs text-[#6b5c44] space-y-1">
              <p><strong>Address:</strong> Amsterdam | New Delhi | Tokyo</p>
              <p><strong>Email:</strong> info@niimicosmetics.com</p>
              <p><strong>Phone:</strong> +91 99999 99999</p>
            </div>
          </div>

          {/* Center Column: Newsletter */}
          <div className="flex flex-col items-center text-center order-1 lg:order-2">
            <div className="section-label text-xs tracking-widest text-[#6b5c44] mb-2 uppercase font-semibold">Join the Circle</div>
            <h2 className="section-title text-2xl sm:text-3xl font-serif lobster-two-bold text-[#1a1208] mb-3">
              Beauty secrets, <em className="not-italic text-[#b8935a]">delivered quietly</em>
            </h2>
            <p className="section-body text-xs text-[#6b5c44] max-w-md mb-6">
              First access to new launches, exclusive rituals, and the rare ingredient journal.
            </p>

            <form className="newsletter-form flex flex-wrap justify-center gap-3 w-full max-w-md" onSubmit={handleSubmit}>
              <input
                className="newsletter-input px-4 py-2 rounded-md border border-[#e8d9c0] bg-white text-[#1a1208] text-sm flex-grow min-w-[200px] focus:outline-none focus:ring-2 focus:ring-[#b8935a]"
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email address"
              />

              <Button className="rounded-full px-5 py-2 bg-[#c8923a] text-white hover:bg-[#a97428] font-semibold dancing-script-philosophy text-base" type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Subscribing…" : "Subscribe"}
              </Button>
            </form>

            <p className="text-[10px] text-[#6b5c44] mt-3 tracking-wide">
              By subscribing you agree to our Privacy Policy. Unsubscribe anytime.
            </p>

            {status === "success" && <p className="text-sm text-green-600 mt-3">Thanks — check your inbox.</p>}
            {status === "error" && <p className="text-sm text-destructive mt-3">Something went wrong. Please try again.</p>}
          </div>

          {/* Right Column: Socials */}
          <div className="flex flex-col lg:items-end gap-4 order-3">
            <h4 className="text-sm tracking-wider uppercase text-[#b8935a] font-semibold">Follow Us</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/80 border border-[#e8d9c0] flex items-center justify-center text-[#6b5c44] hover:bg-[#b8935a] hover:text-white transition-all duration-300 shadow-sm"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="4" y="4" width="16" height="16" rx="5" />
                  <circle cx="12" cy="12" r="3.5" />
                  <circle cx="17" cy="7" r="0.8" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/80 border border-[#e8d9c0] flex items-center justify-center text-[#6b5c44] hover:bg-[#b8935a] hover:text-white transition-all duration-300 shadow-sm"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 8.5h2V5.2c-.35-.05-1.55-.15-2.95-.15-2.9 0-4.9 1.8-4.9 5.1V13H5v3.7h3.15V24h3.85v-7.3h3l.5-3.7h-3.5v-2.5c0-1.05.3-2 2-2Z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/80 border border-[#e8d9c0] flex items-center justify-center text-[#6b5c44] hover:bg-[#b8935a] hover:text-white transition-all duration-300 shadow-sm"
                aria-label="Twitter"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M4 4l16 16M20 4 4 20" strokeLinecap="round" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px bg-[#e8d9c0]/60 w-full mb-6" />

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#6b5c44] tracking-wide">
          <p>© {new Date().getFullYear()} Niimi Cosmetics. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#1a1208]">Privacy Policy</a>
            <a href="#" className="hover:text-[#1a1208]">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
