'use client';

import { useState } from 'react';
import SideBar from './side-bar';
import Header from './header';

type Props = { children: React.ReactNode };

export default function MainLayout({ children }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((v) => !v);

  return (
    <div className='flex h-screen'>
      <div
        className={`fixed inset-y-0 left-0 z-30 w-52 bg-gray-800 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
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
