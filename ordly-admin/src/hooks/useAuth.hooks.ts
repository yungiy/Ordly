import { useMutation } from '@tanstack/react-query';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import { LoginRequest, RegisterRequest } from '@/types/types';
import { useEffect } from 'react';
import { registerApi } from '@/features/auth/api/auth.api';

export const useAuth = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const {
    setSession,
    clearSession,
    isAuthenticated,
    session: localSession,
  } = useAuthStore();

  useEffect(() => {
    if (status === 'authenticated') {
      setSession(session);
    } else if (status === 'unauthenticated') {
      clearSession();
    }
  }, [session, status, setSession, clearSession]);

  const { mutate: signup, isPending: isSigningUp } = useMutation({
    mutationFn: registerApi,
    onSuccess: () => {
      console.log('회원가입이 완료되었습니다. 로그인해주세요.');
      router.push('/auth');
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const login = async (data: LoginRequest) => {
    const result = await signIn('credentials', {
      ...data,
      redirect: false,
    });

    if (result?.error) {
      console.log('로그인에 실패했습니다. 이름 또는 비밀번호를 확인해주세요.');
      return;
    }
    router.replace('/');
  };

  const logout = async () => {
    await signOut({ redirect: false });
    clearSession();
    router.replace('/auth');
  };

  return {
    session: localSession,
    isAuthenticated,
    isLoading: status === 'loading',
    login,
    logout,
    signup,
    isSigningUp,
  };
};
