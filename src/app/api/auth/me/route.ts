import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminToken, ADMIN_COOKIE_NAME } from "@/lib/auth";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false, admin: null }, { status: 401 });
    }

    const admin = await verifyAdminToken(token);
    if (!admin) {
      return NextResponse.json({ authenticated: false, admin: null }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      admin,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Session verification error";
    return NextResponse.json({ authenticated: false, error: msg }, { status: 500 });
  }
}
