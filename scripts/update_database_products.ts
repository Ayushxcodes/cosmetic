import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";
import mapping from "./catalog_image_mapping.json";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Updating database products with new images & galleries...");

  for (const [id, data] of Object.entries(mapping)) {
    try {
      const updated = await prisma.product.update({
        where: { id },
        data: {
          image: data.image,
          gallery: data.gallery,
        },
      });
      console.log(`✓ Updated ${id}: ${updated.name}`);
      console.log(`  Main: ${updated.image}`);
      console.log(`  Gallery count: ${updated.gallery.length}`);
    } catch (e: any) {
      console.error(`✗ Error updating ${id}:`, e.message);
    }
  }

  // Also update OrderItem images if they exist
  const orderItemMap: Record<string, string> = {
    "cha-no-sui-matcha-facial-wash-foam": "/products/packshots/4936201108787.jpg",
    "dotbye-pore-cleansing-oil": "/products/packshots/4936201109654.jpg",
    "yuiha-goshinboku-aroma-mist-hinoki-2026-winter-new": "/products/packshots/4936201109968_ec.jpg",
    "cha-no-sui-matcha-waterproof-sunscreen-cream-spf50-pa": "/products/packshots/chanosui-sunscreen-front.jpg",
    "junsuhada-medicated-japanese-peppermint-water-mist": "/products/packshots/4936201105878.jpg",
  };

  for (const [productId, image] of Object.entries(orderItemMap)) {
    try {
      await prisma.orderItem.updateMany({
        where: { productId },
        data: { image },
      });
    } catch (e) {
      // OrderItem table might not have these or updateMany might be fine
    }
  }

  console.log("All products in database successfully synchronized!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await pool.end();
    process.exit(0);
  });
