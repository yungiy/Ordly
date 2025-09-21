import Button from '@/components/common/button';
import { PlusCircle } from 'lucide-react';
import { Coupons } from '@/types/types';
import CardItem from '@/components/common/card-item';

type Props = {
  coupons: Coupons[];
}

export default function CouponTable({ coupons }: Props) {
  return (
    <CardItem className='flex-grow flex flex-col'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-bold text-gray-800'>전체 쿠폰 목록</h2>
        <Button className='h-auto w-auto bg-amber-400 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2'>
          <PlusCircle size={20} />새 쿠폰 추가
        </Button>
      </div>
      <div className='flex-grow overflow-y-auto'>
        <table className='w-full text-left'>
          <thead>
            <tr className='border-b border-b-gray-300'>
              <th className='p-2'>쿠폰 이름</th>
              <th className='p-2'>타입</th>
              <th className='p-2'>상태</th>
              <th className='p-2'>사용 횟수</th>
              <th className='p-2'>작업</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon.id} className='border-b border-b-gray-300 last:border-b-0'>
                <td className='p-2 font-medium'>{coupon.name}</td>
                <td className='p-2'>{coupon.type}</td>
                <td className='p-2'>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      coupon.status === '활성'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {coupon.status}
                  </span>
                </td>
                <td className='p-2'>{coupon.usedCount}회</td>
                <td className='p-2'>
                  <Button className='flex font-semibold text-blue-600'>수정</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardItem>
  );
}