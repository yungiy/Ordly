import CardItem from '@/components/common/card-item';

export default function MenuPageSkeleton() {
  return (
    <div className='flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 sm:p-2 lg:p-4'>
      <div className='md:col-span-1'>
        <CardItem>
          <div className='animate-pulse'>
            <div className='flex justify-between items-center mb-6'>
              <div className='h-8 w-24 bg-gray-300 rounded'></div>
              <div className='h-10 w-32 bg-gray-300 rounded-md'></div>
            </div>

            {[...Array(2)].map((_, categoryIndex) => (
              <div key={categoryIndex} className='mb-8 last:mb-0'>
                <div className='h-7 w-1/4 bg-gray-300 rounded mb-2'></div>
                <div className='border-b border-gray-200 mb-4'></div>

                {[...Array(2)].map((_, itemIndex) => (
                  <div
                    key={itemIndex}
                    className='flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0'
                  >
                    <div className='flex items-center'>
                      <div className='w-16 h-16 bg-gray-300 rounded-md'></div>
                      <div className='ml-4 space-y-2'>
                        <div className='h-5 w-32 bg-gray-300 rounded'></div>
                        <div className='h-4 w-48 bg-gray-200 rounded'></div>
                        <div className='h-5 w-20 bg-gray-200 rounded'></div>
                      </div>
                    </div>
                    <div className='w-12 h-6 bg-gray-300 rounded-full'></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </CardItem>
      </div>

      {/* 2. 우측 메뉴 추가/선택 스켈레톤 카드 */}
      {/* [수정 없음] md:col-span-1은 2단 그리드에서도 절반을 의미하므로 그대로 둡니다. */}
      <div className='md:col-span-1'>
        <CardItem className='animate-pulse flex flex-col h-full text-center'>
          <div className='h-4 bg-gray-200 rounded w-5/6 mb-2'></div>
          <div className='h-4 bg-gray-200 rounded w-3/4'></div>
        </CardItem>
      </div>
    </div>
  );
}
