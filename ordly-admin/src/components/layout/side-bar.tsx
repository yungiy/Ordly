'use client';

import Link from 'next/link';
import { SIDEBAR_PATH } from '@/constants';
import { X, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth.hooks';
import Button from '../common/button';

type Props = {
  toggleSidebar: React.MouseEventHandler<HTMLButtonElement>;
};

export default function SideBar({ toggleSidebar }: Props) {
  const { logout } = useAuth();

  return (
    <div className='bg-gray-900 text-white w-60 min-h-screen p-4 flex flex-col justify-between'>
      <div>
        <div className='flex justify-between items-center mb-4'>
          <div className='text-2xl text-amber-400 font-extrabold font-serif'>
            ShopName
          </div>
          <button onClick={toggleSidebar} className='md:hidden'>
            <X />
          </button>
        </div>
        <nav className='text-xl font-extrabold'>
          <ul className='flex flex-col gap-5'>
            {SIDEBAR_PATH.map((item: { path: string; label: string }) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className='block transition-all duration-300 hover:scale-115'
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <Button
        onClick={logout}
        className='flex items-center gap-2 text-xl font-extrabold transition-all duration-300'
      >
        <LogOut size={24} />
        로그아웃
      </Button>
    </div>
  );
}
