import { NextRequest, NextResponse } from 'next/server'

const signInUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value

  console.log(req.url)

  if (!token) {
    return NextResponse.redirect(signInUrl, {
      headers: {
        'Set-Cookie': `redirectTo=${req.url}; Path=/; HttpOnly; max-age=20;`,
      },
    })
  }

  NextResponse.next()
}

export const config = {
  matcher: '/memmory/:path*',
}