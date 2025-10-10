import Link from 'next/link';

export default function StoreProfile() {
  return (
    <div className='flex items-center justify-between'>
      <h1 className='text-2xl font-bold font-mono'>커피인 경주</h1>
      <Link href='/store' className='cursor-pointer'>
        <div className='flex items-center text-sm border border-gray-200 rounded-full px-2.5 py-2 text-gray-500'>
          <span className='fotn-bold'>매장정보</span>
        </div>
      </Link>
    </div>
  );
}
