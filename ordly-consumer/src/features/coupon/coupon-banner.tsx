import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CouponBanner() {
  return (
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
  );
}