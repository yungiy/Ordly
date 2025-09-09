import { MouseEventHandler } from 'react';

type Props = {
  toggleSidebar: MouseEventHandler<HTMLButtonElement>;
};

export default function Header({toggleSidebar}: Props ) {
  return (
    <header className='bg-white p-4 flex gap-4 items-center'>
      <div className='md:hidden'>
        <button onClick={toggleSidebar}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>
      </div>
      <div className='text-2xl font-bold'>Dashboard</div>
    </header>
  );
}
