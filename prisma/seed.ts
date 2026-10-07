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
    name: "ROLAND Medicated Hakka Pure Skin Water",
    tagline: "Pure Japanese Peppermint soothing barrier mist & pore water",
    category: "Serums",
    price: 56,
    originalPrice: 68,
    image: "/JUNSUHADA/JUNSUHADA/9076.jpg",
    gallery: [
      "/JUNSUHADA/JUNSUHADA/9076.jpg",
      "/JUNSUHADA/JUNSUHADA/DSC_0103.jpg",
      "/JUNSUHADA/JUNSUHADA/9078.webp",
      "/JUNSUHADA/JUNSUHADA/9074.webp",
    ],
    description: "An authentic Japanese medicated skin water infused with natural Hokkaido Hakka (peppermint) oil, dipotassium glycyrrhizate, and calming botanicals. Purifies pores, cools heated skin, and reinforces the epidermal barrier against breakouts and environmental irritation.",
    benefits: [
      "Soothes acne and cools overheated skin",
      "Shrinks enlarged pores and balances sebum",
      "Medicated formulation prevents roughness",
      "Non-sticky, instant refreshing absorption",
    ],
    ingredients: [
      "Natural Hokkaido Hakka (Peppermint) Oil",
      "Dipotassium Glycyrrhizate",
      "Centella Asiatica (Cica)",
      "Japanese Camellia Extract",
      "Sodium Hyaluronate (Multi-molecular weight)",
    ],
    howToUse: "Dispense 3-4 drops or mist generously onto clean fingertips. Gently press into face, neck, and décolletage after cleansing. Suitable for morning and evening rituals.",
    size: "150ml / 5.1 fl oz",
    skinType: "Normal, Dry, Combination, Sensitive",
    rating: 4.9,
    reviewCount: 128,
    stock: 42,
    isFeatured: true,
    isBestSeller: true,
  },
  {
    id: "hydra-botanical-moisture-mask",
    name: "DOTBYE Keana Sauna Warming Pore Scrub Mask",
    tagline: "Thermal warming enzyme peel & blackhead dissolving scrub",
    category: "Masks",
    price: 48,
    originalPrice: 58,
    image: "/JUNSUHADA/dotbye/Dotbye.jpg",
    gallery: [
      "/JUNSUHADA/dotbye/Dotbye.jpg",
      "/JUNSUHADA/dotbye/15076.webp",
      "/JUNSUHADA/dotbye/20486.webp",
      "/JUNSUHADA/dotbye/15106.webp",
    ],
    description: "Recreates a Japanese sauna experience right in your routine. Gently heats upon skin contact to melt stubborn sebum plugs, keratotic micro-capsules, and impurities with natural papain enzymes and sea minerals.",
    benefits: [
      "Self-warming thermal activation opens stubborn pores",
      "Dissolves hardened blackheads without harsh stripping",
      "Smoothing enzyme polish reveals poreless baby-soft texture",
      "Enriched with thermal mineral spring hydration",
    ],
    ingredients: [
      "Thermal Warming Complex",
      "Papain Fruit Enzyme",
      "Moroccan Clay & Japanese Sea Mud",
      "Squalane (Plant-derived)",
      "Ceramide NP, AP, EOP",
    ],
    howToUse: "Smooth a generous layer over clean, dry or damp skin. Gently massage for 1 minute as warming sensation activates, leave on for 5 minutes, then rinse clean with lukewarm water.",
    size: "100g / 3.5 oz",
    skinType: "Dry, Dehydrated, Normal, Sensitive, Pore-prone",
    rating: 4.8,
    reviewCount: 94,
    stock: 35,
    isFeatured: true,
    isBestSeller: true,
  },
  {
    id: "pure-zen-balancing-cleanser",
    name: "LATTE BOTANICAL Plant Cleanse Trio",
    tagline: "Botanical milk, gel & deep cleansing oil trio with herbal extracts",
    category: "Cleansers",
    price: 38,
    originalPrice: 45,
    image: "/JUNSUHADA/Latte Botanical/latte_3sku.jpg",
    gallery: [
      "/JUNSUHADA/Latte Botanical/latte_3sku.jpg",
      "/JUNSUHADA/Latte Botanical/latte_4sku.jpg",
      "/JUNSUHADA/Latte Botanical/new_latte_2sku_b.jpg",
      "/JUNSUHADA/Latte Botanical/33964.jpg",
    ],
    description: "Indulge in a luxurious botanical milk wash crafted with cold-pressed plant milks, sweet almond oil, and soothing herbal essences. Effortlessly dissolves waterproof makeup and sunscreen while delivering silky, cushiony comfort.",
    benefits: [
      "Silken milky texture rinses 100% clean with zero residue",
      "Triple plant milk blend protects delicate acid mantle",
      "Melts waterproof cosmetics and daily sunscreen instantly",
      "Leaves skin deeply nourished and velvety soft",
    ],
    ingredients: [
      "Botanical Herbal Milk Complex",
      "Sweet Almond Oil",
      "Rice Germ Oil",
      "Hydrolyzed Silk Protein",
      "Chamomile & Calendula Extract",
      "Tocopherol (Vitamin E)",
    ],
    howToUse: "Massage 2-3 pumps onto dry or damp skin using circular upward motions. Emulsify with warm water and rinse clean.",
    size: "180ml / 6.1 fl oz",
    skinType: "All Skin Types, Reactive & Sensitive",
    rating: 4.9,
    reviewCount: 112,
    stock: 58,
    isFeatured: false,
    isBestSeller: true,
  },
  {
    id: "bright-bloom-caffeine-eye-repair",
    name: "DOTBYE Keana Ichigo Strawberry Pore Cleansing Oil",
    tagline: "Japanese blackhead & sebum melting botanical oil with strawberry AHA",
    category: "Eye Care",
    price: 64,
    originalPrice: 75,
    image: "/JUNSUHADA/dotbye/1.png",
    gallery: [
      "/JUNSUHADA/dotbye/1.png",
      "/JUNSUHADA/dotbye/2.png",
      "/JUNSUHADA/dotbye/3.png",
      "/JUNSUHADA/dotbye/4.png",
    ],
    description: "Targeted Japanese refining oil formulated with natural strawberry fruit seed polyphenols, AHA fruit acids, and nourishing botanical lipids. Flawlessly clears orbital area, melts stubborn makeup, and dissolves pore sebum with gentle elegance.",
    benefits: [
      "Strawberry seed AHA melts stubborn blackheads and sebum plugs",
      "Gentle enough for delicate orbital eye zone and waterproof mascara",
      "Rich in natural antioxidants that illuminate dull skin tone",
      "Rinses ultra-clean leaving skin silky smooth without oily residue",
    ],
    ingredients: [
      "Japanese Strawberry (Fragaria Chiloensis) Seed Oil",
      "Jojoba Seed Oil",
      "Camellia Japonica Seed Oil",
      "Fruit AHA Acid Complex",
      "Squalane",
      "Vitamin E (Tocopherol)",
    ],
    howToUse: "Dispense 2 pumps onto dry hands. Gently massage over face, eye contours, and nose. Emulsify with a few drops of water until milky, then rinse thoroughly.",
    size: "150ml / 5.1 fl oz",
    skinType: "All Skin Types",
    rating: 4.7,
    reviewCount: 76,
    stock: 29,
    isFeatured: true,
    isBestSeller: false,
  },
  {
    id: "sakura-velvet-day-cream",
    name: "SAVON DORON Daily Esthe Clay Face Wash Trio",
    tagline: "Mineral volcanic clay, vita-vitamin C & bamboo charcoal micro-foam",
    category: "Creams & Balms",
    price: 62,
    originalPrice: 72,
    image: "/JUNSUHADA/Savon Doron/DSC08403.jpg",
    gallery: [
      "/JUNSUHADA/Savon Doron/DSC08403.jpg",
      "/JUNSUHADA/Savon Doron/41278.jpg",
      "/JUNSUHADA/Savon Doron/DSC08404re.jpg",
    ],
    description: "Daily aesthetic clay therapy straight from Japan. Three specialized formulations: Pure White Clay for ultra-hydration, Vita Vitamin Clay for radiant glow, and Charcoal Mud for deep pore purification. Envelops skin in dense marshmallow foam.",
    benefits: [
      "Dense marshmallow micro-foam absorbs impurities from deep pores",
      "Seven natural clays from France, Okinawa, and Morocco",
      "Infused with Vitamin C derivatives and moisture ceramides",
      "Delivers esthetician spa-grade softness with every wash",
    ],
    ingredients: [
      "Natural Marine Mud & White Kaolin Clay",
      "Vita Vitamin C Derivatives (Ascorbyl Glucoside)",
      "Bamboo Charcoal Micro-particles",
      "Ceramide Complex (NP, AP, EOP)",
      "Hydrolyzed Marine Collagen",
    ],
    howToUse: "Squeeze a 2cm pearl onto palms or foaming net. Work into a dense cushion foam with water, gently massage across face, then rinse thoroughly with lukewarm water.",
    size: "120g x 3 Tubes",
    skinType: "Normal, Dry, Sensitive, Combination",
    rating: 4.9,
    reviewCount: 165,
    stock: 38,
    isFeatured: false,
    isBestSeller: true,
  },
  {
    id: "imperial-golden-ritual-set",
    name: "JUNSUHADA x NIIMI Grand Master Ritual Set",
    tagline: "Complete Japanese botanical spa ritual: Hakka Water, Clay Wash, Cleansing Oil & Mask",
    category: "Ritual Sets",
    price: 178,
    originalPrice: 206,
    image: "/JUNSUHADA/Latte Botanical/latte_4sku.jpg",
    gallery: [
      "/JUNSUHADA/Latte Botanical/latte_4sku.jpg",
      "/JUNSUHADA/Savon Doron/41278.jpg",
      "/JUNSUHADA/JUNSUHADA/9076.jpg",
      "/JUNSUHADA/dotbye/Dotbye.jpg",
      "/JUNSUHADA/dotbye/1.png",
    ],
    description: "The crown jewel Japanese beauty curation. Includes full-size Roland Medicated Hakka Skin Water, Latte Botanical Cleansing lineup with spa brush, Savon Doron Daily Clay Wash trio with spa headband, and Dotbye Strawberry Cleansing Oil, presented in a handcrafted collection box.",
    benefits: [
      "Comprehensive Japanese botanical AM/PM skincare regimen",
      "Includes exclusive spa headband & facial massage brush",
      "Harmonized authentic formulations made in Japan",
      "Save $28 compared to individual product purchases",
    ],
    ingredients: [
      "Comprehensive authentic Japanese botanical extracts across all four atelier lines.",
    ],
    howToUse: "Follow the master multi-brand ritual: Melt makeup with Dotbye Strawberry Oil, deep cleanse with Savon Doron Clay Foam or Latte Botanical Milk, treat with Dotbye Warming Mask, and mist with Hakka Peppermint Skin Water.",
    size: "Complete 4-Brand Luxury Collection",
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
        name: "ROLAND Medicated Hakka Pure Skin Water",
        price: 56,
        quantity: 1,
        image: "/JUNSUHADA/JUNSUHADA/9076.jpg",
        size: "150ml / 5.1 fl oz",
      },
      {
        productId: "hydra-botanical-moisture-mask",
        name: "DOTBYE Keana Sauna Warming Pore Scrub Mask",
        price: 48,
        quantity: 1,
        image: "/JUNSUHADA/dotbye/Dotbye.jpg",
        size: "100g / 3.5 oz",
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
        name: "JUNSUHADA x NIIMI Grand Master Ritual Set",
        price: 178,
        quantity: 1,
        image: "/JUNSUHADA/Latte Botanical/latte_4sku.jpg",
        size: "Complete 4-Brand Set",
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

  // 1. Seed Customer Accounts in dedicated Customer table
  const bcrypt = await import("bcryptjs");
  const customerPassword = "Customer@2026";
  const hashedCustomerPassword = await bcrypt.hash(customerPassword, 10);
  const userPassword = "User@2026";
  const hashedUserPassword = await bcrypt.hash(userPassword, 10);

  const customerElena = await prisma.customer.upsert({
    where: { email: "elena.rostova@luxurybeauty.com" },
    update: {
      password: hashedCustomerPassword,
      name: "Elena Rostova",
      phone: "+91 98765 43210",
      address: "402 Omkar Heights, Nariman Point",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400021",
      country: "India",
    },
    create: {
      email: "elena.rostova@luxurybeauty.com",
      password: hashedCustomerPassword,
      name: "Elena Rostova",
      phone: "+91 98765 43210",
      address: "402 Omkar Heights, Nariman Point",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400021",
      country: "India",
    },
  });

  const customerDemo = await prisma.customer.upsert({
    where: { email: "customer@niimicosmetics.com" },
    update: {
      password: hashedCustomerPassword,
      name: "Elena Rostova",
      phone: "+91 98765 43210",
      address: "402 Omkar Heights, Nariman Point",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400021",
      country: "India",
    },
    create: {
      email: "customer@niimicosmetics.com",
      password: hashedCustomerPassword,
      name: "Elena Rostova",
      phone: "+91 98765 43210",
      address: "402 Omkar Heights, Nariman Point",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400021",
      country: "India",
    },
  });

  await prisma.customer.upsert({
    where: { email: "user@niimicosmetics.com" },
    update: {
      password: hashedUserPassword,
      name: "Aoi Tanaka",
      phone: "+91 98112 34567",
      address: "B-12 Vasant Vihar, Sector 4",
      city: "New Delhi",
      state: "Delhi",
      postalCode: "110057",
      country: "India",
    },
    create: {
      email: "user@niimicosmetics.com",
      password: hashedUserPassword,
      name: "Aoi Tanaka",
      phone: "+91 98112 34567",
      address: "B-12 Vasant Vihar, Sector 4",
      city: "New Delhi",
      state: "Delhi",
      postalCode: "110057",
      country: "India",
    },
  });
  console.log("Successfully seeded Customer accounts into PostgreSQL.");

  // 2. Seed Orders linked to customers
  for (const o of INITIAL_ORDERS) {
    const { items, ...orderData } = o;
    const linkedCustomerId =
      o.customerEmail === "elena.rostova@luxurybeauty.com"
        ? customerElena.id
        : o.customerEmail === "customer@niimicosmetics.com"
        ? customerDemo.id
        : undefined;

    await prisma.order.upsert({
      where: { id: o.id },
      update: {
        ...orderData,
        customerId: linkedCustomerId,
      },
      create: {
        ...orderData,
        customerId: linkedCustomerId,
        items: {
          create: items,
        },
      },
    });
  }

  // Also create a past order for customer@niimicosmetics.com so the dashboard has rich data
  await prisma.order.upsert({
    where: { id: "ORD-9304" },
    update: {
      customerName: "Elena Rostova",
      customerEmail: "customer@niimicosmetics.com",
      customerPhone: "+91 98765 43210",
      customerId: customerDemo.id,
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
      paymentMethod: "upi",
      paymentStatus: "paid",
      orderStatus: "delivered",
      notes: "Fragile packaging requested",
      estimatedDelivery: "2026-10-02",
    },
    create: {
      id: "ORD-9304",
      customerName: "Elena Rostova",
      customerEmail: "customer@niimicosmetics.com",
      customerPhone: "+91 98765 43210",
      customerId: customerDemo.id,
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
      paymentMethod: "upi",
      paymentStatus: "paid",
      orderStatus: "delivered",
      notes: "Fragile packaging requested",
      estimatedDelivery: "2026-10-02",
      items: {
        create: [
          {
            productId: "prism-aha-bha-glow-serum",
            name: "ROLAND Medicated Hakka Pure Skin Water",
            price: 56,
            quantity: 1,
            image: "/JUNSUHADA/JUNSUHADA/9076.jpg",
            size: "150ml / 5.1 fl oz",
          },
          {
            productId: "hydra-botanical-moisture-mask",
            name: "DOTBYE Keana Sauna Warming Pore Scrub Mask",
            price: 48,
            quantity: 1,
            image: "/JUNSUHADA/dotbye/Dotbye.jpg",
            size: "100g / 3.5 oz",
          },
        ],
      },
    },
  });

  // And another active order for customer@niimicosmetics.com
  await prisma.order.upsert({
    where: { id: "ORD-9452" },
    update: {
      customerName: "Elena Rostova",
      customerEmail: "customer@niimicosmetics.com",
      customerPhone: "+91 98765 43210",
      customerId: customerDemo.id,
      shippingAddress: "402 Omkar Heights, Nariman Point",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400021",
      country: "India",
      subtotal: 178,
      shippingFee: 0,
      discount: 0,
      total: 178,
      paymentMethod: "cod",
      paymentStatus: "pending",
      orderStatus: "processing",
      notes: "Evening delivery preferred",
      estimatedDelivery: "2026-10-08",
    },
    create: {
      id: "ORD-9452",
      customerName: "Elena Rostova",
      customerEmail: "customer@niimicosmetics.com",
      customerPhone: "+91 98765 43210",
      customerId: customerDemo.id,
      shippingAddress: "402 Omkar Heights, Nariman Point",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400021",
      country: "India",
      subtotal: 178,
      shippingFee: 0,
      discount: 0,
      total: 178,
      paymentMethod: "cod",
      paymentStatus: "pending",
      orderStatus: "processing",
      notes: "Evening delivery preferred",
      estimatedDelivery: "2026-10-08",
      items: {
        create: [
          {
            productId: "imperial-golden-ritual-set",
            name: "JUNSUHADA x NIIMI Grand Master Ritual Set",
            price: 178,
            quantity: 1,
            image: "/JUNSUHADA/Latte Botanical/latte_4sku.jpg",
            size: "Complete 4-Brand Set",
          },
        ],
      },
    },
  });

  console.log("Successfully seeded orders into PostgreSQL.");

  // 3. Seed Default Admin Account
  const adminEmail = process.env.ADMIN_DEFAULT_EMAIL || "admin@niimicosmetics.com";
  const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD || "Admin@Niimi2026";
  const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedAdminPassword,
      name: "Niimi Executive Admin",
      role: "superadmin",
    },
    create: {
      email: adminEmail,
      password: hashedAdminPassword,
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
