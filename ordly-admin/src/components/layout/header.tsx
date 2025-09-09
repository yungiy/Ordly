import { MouseEventHandler } from 'react';
import { Menu } from 'lucide-react';
type Props = {
  toggleSidebar: MouseEventHandler<HTMLButtonElement>;
};

export default function Header({ toggleSidebar }: Props) {
  return (
    <header className='bg-white p-4 flex gap-4 items-center'>
      <div className='md:hidden'>
        <button onClick={toggleSidebar}>
          <Menu />
        </button>
      </div>
      <div className='text-2xl text-gray-600 font-bold'>Dashboard</div>
    </header>
  );
}
