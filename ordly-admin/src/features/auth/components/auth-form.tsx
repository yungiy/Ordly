'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth.hooks';
import { LoginRequest, RegisterRequest } from '@/types/types';
import Button from '@/components/common/button';
import Input from '@/components/common/input';
import { twMerge } from 'tailwind-merge';

type FormData = RegisterRequest & { confirmPassword?: string };

type AuthMode = 'login' | 'register';

export default function AuthForm() {
  const [mode, setMode] = useState<AuthMode>('login');
  const { login, signup, isSigningUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({ mode: 'onChange' });

  const handleModeChange = (newMode: AuthMode) => {
    setMode(newMode);
    reset(); // 폼 상태 초기화
  };

  // 폼 제출 핸들러
  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (mode === 'login') {
      const loginData: LoginRequest = { name: data.name, password: data.password };
      login(loginData);
    } else {
      signup(data);
    }
  };

  return (
    <div>
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

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <Input
            type='text'
            placeholder='이름'
            className='border border-gray-400'
            {...register('name', { required: '이름은 필수입니다.' })}
          />
          {errors.name && <p className='mt-1 text-sm text-red-500'>{errors.name.message}</p>}
        </div>

        {mode === 'register' && (
          <div>
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
            {errors.phone && <p className='mt-1 text-sm text-red-500'>{errors.phone.message}</p>}
          </div>
        )}

        <div>
          <Input
            type='password'
            placeholder='비밀번호'
            className='border border-gray-400'
            {...register('password', { required: '비밀번호는 필수입니다.' })}
          />
          {errors.password && <p className='mt-1 text-sm text-red-500'>{errors.password.message}</p>}
        </div>

        {mode === 'register' && (
          <div>
            <Input
              type='password'
              placeholder='비밀번호 확인'
              className='border border-gray-400'
              {...register('confirmPassword', {
                required: '비밀번호 확인은 필수입니다.',
                validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다.',
              })}
            />
            {errors.confirmPassword && (
              <p className='mt-1 text-sm text-red-500'>{errors.confirmPassword.message}</p>
            )}
          </div>
        )}

        <Button type='submit' className='bg-yellow-400 font-bold py-3 text-xl text-white' disabled={isSigningUp}>
          {isSigningUp ? '처리 중...' : mode === 'login' ? '로그인' : '회원가입'}
        </Button>
      </form>
    </div>
  );
}
