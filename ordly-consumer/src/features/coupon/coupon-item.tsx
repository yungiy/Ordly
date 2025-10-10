import { Download } from 'lucide-react';
import React from 'react';

export type Coupon = {
  id: number;
  dDay: string;
  amount: string;
  currency: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

type Props = {
  coupon: Coupon;
  onDownload: (title: string) => void;
}

export default function CouponItem({ coupon, onDownload }: Props) {
  return (
    <div className='relative bg-white rounded-lg flex overflow-hidden border border-gray-200/80'>
      <div className='p-4 flex-grow'>
        <div className='flex items-center gap-2 mb-2'>
          <span className='bg-yellow-400 text-white text-xs font-semibold px-2 py-1 rounded'>
            {coupon.dDay}
          </span>
        </div>
        <p className='text-3xl font-bold text-yellow-500'>
          {coupon.amount}
          <span className='text-xl font-semibold text-gray-800'>{coupon.currency}</span>
          <span className='text-xl font-semibold text-gray-800 ml-1'>할인</span>
        </p>
        <h3 className='font-bold mt-4'>{coupon.title}</h3>
        <p className='text-xs text-gray-800 max-w-[200px] mt-1'>{coupon.description}</p>
      </div>
      <div className='w-24 flex flex-col items-center justify-center text-xs text-gray-800 border-l-2 border-dashed border-gray-200'>
        <span>{coupon.startDate}</span>
        <span>~</span>
        <span>{coupon.endDate}</span>
        <button 
          onClick={() => onDownload(coupon.title)}
          className='mt-6 p-2 rounded-full'
          aria-label={`${coupon.title} 쿠폰 다운로드`}
        >
          <Download className='w-8 h-8 text-gray-600' />
        </button>
      </div>
      <div className='absolute top-1/2 -translate-y-1/2 left-[calc(100%-7rem-1px)] -translate-x-1/2 w-4 h-4 bg-gray-50 rounded-full'></div>
    </div>
  );
}
