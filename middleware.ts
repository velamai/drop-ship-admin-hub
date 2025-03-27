
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth_token")?.value;
  const isAuthenticated = !!token;

  // Public routes accessible without authentication
  const isPublicRoute = pathname === "/login";
  
  // If user is not authenticated and tries to access a protected route
  if (!isAuthenticated && !isPublicRoute) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If user is authenticated and tries to access login or home page
  if (isAuthenticated && (pathname === "/login" || pathname === "/")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Specify which routes should be processed by the middleware
export const config = {
  matcher: [
    // Required for auth protection
    "/dashboard/:path*",
    "/orders/:path*",
    "/addresses/:path*",
    // Required for redirect when logged in
    "/login",
    "/",
  ],
};
