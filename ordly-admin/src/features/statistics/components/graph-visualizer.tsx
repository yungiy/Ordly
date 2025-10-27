'use client';

import { useMemo } from 'react';
import BarChart from './charts/bar-chart';
import LineChart from './charts/line-chart';

const allSalesData = [

  { date: '2023-11-01', name: '아메리카노', sales: 150000 },
  { date: '2023-11-05', name: '라떼', sales: 120000 },
  { date: '2023-11-10', name: '소금빵', sales: 80000 },
  { date: '2023-11-15', name: '바스크 치즈케이크', sales: 70000 },
  { date: '2023-11-20', name: '초코라떼', sales: 50000 },
  { date: '2023-11-25', name: '아메리카노', sales: 280000 },
  { date: '2023-11-28', name: '라떼', sales: 230000 },
  { date: '2023-11-30', name: '소금빵', sales: 100000 },

  { date: '2023-10-03', name: '아메리카노', sales: 180000 },
  { date: '2023-10-08', name: '라떼', sales: 150000 },
  { date: '2023-10-12', name: '소금빵', sales: 90000 },
  { date: '2023-10-18', name: '바스크 치즈케이크', sales: 80000 },
  { date: '2023-10-22', name: '초코라떼', sales: 60000 },
  { date: '2023-10-28', name: '아메리카노', sales: 320000 },
];

type Props = {
  startDate: string;
  endDate: string;
};

export default function GraphVisualizer({ startDate, endDate }: Props) {
  const { barChartData, lineChartData } = useMemo(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const menuSales: { [key: string]: number } = {};
    allSalesData.forEach((item) => {
      const itemDate = new Date(item.date);
      if (itemDate >= start && itemDate <= end) {
        if (!menuSales[item.name]) {
          menuSales[item.name] = 0;
        }
        menuSales[item.name] += item.sales;
      }
    });

    const barChartData = Object.keys(menuSales)
      .map((name) => ({
        name,
        sales: menuSales[name],
      }))
      .sort((a, b) => b.sales - a.sales);


    const dailySales: { [key: string]: number } = {};
    allSalesData.forEach((item) => {
      const itemDate = new Date(item.date);
      if (itemDate >= start && itemDate <= end) {
        if (!dailySales[item.date]) {
          dailySales[item.date] = 0;
        }
        dailySales[item.date] += item.sales;
      }
    });

    const lineChartData = Object.keys(dailySales)
      .map((date) => ({
        name: date.substring(5),
        sales: dailySales[date],
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    return { barChartData, lineChartData };
  }, [startDate, endDate]);

  return (
    <div className='flex flex-col space-y-2'>
      <div>
        <h2 className='text-lg font-bold mb-2'>메뉴별 매출 현황</h2>
        <div className='h-[300px]'>
          <BarChart data={barChartData} dataKey='name' />
        </div>
      </div>
      <div>
        <h2 className='text-lg font-bold mb-2'>월별 매출 추이</h2>
        <div className='h-[300px]'>
          <LineChart data={lineChartData} dataKey='name' />
        </div>
      </div>
    </div>
  );
}
