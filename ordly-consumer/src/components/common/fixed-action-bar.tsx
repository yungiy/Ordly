'use client';

import React from 'react';

type Props = {
  children: React.ReactNode;
}

function FixedActionBar({ children }: Props) {
  return (
    <footer className='fixed bottom-0 left-1/2 w-full max-w-[430px] -translate-x-1/2 transform bg-white'>
      {children}
    </footer>
  );
}

export default FixedActionBar;
