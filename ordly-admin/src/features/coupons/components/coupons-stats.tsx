import CardItem from '@/components/common/card-item';

const stats = {
  totalDiscount: '₩ 432,500',
  couponRevenue: '₩ 3,120,000',
  totalUsage: '591 회',
  averageRecoveryRate: '35%',
};

export default function CouponStats() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
      <CardItem title='쿠폰으로 할인된 총액'>
        <p className='text-2xl font-bold text-green-600'>{stats.totalDiscount}</p>
      </CardItem>
      <CardItem title='쿠폰 기여 매출'>
        <p className='text-2xl font-bold text-blue-600'>{stats.couponRevenue}</p>
      </CardItem>
      <CardItem title='총 사용 횟수'>
        <p className='text-2xl font-bold'>{stats.totalUsage}</p>
      </CardItem>
      <CardItem title='평균 회수율'>
        <p className='text-2xl font-bold'>{stats.averageRecoveryRate}</p>
      </CardItem>
    </div>
  );
}