import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET || "fallbacksecret";
const key = new TextEncoder().encode(secretKey);

export async function middleware(request) {
  const sessionCookie = request.cookies.get("session")?.value;
  const { pathname } = request.nextUrl;

  const isProtected = pathname.startsWith("/events") || pathname.startsWith("/portal") || pathname.startsWith("/admin");
  const isAdminRoute = pathname.startsWith("/admin");

  if (isProtected) {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/register", request.url));
    }
    try {
      const { payload } = await jwtVerify(sessionCookie, key, {
        algorithms: ["HS256"],
      });
      if (isAdminRoute && payload.role !== "admin") {
        return NextResponse.redirect(new URL("/events", request.url));
      }
    } catch (e) {
      return NextResponse.redirect(new URL("/register", request.url));
    }
  }

  // Redirect logged in users away from login/register
  if ((pathname === "/login" || pathname === "/register") && sessionCookie) {
      try {
          const { payload } = await jwtVerify(sessionCookie, key, {
            algorithms: ["HS256"],
          });
          if (payload.role === "admin") {
              return NextResponse.redirect(new URL("/admin", request.url));
          } else {
              return NextResponse.redirect(new URL("/events", request.url));
          }
      } catch(e) {}
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/events/:path*", "/admin/:path*", "/portal/:path*", "/login", "/register"],
};
