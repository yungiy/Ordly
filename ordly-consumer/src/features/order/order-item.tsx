import Image from 'next/image';
import Link from 'next/link';
import { OrderItem as OrderItemType } from '@/constants';
import Badge from '../../components/common/badge';

type Props = {
  item: OrderItemType;
}

export default function OrderItem({ item }: Props) {
  return (
    <Link href={`/items/${item.id}`} className='block hover:bg-gray-50'>
      <div className='flex items-start justify-between py-4'>
        <div className='flex-grow'>
          {item.badge && <Badge {...item.badge} className='mb-1' />}
          <h3 className='text-lg font-bold'>{item.title}</h3>
          {item.description && (
            <p className='mt-1 whitespace-pre-line text-sm text-gray-600'>
              {item.description}
            </p>
          )}
          <p className='mt-2 font-semibold'>
            {item.price > 0 ? `₩${item.price.toLocaleString()}` : ''}
          </p>
        </div>
        {item.image && (
          <div className='relative ml-4 h-32 w-32 flex-shrink-0'>
            <Image
              src={item.image}
              alt={item.title}
              fill
              className='object-cover rounded-lg'
            />
          </div>
        )}
      </div>
    </Link>
  );
}
