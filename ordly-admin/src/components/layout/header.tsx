import { MouseEventHandler } from 'react';
import { Menu } from 'lucide-react';
type Props = {
  toggleSidebar: MouseEventHandler<HTMLButtonElement>;
};

export default function Header({ toggleSidebar }: Props) {
  return (
    <header className='bg-slate-50 p-4 flex items-center'>
      <button onClick={toggleSidebar} className="text-gray-600 md:hidden">
        <Menu size={28} />
      </button>
      <div className='text-2xl text-gray-800 font-bold md:ml-0 ml-4'>
        ShopName
      </div>
    </header>
  );
}