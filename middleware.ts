import { ROLE } from '@prisma/client';
import { JWTPayload } from 'jose';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import AuthUtils from './app/utils/auth-utils';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    try {
        const session = await getSessionInMiddelware(request.url);
        if (!session) return LoginRedirect(request.url);
        return CheckRole({ request, session });
    } catch (error) {
        return LoginRedirect(request.url);
    }
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
function LoginRedirect(url: string) {
    return NextResponse.redirect(new URL('/login', url));
}

async function getSessionInMiddelware(url: string) {
    const sessionAsToken = cookies().get('session')?.value;
    if (!sessionAsToken) return null;
    await AuthUtils.decryptJwt(sessionAsToken);
    const session = await AuthUtils.decryptJwt(sessionAsToken);
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/((?!api|login|register|_next/static|_next/image|favicon.ico).*)'
};
