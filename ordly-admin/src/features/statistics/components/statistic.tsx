import PopMenuList from './pop-menu-list';
import SalesChart from './sales-chart';
import StatisticCalendar from './statistic-calendar';
import StatisticGrid from './statistic-grid';

export default function Statistic() {
  return (
    <div className='flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 sm:p-2 lg:p-4 h-full'>
      <div className='lg:col-span-1'>
        <StatisticCalendar />
      </div>

      <div className='lg:col-span-2 flex flex-col gap-4'>
        <StatisticGrid />
        <div className='flex-grow'>
          <SalesChart/>
        </div>
        <div className='flex-grow'>
          <PopMenuList />
        </div>
      </div>
    </div>
  );
}
