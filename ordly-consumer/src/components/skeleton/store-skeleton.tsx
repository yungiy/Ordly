export default function StoreSkeleton() {
  return (
    <div className='flex flex-col h-full bg-gray-50'>
      <div className='animate-pulse'>
        <header className='sticky top-0 z-10 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4'>
          <div className='h-6 w-6 bg-gray-300 rounded-md'></div>
          <div className='h-6 w-24 bg-gray-300 rounded-md'></div>
          <div className='w-6'></div>
        </header>

        <main className='p-4'>
          <div className='bg-white px-4 py-6 shadow-sm rounded-lg'>
            <div className='h-80 w-full bg-gray-300 rounded-md mb-8'></div>

            <div className='space-y-8'>
              <div className='flex items-start gap-4'>
                <div className='h-6 w-6 flex-shrink-0 bg-gray-300 rounded-full'></div>
                <div className='w-full space-y-2'>
                  <div className='h-5 w-16 bg-gray-300 rounded'></div>
                  <div className='h-4 w-3/4 bg-gray-200 rounded'></div>
                </div>
              </div>

              <div className='flex items-start gap-4'>
                <div className='h-6 w-6 flex-shrink-0 bg-gray-300 rounded-full'></div>
                <div className='w-full space-y-2'>
                  <div className='h-5 w-24 bg-gray-300 rounded'></div>
                  <div className='h-4 w-1/2 bg-gray-200 rounded'></div>
                </div>
              </div>

              <div className='flex items-start gap-4'>
                <div className='h-6 w-6 flex-shrink-0 bg-gray-300 rounded-full'></div>
                <div className='w-full space-y-2'>
                  <div className='h-5 w-24 bg-gray-300 rounded'></div>
                  <div className='h-4 w-3/5 bg-gray-200 rounded'></div>
                  <div className='h-4 w-3/5 bg-gray-200 rounded'></div>
                  <div className='h-4 w-4/5 bg-gray-200 rounded'></div>
                  <div className='h-4 w-1/4 bg-gray-200 rounded'></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
