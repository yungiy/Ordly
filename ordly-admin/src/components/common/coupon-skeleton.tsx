import CardItem from '@/components/common/card-item';

export default function CouponSkeleton() {
  return (
    <div className='flex flex-col p-4 h-full'>
      <CardItem>
        <div className='animate-pulse'>
          {/* 헤더 스켈레톤 */}
          <div className='flex justify-between items-center mb-4'>
            <div className='h-7 bg-gray-200 rounded w-1/4'></div>
            <div className='h-10 bg-gray-200 rounded-lg w-32'></div>
          </div>

          {/* 테이블 스켈레톤 */}
          <table className='w-full text-left'>
            {/* 테이블 헤더 */}
            <thead>
              <tr className='border-b text-gray-400'>
                <th className='p-2 w-[20%]'>
                  <div className='h-4 bg-gray-200 rounded'></div>
                </th>
                <th className='p-2 w-[20%]'>
                  <div className='h-4 bg-gray-200 rounded'></div>
                </th>
                <th className='p-2 w-[10%]'>
                  <div className='h-4 bg-gray-200 rounded'></div>
                </th>
                <th className='p-2 w-[10%]'>
                  <div className='h-4 bg-gray-200 rounded'></div>
                </th>
                <th className='p-2 w-[20%]'>
                  <div className='h-4 bg-gray-200 rounded'></div>
                </th>
                <th className='p-2 w-[10%]'>
                  <div className='h-4 bg-gray-200 rounded'></div>
                </th>
                <th className='p-2 w-[10%]'>
                  <div className='h-4 bg-gray-200 rounded'></div>
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(12)].map((_, index) => (
                <tr
                  key={index}
                  className='border-b last:border-b-0  text-gray-400'
                >
                  <td className='p-2'>
                    <div className='h-5 bg-gray-200 rounded'></div>
                  </td>
                  <td className='p-2'>
                    <div className='h-5 bg-gray-200 rounded'></div>
                  </td>
                  <td className='p-2'>
                    <div className='h-5 bg-gray-200 rounded'></div>
                  </td>
                  <td className='p-2'>
                    <div className='h-5 bg-gray-200 rounded'></div>
                  </td>
                  <td className='p-2'>
                    <div className='h-5 bg-gray-200 rounded'></div>
                  </td>
                  <td className='p-2'>
                    <div className='h-5 bg-gray-200 rounded-full w-14'></div>
                  </td>
                  <td className='p-2'>
                    <div className='h-5 bg-gray-200 rounded w-12'></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardItem>
    </div>
  );
}
