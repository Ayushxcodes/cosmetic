import path from "path";
import dotenv from "dotenv";

// Explicitly load .env from project root in case Turbopack dev server was started before .env was created
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

declare global {
  var prisma: PrismaClient | undefined;
  var prismaUrl: string | undefined;
  var prismaPool: Pool | undefined;
}

const connectionString = process.env.DATABASE_URL;

if (
  !global.prisma ||
  global.prismaUrl !== connectionString ||
  !("admin" in (global.prisma ?? {}))
) {
  if (global.prismaPool) {
    try {
      global.prismaPool.end();
    } catch {
      // ignore
    }
  }
  const pool = new Pool({
    connectionString,
  });
  const adapter = new PrismaPg(pool);
  global.prismaPool = pool;
  global.prismaUrl = connectionString;
  global.prisma = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });
}


export const prisma = global.prisma;
export default prisma;

