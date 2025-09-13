import StatisticItem from './statistic-item';

const stats = {
  totalSales: '₩ 870,000',
  orderCount: '98 건',
  avgPerCustomer: '₩ 8,877',
};

export default function StatisticGrid() {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
      <StatisticItem title='선택일 총 매출' value={stats.totalSales} />
      <StatisticItem title='선택일 주문 건수' value={stats.orderCount} />
      <StatisticItem title='객단가' value={stats.avgPerCustomer} />
    </div>
  );
}
