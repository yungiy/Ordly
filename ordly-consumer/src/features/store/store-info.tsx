'use client';

import { MapPin, Phone, Clock } from 'lucide-react';

type Props = {
  address: string;
  phone: string;
  hours: string;
}

export default function StoreInfo({ address, phone, hours }: Props) {
  return (
    <div className='p-5 space-y-4'>
      <div className='flex items-start space-x-3'>
        <MapPin className='h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5' />
        <div>
          <p className='font-semibold text-gray-800'>주소</p>
          <p className='text-gray-600'>{address}</p>
        </div>
      </div>
      <div className='flex items-start space-x-3'>
        <Phone className='h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5' />
        <div>
          <p className='font-semibold text-gray-800'>전화번호</p>
          <p className='text-gray-600'>{phone}</p>
        </div>
      </div>
      <div className='flex items-start space-x-3'>
        <Clock className='h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5' />
        <div>
          <p className='font-semibold text-gray-800'>영업시간</p>
          <p className='text-gray-600'>{hours}</p>
        </div>
      </div>
    </div>
  );
}
