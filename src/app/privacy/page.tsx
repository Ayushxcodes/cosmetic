import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Niimi Cosmetics",
  description:
    "Learn how Niimi Cosmetics collects, uses, and safeguards your personal information and transaction data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-[#faf6ef] text-[#1a1208] min-h-screen py-16 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#6b5c44] hover:text-[#1a1208] transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Boutique</span>
          </Link>
        </div>

        {/* Header Title */}
        <div className="border-b border-[#e8d9c0]/70 pb-8">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-4 h-4 text-[#b8935a]" />
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#b8935a]">
              Trust &amp; Transparency
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif lobster-two-bold text-[#1a1208]">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#6b5c44] mt-2">
            Last Updated: October 2026 • Effective Immediately
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-10 text-sm text-[#4a3f31] leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#1a1208] flex items-center gap-2">
              <span className="text-[#b8935a]">01.</span> Commitment to Your Privacy
            </h2>
            <p>
              At Niimi Cosmetics (&quot;Niimi&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), we craft luxury skincare with uncompromising purity. We apply the same standard of uncompromising care to protecting your personal data and upholding your fundamental privacy rights.
            </p>
            <p>
              This Privacy Policy explains how your information is gathered, safeguarded, and utilized when you interact with our boutique storefront at <code>niimicosmetics.com</code>, place an order, or communicate with our customer atelier.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#1a1208] flex items-center gap-2">
              <span className="text-[#b8935a]">02.</span> Information We Collect
            </h2>
            <p>We only collect information necessary to fulfill our commitments to you:</p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
              <li>
                <strong>Client Identification &amp; Contact:</strong> Full name, verified email address, and mobile phone number for delivery coordination and dispatch notifications.
              </li>
              <li>
                <strong>Shipping &amp; Logistics:</strong> Residential or commercial physical address, city, state, and postal code for secure courier dispatch.
              </li>
              <li>
                <strong>Payment &amp; Billing Data:</strong> Payment method preferences (e.g., Cash on Delivery, UPI, or Credit/Debit card). Credit card and UPI credentials are processed exclusively via tokenized, PCI-DSS Level 1 certified gateways (e.g., Razorpay); Niimi never stores raw credit card numbers or banking passwords on our servers.
              </li>
              <li>
                <strong>Order History &amp; Favorites:</strong> Items purchased, order statuses, transaction reference IDs, and wishlist selections.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#1a1208] flex items-center gap-2">
              <span className="text-[#b8935a]">03.</span> How We Use Your Information
            </h2>
            <p>Your information is employed exclusively for legitimate commercial purposes:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-[#e8d9c0] shadow-xs">
                <h3 className="font-semibold text-xs text-[#1a1208] uppercase tracking-wider mb-1">
                  Order Fulfillment
                </h3>
                <p className="text-xs text-[#6b5c44]">
                  Packaging, verification, courier transit, and receipt generation for your artisanal beauty orders.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#e8d9c0] shadow-xs">
                <h3 className="font-semibold text-xs text-[#1a1208] uppercase tracking-wider mb-1">
                  Client Communications
                </h3>
                <p className="text-xs text-[#6b5c44]">
                  Dispatch tracking notifications, order confirmations, and prompt customer care resolution.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#e8d9c0] shadow-xs">
                <h3 className="font-semibold text-xs text-[#1a1208] uppercase tracking-wider mb-1">
                  Platform Security
                </h3>
                <p className="text-xs text-[#6b5c44]">
                  Preventing fraudulent transactions, mitigating DDoS attacks, and auditing administrator access.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#e8d9c0] shadow-xs">
                <h3 className="font-semibold text-xs text-[#1a1208] uppercase tracking-wider mb-1">
                  Compliance &amp; Legal
                </h3>
                <p className="text-xs text-[#6b5c44]">
                  Adhering to taxation reporting standards and statutory corporate accounting mandates.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#1a1208] flex items-center gap-2">
              <span className="text-[#b8935a]">04.</span> Information Sharing &amp; Third Parties
            </h2>
            <div className="p-4 rounded-xl bg-[#faf6ef] border-l-4 border-[#b8935a] border border-[#e8d9c0] text-xs leading-relaxed">
              <strong>Our Pledge:</strong> We never sell, rent, monetize, or trade your personal data with third-party advertisers or data brokers under any circumstances.
            </div>
            <p>
              We disclose necessary minimum subsets of data solely to trusted logistics and payment partners under strict non-disclosure obligations (e.g., sharing delivery address with express courier couriers, and payment amounts with payment gateways).
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#1a1208] flex items-center gap-2">
              <span className="text-[#b8935a]">05.</span> Data Security &amp; Encryption
            </h2>
            <p>
              Our database infrastructure uses modern industry defenses:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>End-to-end transport layer encryption (TLS 1.3 / HTTPS) across all storefront and API interactions.</li>
              <li>Role-based access control protecting administrative endpoints and orders via cryptographically signed JWT sessions.</li>
              <li>High-entropy password hashing using industry-standard bcrypt algorithms.</li>
              <li>Server-side parameterization preventing SQL injection vulnerabilities.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#1a1208] flex items-center gap-2">
              <span className="text-[#b8935a]">06.</span> Your Data Rights
            </h2>
            <p>
              You maintain full sovereignty over your personal records. At any point, you may contact our concierge to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>Request an export copy of all order records and contact information associated with your identity.</li>
              <li>Request correction or rectification of outdated shipping addresses or contact numbers.</li>
              <li>Request deletion or anonymization of your profile, subject to statutory tax record retention obligations.</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section className="space-y-3 border-t border-[#e8d9c0] pt-6">
            <h2 className="text-xl font-serif font-bold text-[#1a1208] flex items-center gap-2">
              <span className="text-[#b8935a]">07.</span> Contact Our Privacy Officer
            </h2>
            <p className="text-xs sm:text-sm">
              For any questions, concerns, or requests regarding this Privacy Policy or your personal records, please reach out to:
            </p>
            <div className="bg-white p-5 rounded-2xl border border-[#e8d9c0] text-xs space-y-1 font-mono">
              <p className="font-sans font-bold text-[#1a1208]">Niimi Cosmetics Atelier — Legal &amp; Compliance</p>
              <p>Email: privacy@niimicosmetics.com</p>
              <p>Support: concierge@niimicosmetics.com</p>
              <p>Physical Address: Niimi Luxury Atelier, 402 Heritage Row, Mumbai 400021, India</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
