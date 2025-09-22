'use client';

import { useState } from 'react';
import Button from '@/components/common/button';
import Input from '@/components/common/input';
import { twMerge } from 'tailwind-merge';

type AuthMode = 'login' | 'register';

export default function AuthForm() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [authCode, setAuthCode] = useState('');

  const isLoginMode = mode === 'login';

  return (
    <div>
      <div className='mb-4 flex border-b'>
        <Button
          onClick={() => setMode('login')}
          className={twMerge(
            'flex-1 py-2 text-center font-semibold',
            isLoginMode
              ? 'border-b-2 rounded-b-none text-black'
              : 'text-gray-500',
          )}
        >
          로그인
        </Button>
        <Button
          onClick={() => setMode('register')}
          className={twMerge(
            'flex-1 py-2 text-center font-semibold',
            !isLoginMode
              ? 'border-b-2 rounded-b-none text-black'
              : 'text-gray-500',
          )}
        >
          회원가입
        </Button>
      </div>

      <form className='space-y-4'>
        <Input type='email' placeholder='아이디' className='border border-gray-400' />
        <Input type='password' placeholder='비밀번호' className='border border-gray-400' />

        {!isLoginMode && (
          <>
            <Input type='password' placeholder='비밀번호 확인' className='border border-gray-400' />
            <Input
              type='text'
              placeholder='인증코드'
              value={authCode}
              className='border border-gray-400'
              onChange={(e) => setAuthCode(e.target.value)}
            />
          </>
        )}

        <Button
          type='submit'
          className='py-3 text-lg font-bold text-white bg-yellow-500'
        >
          {isLoginMode ? '로그인' : '회원가입'}
        </Button>
      </form>
    </div>
  );
}