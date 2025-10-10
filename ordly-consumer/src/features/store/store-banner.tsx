import Image from 'next/image';
import Link from 'next/link';

export default function StoreBanner() {
  return (
    <div className='relative h-40 w-full'>
      <Image
        src='https://picsum.photos/800/200'
        alt='Seoul Brewery Banner'
        fill
        className='object-cover'
      />
      <div className='absolute top-3 left-3'>
        <Link href='/order-history' className='cursor-pointer'>
          <div className='flex items-center justify-center rounded-full bg-white/80 text-gray-600 backdrop-blur-sm h-10 w-auto px-2.5 text-sm font-semibold'>
            <span>주문내역</span>
          </div>
        </Link>
      </div>
    </div>
  );
}