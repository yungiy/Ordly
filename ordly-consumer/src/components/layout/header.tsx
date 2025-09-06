'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface Props {
  title?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  showBackButton?: boolean;
}

export default function Header({
  title,
  leftContent,
  rightContent,
  showBackButton,
}: Props) {
  const router = useRouter();

  return (
    <header className='sticky top-0 z-10 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 text-black'>
      <div className='flex w-1/4 items-center justify-start'>
        {showBackButton && (
          <button onClick={() => router.back()} className='p-2'>
            <ArrowLeft className='h-6 w-6' />
          </button>
        )}
        {leftContent}
      </div>
      <div className='flex w-1/2 items-center justify-center'>
        {title && <h1 className='truncate text-lg font-semibold'>{title}</h1>}
      </div>
      <div className='flex w-1/4 items-center justify-end'>{rightContent}</div>
    </header>
  );
}
