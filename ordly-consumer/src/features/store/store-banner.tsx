import Image from 'next/image';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

type Props = {
  imageUrl?: string | null;
};

export default function StoreBanner({ imageUrl }: Props) {
  return (
    <div className='relative h-40 w-full'>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt='가게 이미지'
          fill
          sizes='(max-width: 430px) 100vw, 430px'
          className='object-cover'
          priority
        />
      ) : (
        <div className='w-full h-full flex items-center justify-center bg-gray-200'>
          <Loader2 className='h-8 w-8 text-gray-400 animate-spin' />
        </div>
      )}

      <div className='absolute top-3 left-3'>
        <Link href='/order-history' className='cursor-pointer'>
          <div className='flex items-center justify-center rounded-2xl bg-white text-gray-800 h-10 w-auto px-2.5 text-sm'>
            주문내역
          </div>
        </Link>
      </div>
    </div>
  );
}
