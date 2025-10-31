import CardItem from '@/components/common/card-item';

export default function CouponSkeleton() {
  return (
    <div className='flex flex-col p-4 h-full'>
      <CardItem>
        <div className='animate-pulse'>
          <div className='flex justify-between items-center mb-4'>
            <div className='h-7 bg-gray-300 rounded w-36'></div>
            <div className='h-10 bg-gray-300 rounded-lg w-32'></div>
          </div>

          <table className='w-full text-left'>
            <thead>
              <tr className='border-b text-gray-400'>
                <th className='p-2 w-[15%]'>
                  <div className='h-8 bg-gray-200 rounded'></div>
                </th>
                <th className='p-2 w-[15%]'>
                  <div className='h-8 bg-gray-200 rounded'></div>
                </th>
                <th className='p-2 w-[15%]'>
                  <div className='h-8 bg-gray-200 rounded'></div>
                </th>
                <th className='p-2 w-[5%]'>
                  <div className='h-8 bg-gray-200 rounded'></div>
                </th>
                <th className='p-2 w-[5%]'>
                  <div className='h-8 bg-gray-200 rounded'></div>
                </th>
                <th className='p-2 w-[20%]'>
                  <div className='h-8 bg-gray-200 rounded'></div>
                </th>
                <th className='p-2 w-[10%]'>
                  <div className='h-8 bg-gray-200 rounded'></div>
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(4)].map((_, index) => (
                <tr
                  key={index}
                  className='border-b last:border-b-0  text-gray-400'
                >
                  <td className='p-2'>
                    <div className='h-10 bg-gray-200 rounded'></div>
                  </td>
                  <td className='p-2'>
                    <div className='h-10 bg-gray-200 rounded'></div>
                  </td>
                  <td className='p-2'>
                    <div className='h-10 bg-gray-200 rounded'></div>
                  </td>
                  <td className='p-2 flex justify-center items-center'>
                    <div className='h-10 bg-gray-200 rounded-full w-14'></div>
                  </td>
                  <td className='p-2'>
                    <div className='h-10 bg-gray-200 rounded w-3/4'></div>
                  </td>
                  <td className='p-2'>
                    <div className='h-10 bg-gray-200 rounded'></div>
                  </td>
                  <td className='p-2'>
                    <div className='flex gap-4 justify-center items-center'>
                      <div className='h-5 w-5 bg-gray-200 rounded'></div>
                      <div className='h-5 w-5 bg-gray-200 rounded'></div>
                    </div>
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