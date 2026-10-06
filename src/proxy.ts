import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const ADMIN_COOKIE_NAME = "niimi_admin_session";
const rawSecret =
  process.env.SESSION_SECRET || "90436ac83aae852ffd0684abc5c019adc94e76fcb5caa4b80749792730665765";
const secretKey = new TextEncoder().encode(rawSecret);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes (except /admin/login)
  if (pathname.startsWith("/admin")) {
    const isLoginPage = pathname === "/admin/login";
    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;

    let isAuthenticated = false;
    if (token) {
      try {
        await jwtVerify(token, secretKey, { algorithms: ["HS256"] });
        isAuthenticated = true;
      } catch {
        isAuthenticated = false;
      }
    }

    // If user is already authenticated and visits login page, redirect to admin home
    if (isLoginPage && isAuthenticated) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    // If user is not authenticated and attempts to access protected admin pages
    if (!isLoginPage && !isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export default proxy;

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
