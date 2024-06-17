import { NextResponse } from "next/server";
import * as jose from "jose";

export default async function middleware(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  const token = request.cookies.get("token")?.value;

  if (path.includes("/login")) {
    if (!token) return NextResponse.next();
    try {
      const jwtSecret = process.env.JWT_SECRET_KEY;
      const encodedJwtSecret = new TextEncoder().encode(jwtSecret);
      await jose.jwtVerify(token, encodedJwtSecret);

      return NextResponse.redirect(new URL("/dashboard/berita", request.url));
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    if (!token) return NextResponse.redirect(new URL("/login", request.url));
    try {
      const jwtSecret = process.env.JWT_SECRET_KEY;
      const encodedJwtSecret = new TextEncoder().encode(jwtSecret);
      await jose.jwtVerify(token, encodedJwtSecret);

      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
