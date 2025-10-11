import Link from 'next/link';

type Props = {
  name?: string;
};

export default function StoreProfile({ name }: Props) {
  return (
    <div className='flex items-center justify-between'>
      <h1 className='text-2xl font-bold font-mono'>{name}</h1>
      <Link href='/store' className='cursor-pointer'>
        <div className='flex items-center text-sm border border-gray-200 rounded-full px-2.5 py-2 text-gray-500'>
          <span className='fotn-bold'>매장정보</span>
        </div>
      </Link>
    </div>
  );
}
