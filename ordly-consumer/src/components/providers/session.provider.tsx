'use client';

import { createBrowserClient } from '@supabase/ssr';
import { useEffect, useState } from 'react';

let sessionChecked = false;

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  useEffect(() => {
    // 이미 세션 확인을 수행했다면 중복 실행 방지
    if (sessionChecked) {
      return;
    }
    sessionChecked = true;

    const manageSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // 현재 세션이 없는 경우에만 익명 로그인 시도
      if (!session) {
        const { error } = await supabase.auth.signInAnonymously();
        if (error) {
          console.error('Error signing in anonymously:', error.message);
        }
      }
    };

    manageSession();
  }, [supabase])

  return <>{children}</>;
}
