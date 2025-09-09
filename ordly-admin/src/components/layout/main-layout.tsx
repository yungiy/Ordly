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
    <div className='flex h-screen'>
      <div
        className={twMerge(
          'fixed inset-y-0 left-0 z-30 w-60 bg-gray-800 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SideBar toggleSidebar={toggleSidebar} />
      </div>
      <div className='flex-1 flex flex-col overflow-hidden'>
        <Header toggleSidebar={toggleSidebar} />
        <main>{children}</main>
      </div>
    </div>
  );
}
