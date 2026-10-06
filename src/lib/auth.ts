import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export const ADMIN_COOKIE_NAME = "niimi_admin_session";

const rawSecret =
  process.env.SESSION_SECRET || "default_niimi_cosmetics_admin_secret_key_2026_super_secure!";
const secretKey = new TextEncoder().encode(rawSecret);

export interface AdminPayload {
  id: string;
  email: string;
  name: string;
  role: string;
}

/**
 * Signs and encrypts an Admin session JWT token valid for 7 days
 */
export async function createAdminToken(payload: AdminPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);
}

/**
 * Verifies and decodes an Admin session JWT token
 */
export async function verifyAdminToken(token: string | undefined): Promise<AdminPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: ["HS256"],
    });

    return {
      id: payload.id as string,
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as string,
    };
  } catch {
    return null;
  }
}

/**
 * Validates admin credentials against PostgreSQL database
 */
export async function validateAdminCredentials(
  email: string,
  plainTextPassword: string
): Promise<AdminPayload | null> {
  try {
    const normalizedEmail = email.trim().toLowerCase();

    // 1. Check Customer table first
    const customer = await prisma.customer.findUnique({
      where: { email: normalizedEmail },
    });

    if (customer) {
      const isCustomerValid = await bcrypt.compare(plainTextPassword, customer.password);
      if (isCustomerValid) {
        return {
          id: customer.id,
          email: customer.email,
          name: customer.name,
          role: "customer",
        };
      }
    }

    // 2. Check Admin table
    const admin = await prisma.admin.findUnique({
      where: { email: normalizedEmail },
    });

    if (!admin) {
      return null;
    }

    const isValid = await bcrypt.compare(plainTextPassword, admin.password);
    if (!isValid) {
      return null;
    }

    return {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Authentication error in validateAdminCredentials:", msg);
    return null;
  }
}



