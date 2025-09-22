import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * 서버 컴포넌트, API 라우트, 서버 액션에서 사용할 Supabase 클라이언트를 생성합니다.
 * Next.js의 cookies() 함수를 통해 쿠키를 안전하게 관리합니다.
 */
export function createClient() {
  const cookieStore = cookies();

  // 이전 방식처럼 get, set, remove를 포함한 객체를 넘기는 대신,
  // Next.js의 'cookies()'가 반환하는 cookieStore를 직접 전달합니다.
  return createServerClient(
    process.env.DATABASE_URL!,
    process.env.SUPABASE_API_KEY!,
    {
      cookies: {
        async get(name: string) {
          return (await cookieStore).get(name)?.value;
        },
        async set(name: string, value: string, options: CookieOptions) {
          try {
            (await cookieStore).set({ name, value, ...options });
          } catch (error) {
            // TODO: 에러 처리
          }
        },
        async remove(name: string, options: CookieOptions) {
          try {
            (await cookieStore).set({ name, value: '', ...options });
          } catch (error) {
            // TODO: 에러 처리
          }
        },
      },
    }
  );
}
