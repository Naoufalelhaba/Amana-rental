import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from '@/lib/session'

const PROTECTED = ['/dashboard', '/admin']
const AUTH_ONLY = ['/login', '/forgot-password', '/reset-password']

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isProtected = PROTECTED.some(p => pathname.startsWith(p))
  const isAuthOnly = AUTH_ONLY.some(p => pathname.startsWith(p))

  const token = req.cookies.get('amana-session')?.value
  const session = await decrypt(token)
  const isLoggedIn = Boolean(session?.userId)

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  // Protéger /admin : rôle admin requis
  if (pathname.startsWith('/admin') && isLoggedIn && session?.role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  if (isAuthOnly && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp)$).*)'],
}
