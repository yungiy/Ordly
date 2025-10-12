'use client';

import { MapPin, Phone, Clock } from 'lucide-react';

type Props = {
  address: string;
  phone: string;
  hours: string | null;
};

export default function StoreInfo({ address, phone, hours }: Props) {
  return (
    <div className='p-5 space-y-4'>
      <div className='flex items-start space-x-3'>
        <MapPin className='h-5 w-5 text-gray-400 mt-0.5' />
        <div>
          <p className='font-semibold text-gray-800 text-lg'>주소</p>
          <p className='text-gray-600'>{address}</p>
        </div>
      </div>
      <div className='flex items-start space-x-3'>
        <Phone className='h-5 w-5 text-gray-400 mt-0.5' />
        <div>
          <p className='font-semibold text-gray-800 text-lg'>전화번호</p>
          <p className='text-gray-600'>{phone}</p>
        </div>
      </div>
      <div className='flex items-start space-x-3'>
        <Clock className='h-5 w-5 text-gray-400 mt-0.5' />
        <div>
          <p className='font-semibold text-gray-800 text-lg'>영업시간</p>
          <p className='text-gray-600 whitespace-pre-line'>
            {hours ?? '정보 없음'}
          </p>
        </div>
      </div>
    </div>
  );
}
