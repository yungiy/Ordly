export default function MenuDetailSkeleton() {
  return (
    <div className='flex min-h-screen flex-col bg-white animate-pulse'>
      <main className='flex-grow pb-32'>
        <div className='relative h-80 w-full bg-gray-300'>
          <div className='absolute top-4 left-4 h-10 w-10 rounded-full bg-gray-400/50'></div>
        </div>

        <div className='p-6 space-y-4'>
          <div className='h-8 w-3/5 bg-gray-300 rounded'></div>
          <div className='h-7 w-1/3 bg-gray-300 rounded'></div>
          <div className='h-5 w-4/5 bg-gray-200 rounded'></div>
        </div>
      </main>

      <footer className='fixed bottom-0 left-1/2 w-full max-w-[430px] -translate-x-1/2 transform bg-white'>
        <div className='p-4 border-t border-gray-200 space-y-4'>
          <div className='flex items-center justify-between rounded-lg bg-gray-100 p-3 h-14'>
            <div className='h-6 w-12 bg-gray-300 rounded'></div>
            <div className='h-7 w-28 bg-gray-300 rounded-full'></div>
          </div>

          <div className='h-14 w-full rounded-lg bg-gray-300'></div>
        </div>
      </footer>
    </div>
  );
}
