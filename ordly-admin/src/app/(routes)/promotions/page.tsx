import CardItem from '@/components/common/card-item';
import Button from '@/components/common/button';
import { PlusCircle } from 'lucide-react';

// 쿠폰 데이터 및 타입 정의...
type CouponStatus = '활성' | '기간 만료';
type CouponType = '정률' | '정액';
interface Coupon {
  id: number;
  name: string;
  type: CouponType;
  status: CouponStatus;
  usedCount: number;
}
const sampleCoupons: Coupon[] = [
  {
    id: 1,
    name: '신규 고객 10% 할인',
    type: '정률',
    status: '활성',
    usedCount: 152,
  },
  {
    id: 2,
    name: '배달비 무료 쿠폰',
    type: '정액',
    status: '활성',
    usedCount: 89,
  },
  {
    id: 3,
    name: '오픈 기념 1,000원 할인',
    type: '정액',
    status: '기간 만료',
    usedCount: 250,
  },
];

export default function PromotionPage() {
  return (
    <div className='flex flex-col flex-1 gap-4 p-4 sm:p-2 lg:p-4'>
      {/* 1. 쿠폰 KPI 섹션 */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        <CardItem title='쿠폰으로 할인된 총액'>
          <p className='text-2xl font-bold text-green-600'>₩ 432,500</p>
        </CardItem>
        <CardItem title='쿠폰 기여 매출'>
          <p className='text-2xl font-bold text-blue-600'>₩ 3,120,000</p>
        </CardItem>
        <CardItem title='총 사용 횟수'>
          <p className='text-2xl font-bold'>591 회</p>
        </CardItem>
        <CardItem title='평균 회수율'>
          <p className='text-2xl font-bold'>35%</p>
        </CardItem>
      </div>

      {/* 2. 쿠폰 목록 테이블 */}
      <CardItem className='flex-grow flex flex-col'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-bold text-gray-800'>전체 쿠폰 목록</h2>
          <Button className='w-auto h-auto bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center gap-2'>
            <PlusCircle size={20} />새 쿠폰 추가
          </Button>
        </div>
        <div className='flex-grow overflow-y-auto'>
          <table className='w-full text-left'>
            <thead>
              <tr className='border-b'>
                <th className='p-2'>쿠폰 이름</th>
                <th className='p-2'>타입</th>
                <th className='p-2'>상태</th>
                <th className='p-2'>사용 횟수</th>
                <th className='p-2'>작업</th>
              </tr>
            </thead>
            <tbody>
              {sampleCoupons.map((coupon) => (
                <tr key={coupon.id} className='border-b last:border-b-0'>
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
                    <button className='text-blue-600 hover:underline'>
                      수정
                    </button>
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
