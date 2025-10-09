import Graph from './graph';
import PopMenuList from './pop-menu-list';

export default function StatisticPage() {
  return (
    <div className='flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 sm:p-2 lg:p-4 h-full'>
      <div className='lg:col-span-1 flex flex-col gap-4'>
        <PopMenuList />
      </div>
      <div className='lg:col-span-2 flex flex-col gap-4'>
        <Graph />
      </div>
    </div>
  );
}
