'use client';

import { FallbackProps } from 'react-error-boundary';
import Button from './button';

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div
      role='alert'
      className='flex flex-col items-center justify-center h-full p-8 text-center'
    >
      <h2 className='text-2xl font-bold text-red-500 mb-4'>
        문제가 발생했어요
      </h2>
      <p className='text-gray-600 mb-6'>
        데이터를 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.
      </p>
      <Button
        onClick={resetErrorBoundary}
        className='px-6 py-2 bg-black text-white rounded-md'
      >
        다시 시도
      </Button>
    </div>
  );
}

export default ErrorFallback;
