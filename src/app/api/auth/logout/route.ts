import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME } from "@/lib/auth";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(ADMIN_COOKIE_NAME);

    return NextResponse.json({
      success: true,
      message: "Successfully signed out of executive portal.",
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Logout error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
