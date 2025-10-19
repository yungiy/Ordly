import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function MenuSoldComponent({ children }: Props) {
  return (
    <div className='relative block cursor-not-allowed p-2'>
      {children}
      <div className='absolute inset-0 flex items-center justify-center bg-black/10 rounded-md'>
        <span className='py-2 px-4 text-lg font-bold text-white bg-black/40 rounded-4xl'>
          품절
        </span>
      </div>
    </div>
  );
}