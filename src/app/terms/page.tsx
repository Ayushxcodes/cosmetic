import React from "react";
import Link from "next/link";
import { FileText, Scale, Shield, AlertCircle, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Niimi Cosmetics",
  description:
    "Review the terms, conditions, ordering policies, and guidelines governing purchases on Niimi Cosmetics.",
};

export default function TermsAndConditionsPage() {
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
            <Scale className="w-4 h-4 text-[#b8935a]" />
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#b8935a]">
              Legal Agreement
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif lobster-two-bold text-[#1a1208]">
            Terms &amp; Conditions
          </h1>
          <p className="text-xs text-[#6b5c44] mt-2">
            Last Updated: October 2026 • Applies to all Storefront and E-Commerce Orders
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-10 text-sm text-[#4a3f31] leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#1a1208] flex items-center gap-2">
              <span className="text-[#b8935a]">01.</span> Agreement to Terms
            </h2>
            <p>
              Welcome to the digital boutique of Niimi Cosmetics (&quot;Niimi&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). By browsing our website, creating an account, or placing an order through <code>niimicosmetics.com</code>, you confirm that you have read, understood, and agreed to be bound by these Terms and Conditions in their entirety.
            </p>
            <p>
              If you do not agree with any provision of these terms, please discontinue your access and refrain from completing e-commerce transactions on the platform.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#1a1208] flex items-center gap-2">
              <span className="text-[#b8935a]">02.</span> Product Descriptions &amp; Purity
            </h2>
            <p>
              We take utmost diligence in displaying product formulations, ingredient lists, container volumes, and benefits accurately. Because our products contain cold-pressed natural oils, fermented rice extracts, and botanicals:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>Minor variations in natural color, aroma, and botanical settling between artisan batches are normal and signify formulation authenticity.</li>
              <li>We reserve the right to modify packaging finishes, formulations, or discontinue items without prior notice.</li>
              <li>Product claims reflect internal dermatological panels and should not replace personalized medical advice for acute skin disorders.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#1a1208] flex items-center gap-2">
              <span className="text-[#b8935a]">03.</span> Orders &amp; Contract Formation
            </h2>
            <p>
              When you submit an order through our checkout system, you make an offer to purchase the selected items. An order confirmation receipt is automatically dispatched upon successful submission.
            </p>
            <p>
              Niimi reserves the right to decline or cancel any order in instances of suspected fraudulent activities, pricing calculation errors, or inventory discrepancies. In such cases, any funds collected will be promptly refunded via the original payment source.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#1a1208] flex items-center gap-2">
              <span className="text-[#b8935a]">04.</span> Pricing &amp; Payment Terms
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
              <li>
                <strong>Currency &amp; Taxes:</strong> All prices are displayed in USD (with regional conversions where available) and are inclusive of standard applicable processing taxes unless stated otherwise.
              </li>
              <li>
                <strong>Accepted Methods:</strong> We accept Cash on Delivery (COD), Direct UPI QR transfer, and Major Credit/Debit Cards via our integrated payment processor (Razorpay).
              </li>
              <li>
                <strong>Cash on Delivery (COD):</strong> For COD orders, exact payment must be provided upon handover by our certified logistics partner. Repeated refusal of verified COD shipments may result in restriction of COD privileges.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#1a1208] flex items-center gap-2">
              <span className="text-[#b8935a]">05.</span> Shipping, Transit &amp; Delivery
            </h2>
            <p>
              Orders are packaged in luxury temperature-stable packaging and dispatched within 24–48 business hours. Typical delivery takes 2 to 5 business days depending on geographical location.
            </p>
            <p>
              Risk of loss and title for items pass to you upon delivery by the courier. Please inspect the outer shipping seal upon receipt and report any transit damage immediately.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#1a1208] flex items-center gap-2">
              <span className="text-[#b8935a]">06.</span> Returns, Exchanges &amp; Refunds
            </h2>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-700" />
              <div className="space-y-1">
                <p className="font-semibold text-amber-800">Cosmetics Hygiene &amp; Safety Standard</p>
                <p>
                  Due to strict hygiene, sterility, and safety regulations regarding skincare and cosmetic products, opened or unsealed products cannot be returned for restock.
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm">
              If an item arrives damaged, defective, or incorrect, please notify our customer atelier within <strong>48 hours of delivery</strong> with unboxing photographs. We will immediately dispatch a complimentary replacement or issue a full refund.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#1a1208] flex items-center gap-2">
              <span className="text-[#b8935a]">07.</span> Patch Testing &amp; Allergy Disclaimer
            </h2>
            <p className="text-xs sm:text-sm">
              While Niimi formulations are hypoallergenic and dermatologically evaluated, individual skin chemistries vary. We strongly recommend performing a 24-hour patch test on the inner forearm prior to full facial application. In the rare event of irritation, discontinue use and consult a physician.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#1a1208] flex items-center gap-2">
              <span className="text-[#b8935a]">08.</span> Intellectual Property
            </h2>
            <p className="text-xs sm:text-sm">
              All branding, trade dress, master formulations, photography, website software, and creative materials on this platform are the exclusive intellectual property of Niimi Cosmetics Atelier and are protected under international copyright and trademark conventions.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-3 border-t border-[#e8d9c0] pt-6">
            <h2 className="text-xl font-serif font-bold text-[#1a1208] flex items-center gap-2">
              <span className="text-[#b8935a]">09.</span> Contact Information
            </h2>
            <p className="text-xs sm:text-sm">
              For legal inquiries, dispute consultations, or customer inquiries concerning these Terms:
            </p>
            <div className="bg-white p-5 rounded-2xl border border-[#e8d9c0] text-xs space-y-1 font-mono">
              <p className="font-sans font-bold text-[#1a1208]">Niimi Cosmetics Atelier — Customer Concierge</p>
              <p>Email: legal@niimicosmetics.com</p>
              <p>Support Hotline: +91 (022) 4890-2100</p>
              <p>Operating Hours: Monday – Saturday, 9:00 AM – 7:00 PM IST</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
