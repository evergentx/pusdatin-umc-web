import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that require authentication
const protectedRoutes = [
    "/dashboard",
    "/helpdesk/riwayat",
    "/aset/riwayat",
    "/profil",
];

// Routes that should redirect to dashboard if already logged in
const authRoutes = ["/login", "/register", "/lupa-password"];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check for auth token in cookies
    const token = request.cookies.get("auth-token")?.value;
    const isAuthenticated = !!token;

    // Check if current path is protected
    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    // Check if current path is auth route
    const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

    // Redirect to login if accessing protected route without auth
    if (isProtectedRoute && !isAuthenticated) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Redirect to dashboard if accessing auth routes while logged in
    if (isAuthRoute && isAuthenticated) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)",
    ],
};
