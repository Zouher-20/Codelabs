import { ROLE } from '@prisma/client';
import { JWTPayload } from 'jose';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import AuthUtils from './app/utils/auth-utils';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    try {
        const session = await getSessionInMiddleware();
        if (!session) return LoginRedirect(request);
        return CheckRole({ request, session });
    } catch (error) {
        return LoginRedirect(request);
    }
}

function CheckRole({ session, request }: { session: JWTPayload; request: NextRequest }) {
    const pathname = request.nextUrl.pathname;

    if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (pathname.startsWith('/admin')) {
        if (session.role !== ROLE.ADMIN) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    } else {
        if (session.role === ROLE.ADMIN) {
            if (pathname.startsWith('/blogs/add-blog')) {
                return NextResponse.next();
            }
            return NextResponse.redirect(new URL('/admin', request.url));
        }
    }

    return NextResponse.next();
}

function LoginRedirect(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/login', request.url));
}

async function getSessionInMiddleware() {
    const sessionAsToken = cookies().get('session')?.value;
    if (!sessionAsToken) return null;
    const session = await AuthUtils.decryptJwt(sessionAsToken);
    return session;
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico|lab|uploads|logo-title.svg).*)'
};
