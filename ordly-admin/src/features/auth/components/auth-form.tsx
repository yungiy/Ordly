'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth.hooks';
import { LoginRequest, RegisterRequest } from '@/types/types';
import Button from '@/components/common/button';
import Input from '@/components/common/input';
import { twMerge } from 'tailwind-merge';

// 폼에서 사용할 데이터 타입. 회원가입 시에는 모든 필드가 필요.
type FormData = RegisterRequest;

type AuthMode = 'login' | 'register';

/**
 * 로그인과 회원가입을 위한 폼 컴포넌트
 */
export default function AuthForm() {
  const [mode, setMode] = useState<AuthMode>('login');
  const { login, signup, isSigningUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  // 로그인/회원가입 모드 변경 핸들러
  const handleModeChange = (newMode: AuthMode) => {
    setMode(newMode);
    reset(); // 폼 상태 초기화
  };

  // 폼 제출 핸들러
  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (mode === 'login') {
      // 로그인 모드일 경우, name과 password만 사용하여 login 함수 호출
      const loginData: LoginRequest = { name: data.name, password: data.password };
      login(loginData);
    } else {
      // 회원가입 모드일 경우, 모든 데이터를 사용하여 signup 함수 호출
      signup(data);
    }
  };

  return (
    <div>
      {/* 로그인/회원가입 탭 */}
      <div className='mb-4 flex border-b'>
        <button
          onClick={() => handleModeChange('login')}
          className={twMerge(
            'flex-1 py-2 text-center font-semibold',
            mode === 'login' ? 'border-b-2 border-black text-black' : 'text-gray-500'
          )}
        >
          로그인
        </button>
        <button
          onClick={() => handleModeChange('register')}
          className={twMerge(
            'flex-1 py-2 text-center font-semibold',
            mode === 'register' ? 'border-b-2 border-black text-black' : 'text-gray-500'
          )}
        >
          회원가입
        </button>
      </div>

      {/* 실제 폼 */}
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        {/* 이름 입력 필드 */}
        <Input
          type='text'
          placeholder='이름'
          className='border border-gray-400'
          {...register('name', { required: '이름은 필수입니다.' })}
        />
        {errors.name && <p className='text-sm text-red-500'>{errors.name.message}</p>}

        {/* 회원가입 모드에서만 보이는 전화번호 필드 */}
        {mode === 'register' && (
          <>
            <Input
              type='text'
              placeholder='연락처 (010-1234-5678)'
              className='border border-gray-400'
              {...register('phone', {
                required: '연락처는 필수입니다.',
                pattern: {
                  value: /^\d{3}-\d{3,4}-\d{4}$/,
                  message: '유효한 연락처 형식이 아닙니다.',
                },
              })}
            />
            {errors.phone && <p className='text-sm text-red-500'>{errors.phone.message}</p>}
          </>
        )}

        {/* 비밀번호 입력 필드 */}
        <Input
          type='password'
          placeholder='비밀번호'
          className='border border-gray-400'
          {...register('password', { required: '비밀번호는 필수입니다.' })}
        />
        {errors.password && <p className='text-sm text-red-500'>{errors.password.message}</p>}

        {/* 제출 버튼 */}
        <Button type='submit' className='bg-yellow-400 font-bold py-3 text-xl text-white' disabled={isSigningUp}>
          {isSigningUp ? '처리 중...' : mode === 'login' ? '로그인' : '회원가입'}
        </Button>
      </form>
    </div>
  );
}
