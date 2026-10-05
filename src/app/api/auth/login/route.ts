import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  validateAdminCredentials,
  createAdminToken,
  ADMIN_COOKIE_NAME,
} from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    const admin = await validateAdminCredentials(email, password);

    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Invalid executive credentials. Access denied." },
        { status: 401 }
      );
    }



    // Generate signed JWT session token
    const token = await createAdminToken(admin);

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
      admin,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Authentication failed";
    console.error("Login API error:", msg);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred during authentication." },
      { status: 500 }
    );
  }
}
