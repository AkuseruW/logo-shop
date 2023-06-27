import { getToken } from "next-auth/jwt"
export { default } from "next-auth/middleware"
import { NextResponse, NextRequest } from 'next/server';

export const middleware = async (req: NextRequest) => {
    const session = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET
    })

    if (!session) {
        if (
            req.nextUrl.pathname.startsWith("/profile") ||
            req.nextUrl.pathname.startsWith("/dashboard") ||
            req.nextUrl.pathname.startsWith("/admin") ||
            req.nextUrl.pathname.startsWith("/favorite") ||
            req.nextUrl.pathname.startsWith("/checkout")
        ) {
            const signinUrl = new URL('/signin', req.url);
            signinUrl.searchParams.append('callbackUrl', req.nextUrl.pathname);

            return NextResponse.redirect(signinUrl);
        }
    }

    if (session?.role != 'ADMIN') {
        if (
            req.nextUrl.pathname.startsWith("/dashboard") ||
            req.nextUrl.pathname.startsWith("/admin")
        ) {
            return NextResponse.redirect(new URL('/error/forbidden-access', req.url), { status: 302 });
        }
    }


    if (session && (req.nextUrl.pathname.startsWith("/signin") || req.nextUrl.pathname.startsWith("/signup"))) {
        return NextResponse.rewrite(new URL('/profile', req.url))
    }

    return NextResponse.next();

};