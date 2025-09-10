import Link from 'next/link';
import { SIDEBAR_PATH } from '@/constants';
import { X } from 'lucide-react';

type Props = {
  toggleSidebar: React.MouseEventHandler<HTMLButtonElement>;
};

export default function SideBar({ toggleSidebar }: Props) {
  return (
    <div className='bg-gray-900 text-white w-60 min-h-screen p-4'>
      <div className='flex justify-between items-center mb-4'>
        <div className='text-2xl text-amber-400 font-extrabold font-serif'>
          ShopName
        </div>
        <button onClick={toggleSidebar} className='md:hidden'>
          <X/>
        </button>
      </div>
      <nav className='text-xl font-extrabold'>
        <ul className='flex flex-col gap-5'>
          {SIDEBAR_PATH.map((item: any) => (
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
  );
}
