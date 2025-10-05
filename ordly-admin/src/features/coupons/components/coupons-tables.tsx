import Button from '@/components/common/button';
import CardItem from '@/components/common/card-item';
import { Coupon } from '@prisma/client';
import { PlusCircle } from 'lucide-react';

type Props = {
  coupons: Coupon[];
  onAddNewCoupon: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function CouponTable({
  coupons,
  onAddNewCoupon,
  onEdit,
  onDelete,
}: Props) {
  return (
    <CardItem className='flex-grow flex flex-col'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-bold text-gray-800'>전체 쿠폰 목록</h2>
        <Button
          onClick={onAddNewCoupon}
          className='h-auto w-auto bg-amber-400 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2'
        >
          <PlusCircle size={20} />새 쿠폰 추가
        </Button>
      </div>
      <div className='flex-grow overflow-y-auto'>
        <table className='w-full text-center'>
          <thead>
            <tr className='border-b border-b-gray-300'>
              <th className='p-2'>쿠폰이름</th>
              <th className='p-2'>쿠폰코드</th>
              <th className='p-2'>타입</th>
              <th className='p-2'>할인 값</th>
              <th className='p-2'>유효 기간</th>
              <th className='p-2'>작업</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr
                key={coupon.id}
                className='border-b border-b-gray-300 last:border-b-0'
              >
                <td className='p-2 font-medium'>{coupon.description}</td>
                <td className='p-2'>{coupon.code}</td>
                <td className='p-2'>
                  {coupon.discountType === 'FIXED_AMOUNT' ? '정액' : '정률'}
                </td>
                <td className='p-2'>{String(coupon.discountValue)}</td>
                <td className='p-2'>{`${
                  new Date(coupon.validFrom).toISOString().split('T')[0]
                } ~ ${
                  new Date(coupon.validUntil).toISOString().split('T')[0]
                }`}</td>
                <td className='p-2 flex gap-2'>
                  <Button
                    onClick={() => onEdit(coupon.id)}
                    className='flex font-semibold text-blue-600'
                  >
                    수정
                  </Button>
                  <Button
                    onClick={() => onDelete(coupon.id)}
                    className='flex font-semibold text-red-600'
                  >
                    삭제
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardItem>
  );
}
