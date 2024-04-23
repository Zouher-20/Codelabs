import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getSession } from './app/api/(modules)/auth/service/actions';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    // const session = getSession();
    // if (!session) return NextResponse.redirect(new URL('/login', request.url));
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/((?!api|login|register|_next/static|_next/image|favicon.ico).*)'
};
