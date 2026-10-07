import { NextResponse, type NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const firstSegment = request.nextUrl.pathname.split('/')[1];
  const response = NextResponse.next();
  response.headers.set('x-locale', firstSegment === 'en' ? 'en' : 'ar');
  return response;
}

export const config = { matcher: ['/((?!_next|api|assets).*)'] };
