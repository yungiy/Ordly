export default function MenuListSkeleton() {
  return (
    <div className='space-y-2 animate-pulse'>
      {[...Array(5)].map((_, index) => (
        <div key={index} className='flex items-center justify-between h-8'>
          <div className='w-8 h-6 bg-gray-200 rounded-md'></div>
          <div className='w-3/5 h-6 bg-gray-200 rounded-md'></div>
          <div className='w-1/8 h-6 bg-gray-200 rounded-md'></div>
        </div>
      ))}
    </div>
  );
}
