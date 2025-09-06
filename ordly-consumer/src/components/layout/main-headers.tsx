import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/common/button';
import { ArrowRight } from 'lucide-react';

export default function MainHeaders() {
  return (
    <header className='bg-white pb-2'>
      {/* Top Banner Image */}
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
        <div className='absolute bottom-2 right-2'>
          <Button className='rounded-md bg-black bg-opacity-50 px-3 py-1 text-sm text-white h-auto w-auto'>
            Language <span className='text-red-500'>Beta</span>
          </Button>
        </div>
      </div>

      {/* Store Info */}
      <div className='p-4'>
        <div className='flex items-center'>
          <div className='relative h-16 w-16 flex-shrink-0'>
            <Image
              src='https://picsum.photos/100/100'
              alt='Seoul Brewery Logo'
              fill
              className='object-contain rounded-full'
            />
          </div>
          <div className='ml-4 flex-grow'>
            <h1 className='text-xl font-bold'>서울브루어리 성수</h1>
          </div>
          <Link href='/store' className='cursor-pointer'>
            <div className='flex items-center text-sm border border-gray-200 rounded-full px-2.5 py-2 text-gray-500'>
              <span>매장정보</span>
            </div>
          </Link>
        </div>

        <div className='mt-4 rounded-lg bg-gray-100 p-3 text-center text-sm text-gray-500'>
          <p>💭 .</p>
        </div>
        <Link href='/coupon' className='cursor-pointer'>
          <div className='relative mt-4 flex items-stretch justify-between rounded-xl bg-amber-300 text-gray-800 font-semibold overflow-hidden'>
            <div className='px-4 py-3'>
              <span>무료 쿠폰 받기</span>
            </div>
            <div className='flex items-center pr-4'>
              <div className='h-2/3 border-l-2 border-dashed border-amber-400/80' />
              <ArrowRight className='h-6 w-6 ml-6' />
            </div>
            <div className='absolute top-0 right-[3.5rem] -translate-y-1/2 w-4 h-4 bg-white rounded-full'></div>
            <div className='absolute bottom-0 right-[3.5rem] translate-y-1/2 w-4 h-4 bg-white rounded-full'></div>
          </div>
        </Link>
      </div>
    </header>
  );
}
