import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const token = await getToken({
        req, 
        secret: process.env.NEXTAUTH_SECRET
    });

    const role = token?.role?.toLowerCase();

    const protectedRoute = ['/admin', '/dev'];
    const isProtected = protectedRoute.some((route) => pathname.startsWith(route));

    const authPage = [
        "/auth/"
    ];

    if (role && authPage.some((auth) => pathname.startsWith(auth))) {
        if (role === 'admin') {
            return NextResponse.redirect(new URL("/admin/dashboard", req.url));
        } else if (role === 'developer') {
            return NextResponse.redirect(new URL("/dev/dashboard", req.url));
        } else {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    if (!token && isProtected) {
        const url = new URL("/auth/login", req.url);
        url.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/auth/login', '/auth/register', '/admin/:path', '/dev/:path'],
}