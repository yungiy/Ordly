import React from 'react';

const SkeletonItem = React.memo(function SkeletonItem() {
  return (
    <div className='flex items-start justify-between py-2 border-b border-gray-100 last:border-b-0'>
      <div className='flex-grow space-y-3'>
        <div className='h-5 bg-gray-300 rounded-md w-1/2'></div>

        <div className='h-4 bg-gray-200 rounded-md w-3/4'></div>

        <div className='h-5 bg-gray-300 rounded-md w-1/3'></div>
      </div>
      <div className='ml-4 h-28 w-28 flex-shrink-0 bg-gray-200 rounded-lg'></div>
    </div>
  );
});

function MenusSkeleton() {
  return (
    <div className='animate-pulse px-4 py-2 bg-white'>
      <div className='flex items-center space-x-2 py-2'>
        {[...Array(5)].map((_, i) => (
          <div key={i} className='h-9 w-20 bg-gray-200 rounded-full'></div>
        ))}
      </div>

      <div className='py-6 flex items-center gap-2'>
        <div className='flex-grow border-t-2 border-gray-200'></div>
        <div className='h-7 w-24 bg-gray-200 rounded-full'></div>
        <div className='flex-grow border-t-2 border-gray-200'></div>
      </div>

      <div>
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
      </div>
    </div>
  );
}

export default React.memo(MenusSkeleton);
