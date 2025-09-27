'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth.hooks';
import { LoginRequest, RegisterRequest } from '@/types/types';
import Button from '@/components/common/button';
import Input from '@/components/common/input';
import { twMerge } from 'tailwind-merge';

type FormData = Partial<
  RegisterRequest & LoginRequest & { confirmPassword?: string }
>;

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
    reset();
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (mode === 'login') {
      const loginData: LoginRequest = {
        name: data.name!,
        password: data.password!,
      };
      login(loginData);
    } else {
      signup(data as RegisterRequest);
    }
  };

  return (
    <div>
      <div className='mb-4 flex border-b'>
        <button
          onClick={() => handleModeChange('login')}
          className={twMerge(
            'flex-1 py-2 text-center font-semibold',
            mode === 'login'
              ? 'border-b-2 border-black text-black'
              : 'text-gray-500'
          )}
        >
          로그인
        </button>
        <button
          onClick={() => handleModeChange('register')}
          className={twMerge(
            'flex-1 py-2 text-center font-semibold',
            mode === 'register'
              ? 'border-b-2 border-black text-black'
              : 'text-gray-500'
          )}
        >
          회원가입
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <Input
            type='text'
            placeholder='사용자 이름'
            className='border border-gray-400'
            {...register('name', { required: '사용자 이름은 필수입니다.' })}
          />
          {errors.name && (
            <p className='mt-1 text-sm text-red-500'>{errors.name.message}</p>
          )}
        </div>
        {/* 공통 필드: 비밀번호 */}
        <div>
          <Input
            type='password'
            placeholder='비밀번호'
            className='border border-gray-400'
            {...register('password', { required: '비밀번호는 필수입니다.' })}
          />
          {errors.password && (
            <p className='mt-1 text-sm text-red-500'>
              {errors.password.message}
            </p>
          )}
        </div>
        {mode === 'register' && (
          <div>
            <Input
              type='password'
              placeholder='비밀번호 확인'
              className='border border-gray-400'
              {...register('confirmPassword', {
                required: '비밀번호 확인은 필수입니다.',
                validate: (value) =>
                  value === watch('password') ||
                  '비밀번호가 일치하지 않습니다.',
              })}
            />
            {errors.confirmPassword && (
              <p className='mt-1 text-sm text-red-500'>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        )}

        {mode === 'register' && (
          <>
            <div className='my-4 border-t border-gray-200' />
            <h2 className='text-lg font-semibold mb-2'>매장 정보</h2>
            <div>
              <Input
                type='text'
                placeholder='매장 이름'
                className='border border-gray-400'
                {...register('storeName', {
                  required: '매장 이름은 필수입니다.',
                })}
              />
              {errors.storeName && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.storeName.message}
                </p>
              )}
            </div>
            <div>
              <Input
                type='text'
                placeholder='매장 주소'
                className='border border-gray-400'
                {...register('storeAddress', {
                  required: '매장 주소는 필수입니다.',
                })}
              />
              {errors.storeAddress && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.storeAddress.message}
                </p>
              )}
            </div>
            <div>
              <Input
                type='text'
                placeholder='매장 연락처 (010-1234-5678)'
                className='border border-gray-400'
                {...register('storePhone', {
                  required: '매장 연락처는 필수입니다.',
                  pattern: {
                    value: /^\d{3}-\d{3,4}-\d{4}$/,
                    message: '유효한 연락처 형식이 아닙니다.',
                  },
                })}
              />
              {errors.storePhone && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.storePhone.message}
                </p>
              )}
            </div>
          </>
        )}

        <Button
          type='submit'
          className='w-full bg-yellow-400 font-bold py-3 text-xl text-white'
          disabled={isSigningUp}
        >
          {isSigningUp
            ? '처리 중...'
            : mode === 'login'
            ? '로그인'
            : '회원가입'}
        </Button>
      </form>
    </div>
  );
}
