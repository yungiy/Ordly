export default function OrderHistorySkeleton() {
  return (
    <div className='p-4 space-y-6 animate-pulse'>
      {[...Array(2)].map((_, i) => (
        <div key={i} className='bg-white rounded-lg shadow-sm p-4'>
          <div className='flex justify-between items-center border-b border-gray-200 pb-3 mb-3'>
            <div>
              <div className='h-4 bg-gray-200 rounded w-32 mb-2'></div>
              <div className='h-3 bg-gray-200 rounded w-24'></div>
            </div>
            <div className='h-6 w-16 bg-gray-200 rounded-full'></div>
          </div>
          <div className='space-y-3 mt-4'>
            <div className='h-4 bg-gray-200 rounded w-4/5'></div>
            <div className='h-4 bg-gray-200 rounded w-3/4'></div>
          </div>
          <div className='border-t border-gray-200 mt-4 pt-3 flex justify-between'>
            <div className='h-5 bg-gray-200 rounded w-20'></div>
            <div className='h-5 bg-gray-200 rounded w-24'></div>
          </div>
        </div>
      ))}
    </div>
  );
}