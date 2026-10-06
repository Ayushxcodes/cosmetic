import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { createAdminToken, ADMIN_COOKIE_NAME } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, phone } = body;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide your full name (minimum 2 characters)." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!password || typeof password !== "string" || password.length < 6) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if account already exists in Customer or Admin tables
    const [existingCustomer, existingAdmin] = await Promise.all([
      prisma.customer.findUnique({ where: { email: normalizedEmail } }),
      prisma.admin.findUnique({ where: { email: normalizedEmail } }),
    ]);

    if (existingCustomer || existingAdmin) {
      return NextResponse.json(
        { success: false, error: "An account with this email address already exists. Please log in instead." },
        { status: 409 }
      );
    }

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new customer in PostgreSQL
    const newCustomer = await prisma.customer.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        phone: phone && typeof phone === "string" ? phone.trim() : null,
        country: "India",
      },
    });

    // Retroactively link any past orders placed with this email address
    try {
      await prisma.order.updateMany({
        where: { customerEmail: normalizedEmail, customerId: null },
        data: { customerId: newCustomer.id },
      });
    } catch (orderLinkErr) {
      console.warn("Could not retroactively link orders:", orderLinkErr);
    }

    // Generate signed JWT session token
    const customerPayload = {
      id: newCustomer.id,
      email: newCustomer.email,
      name: newCustomer.name,
      role: "customer",
    };
    const token = await createAdminToken(customerPayload);

    // Set secure HTTP-only session cookie
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({
      success: true,
      customer: customerPayload,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Registration failed";
    console.error("Signup API error:", msg);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while creating your account. Please try again." },
      { status: 500 }
    );
  }
}
