import Image from 'next/image';
import { ImageIcon, Trash2 } from 'lucide-react';
import { Menus } from '@/types/types';
import Button from '@/components/common/button';
import React from 'react';
import { useDeleteMenu, useUpdateMenuStatus } from '@/hooks/useMenus.hooks';

type Props = {
  item: Menus;
  onSelect: () => void;
  onDelete: (id: string) => void;
};

const formatCurrency = (amount: number) => `₩${amount.toLocaleString()}`;

export default function MenuItem({ item, onSelect, onDelete }: Props) {
  const { mutate: updateStatus, isPending } = useUpdateMenuStatus();
  const { mutate: deleteMenu, isPending: isDeleting } = useDeleteMenu();

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const newStatus = e.target.checked ? 'AVAILABLE' : 'SOLDOUT';
    updateStatus({ id: item.id, status: newStatus });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(item.id);
  };

  const isSoldOut = item.status === 'SOLDOUT';
  const isLoading = isPending || isDeleting;

  return (
    <div
      onClick={!isLoading ? onSelect : undefined}
      className={`
        flex items-center gap-4 p-3 rounded-lg transition-all
        ${isLoading
          ? 'opacity-50 cursor-wait'
          : 'cursor-pointer hover:bg-gray-50'
        }
        scrollbar-hide
      `}
    >
      <div
        className={`flex items-center gap-4 flex-grow min-w-0 transition-opacity ${
          isSoldOut && !isLoading ? 'opacity-50' : ''
        }`}
      >
        <div className='flex-shrink-0'>
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.name}
              width={80}
              height={80}
              className='rounded-md object-cover w-20 h-20'
            />
          ) : (
            <div className='w-20 h-20 flex items-center justify-center bg-gray-100 rounded-md text-gray-400'>
              <ImageIcon size={48} />
            </div>
          )}
        </div>

        <div className='flex-grow min-w-0'>
          <p className='font-bold text-gray-800 truncate'>{item.name}</p>
          <p className='text-sm text-gray-500 truncate'>
            {item.description || '설명이 없습니다.'}
          </p>
          <p className='font-semibold mt-1 text-gray-700'>
            {formatCurrency(item.price)}
            {isSoldOut && (
              <span className='ml-2 text-sm font-medium text-red-500'>
                (품절)
              </span>
            )}
          </p>
        </div>
      </div>

      <div className='flex items-center flex-shrink-0 gap-3'>
        <label
          className='relative flex flex-col items-center cursor-pointer'
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type='checkbox'
            checked={item.status === 'AVAILABLE'}
            onChange={handleStatusChange}
            disabled={isLoading}
            className='sr-only peer'
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
          <span
            className={`mt-1 text-xs font-medium ${
              isSoldOut ? 'text-gray-500' : 'text-yellow-600'
            }`}
          >
            {isSoldOut ? '품절' : '판매중'}
          </span>
        </label>

        <Button
          onClick={handleDelete}
          disabled={isDeleting}
          className='w-auto h-auto p-2 rounded-full bg-transparent text-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          aria-label='메뉴 삭제'
        >
          <Trash2 size={20} className='text-current' />
        </Button>
      </div>
    </div>
  );
}