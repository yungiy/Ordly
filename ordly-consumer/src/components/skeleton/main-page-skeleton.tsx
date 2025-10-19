export default function MainPageSkeleton() {
  return (
    <div className='relative min-h-screen bg-gray-50'>
      <div className='space-y-4 p-4 animate-pulse'>
        <div className='flex space-x-2'>
          <div className='h-9 w-20 rounded-full bg-gray-200'></div>
          <div className='h-9 w-20 rounded-full bg-gray-200'></div>
          <div className='h-9 w-16 rounded-full bg-gray-200'></div>
          <div className='h-9 w-12 rounded-full bg-gray-200'></div>
          <div className='h-9 w-16 rounded-full bg-gray-200'></div>
        </div>

        <div className='space-y-4'>
          <div className='h-6 rounded-md bg-gray-200'></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className='flex justify-between items-center'>
              <div className='flex flex-col space-y-3 w-2/3'>
                <div className='h-5 w-3/4 rounded bg-gray-300'></div>
                <div className='h-4 w-5/6 rounded bg-gray-300'></div>
                <div className='h-5 w-1/2 rounded bg-gray-300'></div>
              </div>
              <div className='w-32 h-32 rounded-md bg-gray-300'></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
