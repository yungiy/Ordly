import Image from 'next/image';
import Link from 'next/link';
import { MenuItemForClient } from './menus.api';
import { MenuStatus } from '@/generated/prisma';
import MenuSoldComponent from './menu-sold';
import { createSupabaseUrl } from '@/utils/create-supabase-url';

type Props = {
  menu: MenuItemForClient;
  priority?: boolean;
};

export default function MenuItemComponent({ menu, priority = false }: Props) {
  const isSoldOut = menu.status === MenuStatus.SOLDOUT;

  const content = (
    <div className='flex items-start justify-between px-1'>
      <div className='flex flex-col'>
        <h3 className='text-lg font-bold'>{menu.name}</h3>
        {menu.description && (
          <p className='mt-1 whitespace-pre-line text-sm text-gray-600'>
            {menu.description}
          </p>
        )}
        <p className='mt-2 font-semibold'>
          {menu.price > 0 ? `₩${menu.price.toLocaleString()}` : ''}
        </p>
      </div>
      {menu.imageUrl && (
        <div className='relative ml-4 h-32 w-32'>
          <Image
            src={createSupabaseUrl(menu.imageUrl)}
            alt={menu.name}
            fill
            priority={priority}
            sizes='128px'
            className='object-cover rounded-lg'
          />
        </div>
      )}
    </div>
  );

  if (isSoldOut) {
    return <MenuSoldComponent>{content}</MenuSoldComponent>;
  }

  return (
    <Link
      href={`/menus/${menu.id}`}
      className='block rounded-lg p-2 transition-all duration-200 ease-in-out hover:bg-gray-100 active:scale-95 active:bg-gray-200'
    >
      {content}
    </Link>
  );
}
