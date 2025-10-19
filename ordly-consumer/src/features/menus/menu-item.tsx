import Image from 'next/image';
import Link from 'next/link';
import { MenuItemForClient } from './menus.api';
import { MenuStatus } from '@/generated/prisma';
import MenuSoldComponent from './menu-sold';

type Props = {
  menus: MenuItemForClient;
  priority?: boolean;
};

export default function MenuItemComponent({ menus, priority = false }: Props) {
  const isSoldOut = menus.status === MenuStatus.SOLDOUT;

  const content = (
    <div className='flex items-start justify-between px-1'>
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
        <div className='relative ml-4 h-32 w-32'>
          <Image
            src={menus.imageUrl}
            alt={menus.name}
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
    <Link href={`/menus/${menus.id}`} className='block hover:bg-gray-50'>
      {content}
    </Link>
  );
}
