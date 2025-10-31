import Button from '@/components/common/button';
import CardItem from '@/components/common/card-item';
import { formatDateToYYYYMMDD } from '@/utils/date';
import { Coupon } from '@prisma/client';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';

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
  const discountTypeBadge: Record<Coupon['discountType'], string> = {
    FIXED_AMOUNT: 'bg-blue-100 text-blue-800',
    PERCENTAGE: 'bg-purple-100 text-purple-800',
  };

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
      <div className='flex-grow overflow-auto'>
        <table className='w-full text-sm text-left text-gray-500'>
          <thead className='uppercase rounded-3xl bg-gray-100'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                쿠폰 이름
              </th>
              <th scope='col' className='px-6 py-3'>
                쿠폰 설명
              </th>
              <th scope='col' className='px-6 py-3'>
                쿠폰 코드
              </th>
              <th scope='col' className='px-6 py-3'>
                타입
              </th>
              <th scope='col' className='px-6 py-3'>
                할인 값
              </th>
              <th scope='col' className='px-6 py-3'>
                유효 기간
              </th>
              <th scope='col' className='px-6 py-3 text-center'>
                작업
              </th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon.id} className='hover:bg-gray-50'>
                <td className='px-6 py-2 font-medium text-gray-900 whitespace-nowrap'>
                  {coupon.title}
                </td>
                <td className='px-6 py-2'>{coupon.description}</td>
                <td className='px-6 py-2'>{coupon.code}</td>
                <td className='px-6 py-2'>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      discountTypeBadge[coupon.discountType]
                    }`}
                  >
                    {coupon.discountType === 'FIXED_AMOUNT' ? '정액' : '정률'}
                  </span>
                </td>
                <td className='px-6 py-4'>{String(coupon.discountValue)}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{`${formatDateToYYYYMMDD(
                  new Date(coupon.validFrom)
                )} ~ ${formatDateToYYYYMMDD(new Date(coupon.validUntil))}`}</td>
                <td className='px-6 py-4 flex justify-center gap-2'>
                  <Button
                    onClick={() => onEdit(coupon.id)}
                    className='p-2 text-blue-600'
                  >
                    <Pencil size={18} />
                  </Button>
                  <Button
                    onClick={() => onDelete(coupon.id)}
                    className='p-2 text-red-600'
                  >
                    <Trash2 size={18} />
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
