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
      {/* 사이드바 */}
      <div
        className={twMerge(
          'fixed inset-y-0 left-0 z-30 w-60 transform transition-transform duration-300 ease-in-out',
          'md:relative md:translate-x-0',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SideBar toggleSidebar={toggleSidebar} />
      </div>

      {/* 모바일 오버레이 */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* 메인 콘텐츠 영역 */}
      <div className='flex-1 flex flex-col overflow-x-hidden'>
        <div className="md:hidden">
          <Header toggleSidebar={toggleSidebar} />
        </div>
        
        <main className="flex flex-col flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}