import { ROLE } from '@prisma/client';
import { JWTPayload } from 'jose';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getSession } from './app/api/(modules)/auth/service/actions';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.redirect(new URL('/login', request.url));
    return CheckRole({ request, session });
}
function CheckRole({ session, request }: { session: JWTPayload; request: NextRequest }) {
    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (session.role !== ROLE.ADMIN) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    } else if (!request.nextUrl.pathname.includes('/admin')) {
        if (session.role === ROLE.ADMIN) {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/((?!api|login|register|_next/static|_next/image|favicon.ico).*)'
};
