import Image from 'next/image';
import { ImageIcon, Trash2 } from 'lucide-react';
import { Menus } from '@/types/types';
import Button from '@/components/common/button';
import React from 'react';
import { useDeleteMenu, useUpdateMenuStatus } from '@/hooks/useMenus.hooks';

type Props = {
  item: Menus;
  onSelect: () => void;
};

const formatCurrency = (amount: number) => `₩${amount.toLocaleString()}`;

export default function MenuItem({ item, onSelect }: Props) {
  const { mutate: updateStatus, isPending } = useUpdateMenuStatus();
  const { mutate: deleteMenu, isPending: isDeleting } = useDeleteMenu();

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation(); // 부모의 onSelect 이벤트 방지
    const newStatus = e.target.checked ? 'AVAILABLE' : 'SOLDOUT';
    updateStatus({ id: item.id, status: newStatus });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모의 onSelect 이벤트 방지
    if (window.confirm('정말로 이 메뉴를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      deleteMenu(item.id);
    }
  };

  return (
    <div
      onClick={onSelect}
      className={'flex items-center gap-4 p-2 rounded-lg cursor-pointer scrollbar-hide'}
    >
      {item.imageBase64 ? (
        <div className='bg-gray-200 flex items-center justify-center'>
          <Image
            src={item.imageBase64}
            alt={item.name}
            width={80}
            height={80}
            className='rounded-md object-cover aspect-square'
          />
        </div>
      ) : (
        <div className='w-20 h-20 items-center justify-center flex bg-gray-200 rounded-md text-gray-400'>
          <ImageIcon size={60} />
        </div>
      )}

      <div className='flex-grow'>
        <p className='font-bold text-gray-800'>{item.name}</p>
        <p className='text-sm text-gray-500 truncate'>
          {item.description || '설명이 없습니다.'}
        </p>
        <p className='font-semibold mt-1'>{formatCurrency(item.price)}</p>
      </div>

      <div className='flex items-center justify-between gap-2'>
        <label className='relative inline-flex items-center cursor-pointer'>
          <input
            type='checkbox'
            checked={item.status === 'AVAILABLE'}
            onChange={handleStatusChange}
            disabled={isPending}
            className='sr-only peer'
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
        </label>
        <Button
          onClick={handleDelete}
          disabled={isDeleting}
          className='border border-gray-400 rounded-4xl disabled:opacity-50'
        >
          <Trash2 size={20} color='black' className='m-1' />
        </Button>
      </div>
    </div>
  );
}