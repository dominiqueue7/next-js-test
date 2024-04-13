import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) { // 대시보드에 있을경우
        if (isLoggedIn) return true; // 로그인 되어있으면 인증됨 리턴
        return false; // 로그인 안되있으면 인증안됨 리턴
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl)); // 그냥 로그인되어있으면 대시보드로 리다이렉트
      }
      return true; // 인증됨 리턴 
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;