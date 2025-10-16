import Image from 'next/image';
import Link from 'next/link';
import { MenuItemForClient } from './menus.api';

type Props = {
  menus: MenuItemForClient;
};

export default function MenuItemComponent({ menus }: Props) {
  return (
    <Link href={`/menus/${menus.id}`} className='block hover:bg-gray-50'>
      <div className='flex items-start justify-between py-2'>
        <div className='flex flex-col'>
          <h3 className='text-lg font-bold'>{menus.name}</h3>
          {menus.description && (
            <p className='mt-1 whitespace-pre-line text-sm text-gray-600'>
              {menus.description}
            </p>
          )}
          <p className='mt-2 font-semibold'>
            {menus.price > 0 ? `₩${menus.price.toLocaleString()}` : ''}
          </p>
        </div>
        {menus.imageUrl && (
          <div className='relative ml-4 h-32 w-32 flex-shrink-0'>
            <Image
              src={menus.imageUrl}
              alt={menus.name}
              fill
              sizes="128px"
              className='object-cover rounded-lg'
            />
          </div>
        )}
      </div>
    </Link>
  );
}
