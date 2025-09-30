import BarChart from './charts/bar-chart';
import LineChart from './charts/line-chart';

const barChartDemoData = [
  { name: '아메리카노', sales: 430000 },
  { name: '카페라떼', sales: 280000 },
  { name: '치즈케이크', sales: 190000 },
  { name: '감바스', sales: 310000 },
  { name: 'IPA', sales: 150000 },
];

const lineChartDemoData = [
  { name: '1월', sales: 400000 },
  { name: '2월', sales: 300000 },
  { name: '3월', sales: 500000 },
  { name: '4월', sales: 450000 },
  { name: '5월', sales: 600000 },
  { name: '6월', sales: 550000 },
  { name: '7월', sales: 700000 },
];

export default function GraphVisualizer() {
  return (
    <div className='flex flex-col space-y-2'>
      <div>
        <h2 className='text-xl font-bold mb-4'>메뉴별 매출 현황</h2>
        <div className='h-[300px]'>
          <BarChart data={barChartDemoData} dataKey='sales' />
        </div>
      </div>
      <div>
        <h2 className='text-xl font-bold mb-4'>월별 매출 추이</h2>
        <div className='h-[300px]'>
          <LineChart data={lineChartDemoData} dataKey='sales' />
        </div>
      </div>
    </div>
  );
}
