import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const INITIAL_PRODUCTS = [
  {
    id: "prism-aha-bha-glow-serum",
    name: "PRISM AHA + BHA Glow Serum",
    tagline: "Cellular resurfacing & luminous glass skin elixir",
    category: "Serums",
    price: 56,
    originalPrice: 68,
    image: "/cosmetic1.avif",
    gallery: ["/cosmetic1.avif", "/cream_swatch.png", "/cosmetic2.avif"],
    description: "Experience the ultimate skin renewal. Formulated with fermented rice filtrate, Japanese camellia essence, and micro-dosed fruit AHAs, this weightless serum dissolves surface impurities and restores porcelain smoothness without irritation.",
    benefits: [
      "Visibly shrinks enlarged pores and refines texture",
      "Restores natural skin barrier moisture retention",
      "Promotes crystal clear radiance and collagen vitality",
      "Non-comedogenic and dermatologically tested for sensitive skin",
    ],
    ingredients: [
      "Camellia Japonica Seed Oil",
      "Fermented Rice Filtrate (Galactomyces)",
      "Glycolic & Lactic Acid 5%",
      "Sodium Hyaluronate (Multi-molecular weight)",
      "Green Tea (Camellia Sinensis) Leaf Extract",
      "Centella Asiatica",
    ],
    howToUse: "Dispense 3-4 drops onto clean fingertips. Gently press into face, neck, and décolletage after cleansing and before heavier creams. Suitable for morning and evening rituals.",
    size: "50ml / 1.7 fl oz",
    skinType: "Normal, Dry, Combination, Sensitive",
    rating: 4.9,
    reviewCount: 128,
    stock: 42,
    isFeatured: true,
    isBestSeller: true,
  },
  {
    id: "hydra-botanical-moisture-mask",
    name: "HYDRA BOTANICAL Intense Moisture Mask",
    tagline: "Deep-sea mineral replenishment & plumping veil",
    category: "Masks",
    price: 48,
    originalPrice: 58,
    image: "/cosmetic2.avif",
    gallery: ["/cosmetic2.avif", "/cream_on_hand.png", "/cosmetic3.avif"],
    description: "Immerse your skin in luxury. Infused with wild green tea botanical extracts and deep-sea Okinawa mineral water, this mask delivers immediate calming relief and lasting 72-hour moisture plumping.",
    benefits: [
      "Instant 82% surge in skin hydration within 15 minutes",
      "Soothes redness, environmental stress, and UV dehydration",
      "Leaves skin bouncy, supple, and glowing with inner health",
      "Rich cream-gel texture that absorbs without stickiness",
    ],
    ingredients: [
      "Okinawa Deep Sea Water",
      "Wild Uji Matcha Green Tea Extract",
      "Squalane (Plant-derived)",
      "Tremella Fuciformis (Snow Mushroom) Polysaccharide",
      "Ceramide NP, AP, EOP",
      "Allantoin",
    ],
    howToUse: "Smooth a generous layer over clean skin. Leave on for 15-20 minutes, then rinse with lukewarm water or tissue off excess for overnight slugging.",
    size: "75ml / 2.5 fl oz",
    skinType: "Dry, Dehydrated, Normal, Sensitive",
    rating: 4.8,
    reviewCount: 94,
    stock: 35,
    isFeatured: true,
    isBestSeller: true,
  },
  {
    id: "pure-zen-balancing-cleanser",
    name: "PURE ZEN Balancing Cream Cleanser",
    tagline: "Silken milky cleanser with pH-respecting botanical oils",
    category: "Cleansers",
    price: 38,
    originalPrice: 45,
    image: "/cosmetic3.avif",
    gallery: ["/cosmetic3.avif", "/cosmetic4.avif", "/cosmetic1.avif"],
    description: "Gently wash away impurities and waterproof makeup without disrupting your skin's acid mantle. A rich, milky texture crafted from rice bran water and cold-pressed botanical oils that leaves skin pristine yet silky soft.",
    benefits: [
      "Effortlessly dissolves stubborn makeup and pollution particles",
      "Maintains optimal pH 5.5 skin equilibrium",
      "Zero tightness, stinging, or residue",
      "Enriched with nourishing Vitamin E and rice peptides",
    ],
    ingredients: [
      "Rice Bran (Oryza Sativa) Water",
      "Jojoba Seed Oil",
      "Caprylic/Capric Triglyceride",
      "Hydrolyzed Silk Protein",
      "Chamomile (Matricaria) Flower Extract",
      "Tocopherol (Vitamin E)",
    ],
    howToUse: "Massage 2-3 pumps onto dry or damp skin using circular upward motions. Emulsify with warm water and rinse clean.",
    size: "150ml / 5.1 fl oz",
    skinType: "All Skin Types, Reactive & Sensitive",
    rating: 4.9,
    reviewCount: 112,
    stock: 58,
    isFeatured: false,
    isBestSeller: true,
  },
  {
    id: "bright-bloom-caffeine-eye-repair",
    name: "BRIGHT BLOOM Caffeine Eye Repair",
    tagline: "Triple peptide awakening elixir for dark circles & puffiness",
    category: "Eye Care",
    price: 64,
    originalPrice: 75,
    image: "/cosmetic4.avif",
    gallery: ["/cosmetic4.avif", "/cream_swatch.png", "/cosmetic1.avif"],
    description: "Revitalize tired eyes with an infusion of high-purity Japanese green coffee extract, hexapeptides, and niacinamide. Melts instantly into the delicate orbital zone to smooth fine lines and illuminate dark under-eye shadows.",
    benefits: [
      "Visibly reduces morning puffiness in under 10 minutes",
      "Fades dark circles and shadow depressions",
      "Strengthens delicate eye contour skin elasticity",
      "Cooling applicator sensation for refreshed eyes",
    ],
    ingredients: [
      "Japanese Green Coffee Caffeine 3%",
      "Palmitoyl Tripeptide-5",
      "Niacinamide (Vitamin B3) 2%",
      "Bakuchiol (Natural Retinol Alternative)",
      "Hydrolized Marine Collagen",
      "Arnica Montana Extract",
    ],
    howToUse: "Dot a pea-sized drop along the orbital bone using your ring finger. Gently tap from inner corner outward until fully absorbed. Use day and night.",
    size: "20ml / 0.7 fl oz",
    skinType: "All Skin Types",
    rating: 4.7,
    reviewCount: 76,
    stock: 29,
    isFeatured: true,
    isBestSeller: false,
  },
  {
    id: "sakura-velvet-day-cream",
    name: "SAKURA VELVET Dew Moisture Cream",
    tagline: "Whipped barrier repair with cherry blossom & ceramides",
    category: "Creams & Balms",
    price: 62,
    originalPrice: 72,
    image: "/cream_swatch.png",
    gallery: ["/cream_swatch.png", "/cream_on_hand.png", "/cosmetic2.avif"],
    description: "A velvety, cloud-soft emulsion infused with Yoshino cherry blossom flavonoids and five essential ceramides. Envelops skin in breathable comfort, locking in hydration while defending against daily urban stressors.",
    benefits: [
      "Locks in moisture for a dewy, glass-like finish",
      "Fortifies lipid barrier to prevent water loss",
      "Subtle natural radiance without silicone greasiness",
      "Pairs flawlessly under cosmetics as a smooth primer",
    ],
    ingredients: [
      "Prunus Yedoensis (Sakura) Leaf Extract",
      "5-Ceramide Complex (NP, NS, EOS, EOP, AP)",
      "Shea Butter Ethyl Esters",
      "Polyglutamic Acid",
      "Panthenol (Vitamin B5)",
      "Squalane",
    ],
    howToUse: "Warm a nickel-sized amount between palms and press gently into face and neck as the final sealing step in your skincare ritual.",
    size: "60ml / 2.0 fl oz",
    skinType: "Normal, Dry, Sensitive",
    rating: 4.9,
    reviewCount: 165,
    stock: 38,
    isFeatured: false,
    isBestSeller: true,
  },
  {
    id: "imperial-golden-ritual-set",
    name: "IMPERIAL GOLDEN Full Skincare Ritual",
    tagline: "Complete 4-step collector's ritual set in luxury gift box",
    category: "Ritual Sets",
    price: 178,
    originalPrice: 206,
    image: "/cosmetic_product_bg.png",
    gallery: ["/cosmetic_product_bg.png", "/cosmetic1.avif", "/cosmetic2.avif", "/cosmetic3.avif"],
    description: "The quintessential Niimi journey. Includes full-size PRISM Glow Serum, HYDRA BOTANICAL Mask, PURE ZEN Cleanser, and BRIGHT BLOOM Eye Repair, presented in a handcrafted embossed keepsake ritual casket.",
    benefits: [
      "Complete comprehensive AM/PM routine",
      "Harmonized formulas engineered to amplify each other's efficacy",
      "Save $28 compared to individual product purchases",
      "Includes complimentary silk ritual application headband",
    ],
    ingredients: [
      "Includes all primary ingredients from our 4 signature master formulations.",
    ],
    howToUse: "Follow the four-fold Niimi ritual: Cleanse with Zen Cleanser, renew with Prism Serum, awaken with Eye Repair, and hydrate with Botanical Mask.",
    size: "4 Full-Size Products (50ml + 75ml + 150ml + 20ml)",
    skinType: "All Skin Types",
    rating: 5.0,
    reviewCount: 89,
    stock: 16,
    isFeatured: true,
    isBestSeller: true,
  },
];

const INITIAL_ORDERS = [
  {
    id: "ORD-7821",
    customerName: "Elena Rostova",
    customerEmail: "elena.rostova@luxurybeauty.com",
    customerPhone: "+91 98765 43210",
    shippingAddress: "402 Omkar Heights, Nariman Point",
    city: "Mumbai",
    state: "Maharashtra",
    postalCode: "400021",
    country: "India",
    subtotal: 104,
    shippingFee: 0,
    discount: 15.6,
    total: 88.4,
    couponCode: "NIIMI15",
    paymentMethod: "cod",
    paymentStatus: "paid",
    orderStatus: "delivered",
    notes: "",
    estimatedDelivery: "2026-10-04",
    items: [
      {
        productId: "prism-aha-bha-glow-serum",
        name: "PRISM AHA + BHA Glow Serum",
        price: 56,
        quantity: 1,
        image: "/cosmetic1.avif",
        size: "50ml / 1.7 fl oz",
      },
      {
        productId: "hydra-botanical-moisture-mask",
        name: "HYDRA BOTANICAL Intense Moisture Mask",
        price: 48,
        quantity: 1,
        image: "/cosmetic2.avif",
        size: "75ml / 2.5 fl oz",
      },
    ],
  },
  {
    id: "ORD-8490",
    customerName: "Aarav Sharma",
    customerEmail: "aarav.sharma@gmail.com",
    customerPhone: "+91 98112 34567",
    shippingAddress: "B-12 Vasant Vihar, Sector 4",
    city: "New Delhi",
    state: "Delhi",
    postalCode: "110057",
    country: "India",
    subtotal: 178,
    shippingFee: 0,
    discount: 0,
    total: 178,
    couponCode: "",
    paymentMethod: "upi",
    paymentStatus: "paid",
    orderStatus: "processing",
    notes: "",
    estimatedDelivery: "2026-10-07",
    items: [
      {
        productId: "imperial-golden-ritual-set",
        name: "IMPERIAL GOLDEN Full Skincare Ritual",
        price: 178,
        quantity: 1,
        image: "/cosmetic_product_bg.png",
        size: "4 Full-Size Products",
      },
    ],
  },
];

async function main() {
  console.log("Seeding database directly to PostgreSQL via Prisma...");

  for (const p of INITIAL_PRODUCTS) {
    await prisma.product.upsert({
      where: { id: p.id },
      update: p,
      create: p,
    });
  }
  console.log(`Successfully seeded ${INITIAL_PRODUCTS.length} products into PostgreSQL.`);

  for (const o of INITIAL_ORDERS) {
    const { items, ...orderData } = o;
    await prisma.order.upsert({
      where: { id: o.id },
      update: orderData,
      create: {
        ...orderData,
        items: {
          create: items,
        },
      },
    });
  }
  console.log(`Successfully seeded ${INITIAL_ORDERS.length} orders into PostgreSQL.`);

  // Seed Default Admin Account
  const bcrypt = await import("bcryptjs");
  const adminEmail = process.env.ADMIN_DEFAULT_EMAIL || "admin@niimicosmetics.com";
  const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD || "Admin@Niimi2026";
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
      name: "Niimi Executive Admin",
      role: "superadmin",
    },
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: "Niimi Executive Admin",
      role: "superadmin",
    },
  });
  console.log(`Successfully seeded Admin account (${adminEmail}) into PostgreSQL.`);
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
