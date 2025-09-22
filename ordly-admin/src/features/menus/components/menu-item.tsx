import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { Menus } from '@/types/types';

type Props = {
  item: Menus;
  onSelect: ()=> void;
}

const formatCurrency = (amount: number) => `₩${amount.toLocaleString()}`;

export default function MenuItem({ item,onSelect }: Props) {
  return (
    <div onClick={onSelect} className='flex items-center gap-4 p-2 rounded-lg cursor-pointer'>
      <div className='w-20 h-20 rounded-md bg-gray-200 flex items-center justify-center'>
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            width={80}
            height={80}
            className='object-cover rounded-md'
          />
        ) : (
          <ImageIcon className='w-8 h-8 text-gray-400' />
        )}
      </div>

      <div className='flex-grow'>
        <p className='font-bold text-gray-800'>{item.name}</p>
        <p className='text-sm text-gray-500 truncate'>
          {item.description || '설명이 없습니다.'}
        </p>
        <p className='font-semibold mt-1'>{formatCurrency(item.price)}</p>
      </div>

      <div className='flex items-center'>
        <label className='relative inline-flex items-center cursor-pointer'>
          <input
            type='checkbox'
            defaultChecked={item.isAvailable}
            className='sr-only peer'
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
        </label>
      </div>
    </div>
  );
}
