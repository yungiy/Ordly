import HourlySalesChart from './hourly-sales-chart';
import PopMenuList from './pop-menu-list';
import SalesChart from './sales-chart';
import StatisticCalendar from './statistic-calendar';
import StatisticGrid from './statistic-grid';

const popularMenus = [
  { rank: 1, name: '아메리카노', orders: 125 },
  { rank: 2, name: '카페라떼', orders: 98 },
  { rank: 3, name: '치즈케이크', orders: 76 },
  { rank: 4, name: '감바스', orders: 54 },
  { rank: 5, name: 'IPA', orders: 48 },
];

export default function StatisticPage() {
  return (
    <div className='flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 sm:p-2 lg:p-4 h-full'>
      <div className='lg:col-span-1 flex flex-col gap-4'>
        <div className='h-1/2'>
          <StatisticCalendar />
        </div>
        <div className='h-1/2'>
          <PopMenuList menus={popularMenus} />
        </div>
      </div>
      <div className='lg:col-span-2 flex flex-col gap-4'>
        <StatisticGrid />
        <HourlySalesChart />
        <SalesChart />
      </div>
    </div>
  );
}
