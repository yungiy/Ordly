import CardItem from '@/components/common/card-item';

export default function MenuPageSkeleton() {
  return (
    <div className='flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-2'>
      
      <div className='md:col-span-1'>
        <CardItem>
          <div className='animate-pulse'>
            <div className='flex justify-between items-center mb-6'>
              <div className='h-8 w-24 bg-gray-300 rounded'></div>
              <div className='h-10 w-32 bg-gray-300 rounded-md'></div>
            </div>

            {[...Array(3)].map((_, categoryIndex) => (
              <div key={categoryIndex} className='mb-8 last:mb-0'>
                <div className='flex justify-between items-center mb-4'>
                  <div className='h-7 w-28 bg-gray-300 rounded'></div>
                  <div className='h-7 w-7 bg-gray-300 rounded-full'></div>
                </div>

                {[...Array(2)].map((_, itemIndex) => (
                  <div
                    key={itemIndex}
                    className='flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0'
                  >
                    <div className='flex items-center min-w-0'>
                      <div className='w-16 h-16 bg-gray-300 rounded-md flex-shrink-0'></div>
                      <div className='ml-4 space-y-2'>
                        <div className='h-5 w-32 bg-gray-300 rounded'></div>
                        <div className='h-4 w-48 bg-gray-200 rounded'></div>
                        <div className='h-5 w-20 bg-gray-200 rounded'></div>
                      </div>
                    </div>
                    
                    <div className='flex items-center gap-3 flex-shrink-0'>
                      <div className='flex flex-col items-center'>
                        <div className='w-12 h-6 bg-gray-300 rounded-full'></div>
                        <div className='h-3 w-10 bg-gray-200 rounded mt-1'></div>
                      </div>
                      <div className='w-6 h-6 bg-gray-300 rounded'></div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </CardItem>
      </div>

      <div className='md:col-span-1'>
        <CardItem className='flex flex-col h-full items-center justify-center'>
          <div className='animate-pulse w-full flex flex-col items-center space-y-2'>
            <div className='h-4 bg-gray-200 rounded w-3/4'></div>
          </div>
        </CardItem>
      </div>
    </div>
  );
}