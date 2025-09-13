'use client';

import { useState } from 'react';
import SideBar from './side-bar';
import Header from './header';
import { twMerge } from 'tailwind-merge';

type Props = { children: React.ReactNode };

export default function MainLayout({ children }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((v) => !v);

  return (
    <div className='flex h-screen bg-slate-50'>
      <div
        className={twMerge(
          'fixed inset-y-0 left-0 z-30 w-60 transform transition-transform duration-300 ease-in-out',
          'md:relative md:translate-x-0',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SideBar toggleSidebar={toggleSidebar} />
      </div>

      {isSidebarOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-20 md:hidden'
          onClick={toggleSidebar}
        />
      )}
      <div className='flex-1 flex flex-col items-center overflow-x-hidden'>
        <div className='md:hidden'>
          <Header toggleSidebar={toggleSidebar} />
        </div>

        <main className='flex flex-col flex-1 w-full overflow-y-auto max-w-6xl'>
          {children}
        </main>
      </div>
    </div>
  );
}
