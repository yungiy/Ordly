'use client';

import { useMemo } from 'react';
import BarChart from './charts/bar-chart';
import LineChart from './charts/line-chart';
import { processBarChartData, processLineChartData } from '@/utils/statistics';

const salesData = [
  { date: '2023-11-01', name: '아메리카노', sales: 150000 },
  { date: '2023-11-01', name: '소금빵', sales: 45000 },
  { date: '2023-11-02', name: '라떼', sales: 110000 },
  { date: '2023-11-02', name: '바스크 치즈케이크', sales: 65000 },
  { date: '2023-11-03', name: '아메리카노', sales: 170000 },
  { date: '2023-11-03', name: '초코라떼', sales: 55000 },
  { date: '2023-11-04', name: '라떼', sales: 140000 },
  { date: '2023-11-04', name: '소금빵', sales: 90000 },
  { date: '2023-11-05', name: '아메리카노', sales: 220000 },
  { date: '2023-11-05', name: '라떼', sales: 120000 },
  { date: '2023-11-05', name: '바스크 치즈케이크', sales: 80000 },
  { date: '2023-11-06', name: '아메리카노', sales: 130000 },
  { date: '2023-11-07', name: '라떼', sales: 100000 },
  { date: '2023-11-08', name: '소금빵', sales: 60000 },
  { date: '2023-11-08', name: '초코라떼', sales: 40000 },
  { date: '2023-11-09', name: '아메리카노', sales: 160000 },
  { date: '2023-11-10', name: '라떼', sales: 115000 },
  { date: '2023-11-10', name: '소금빵', sales: 80000 },
  { date: '2023-11-11', name: '아메리카노', sales: 240000 },
  { date: '2023-11-11', name: '바스크 치즈케이크', sales: 95000 },
  { date: '2023-11-12', name: '라떼', sales: 160000 },
  { date: '2023-11-12', name: '초코라떼', sales: 70000 },
  { date: '2023-11-13', name: '아메리카노', sales: 145000 },
  { date: '2023-11-14', name: '라떼', sales: 105000 },
  { date: '2023-11-15', name: '바스크 치즈케이크', sales: 70000 },
  { date: '2023-11-15', name: '소금빵', sales: 50000 },
  { date: '2023-11-16', name: '아메리카노', sales: 175000 },
  { date: '2023-11-17', name: '라떼', sales: 125000 },
  { date: '2023-11-18', name: '아메리카노', sales: 260000 },
  { date: '2023-11-18', name: '소금빵', sales: 110000 },
  { date: '2023-11-19', name: '라떼', sales: 180000 },
  { date: '2023-11-19', name: '바스크 치즈케이크', sales: 85000 },
  { date: '2023-11-20', name: '초코라떼', sales: 50000 },
  { date: '2023-11-21', name: '아메리카노', sales: 155000 },
  { date: '2023-11-22', name: '라떼', sales: 110000 },
  { date: '2023-11-23', name: '소금빵', sales: 75000 },
  { date: '2023-11-24', name: '아메리카노', sales: 190000 },
  { date: '2023-11-25', name: '아메리카노', sales: 280000 },
  { date: '2023-11-25', name: '라떼', sales: 190000 },
  { date: '2023-11-26', name: '바스크 치즈케이크', sales: 100000 },
  { date: '2023-11-26', name: '초코라떼', sales: 80000 },
  { date: '2023-11-27', name: '아메리카노', sales: 165000 },
  { date: '2023-11-28', name: '라떼', sales: 230000 },
  { date: '2023-11-29', name: '소금빵', sales: 85000 },
  { date: '2023-11-30', name: '아메리카노', sales: 170000 },
  { date: '2023-11-30', name: '소금빵', sales: 100000 },

  { date: '2023-10-01', name: '아메리카노', sales: 140000 },
  { date: '2023-10-02', name: '라떼', sales: 90000 },
  { date: '2023-10-03', name: '아메리카노', sales: 180000 },
  { date: '2023-10-03', name: '소금빵', sales: 60000 },
  { date: '2023-10-04', name: '라떼', sales: 110000 },
  { date: '2023-10-05', name: '바스크 치즈케이크', sales: 50000 },
  { date: '2023-10-06', name: '아메리카노', sales: 160000 },
  { date: '2023-10-07', name: '라떼', sales: 130000 },
  { date: '2023-10-07', name: '소금빵', sales: 80000 },
  { date: '2023-10-08', name: '아메리카노', sales: 210000 },
  { date: '2023-10-08', name: '라떼', sales: 150000 },
  { date: '2023-10-09', name: '초코라떼', sales: 50000 },
  { date: '2023-10-10', name: '아메리카노', sales: 150000 },
  { date: '2023-10-11', name: '라떼', sales: 100000 },
  { date: '2023-10-12', name: '소금빵', sales: 90000 },
  { date: '2023-10-12', name: '바스크 치즈케이크', sales: 60000 },
  { date: '2023-10-13', name: '아메리카노', sales: 170000 },
  { date: '2023-10-14', name: '라떼', sales: 145000 },
  { date: '2023-10-15', name: '아메리카노', sales: 230000 },
  { date: '2023-10-15', name: '초코라떼', sales: 75000 },
  { date: '2023-10-16', name: '라떼', sales: 105000 },
  { date: '2023-10-17', name: '소금빵', sales: 65000 },
  { date: '2023-10-18', name: '아메리카노', sales: 165000 },
  { date: '2023-10-18', name: '바스크 치즈케이크', sales: 80000 },
  { date: '2023-10-19', name: '라떼', sales: 115000 },
  { date: '2023-10-20', name: '소금빵', sales: 85000 },
  { date: '2023-10-21', name: '아메리카노', sales: 250000 },
  { date: '2023-10-21', name: '라떼', sales: 170000 },
  { date: '2023-10-22', name: '바스크 치즈케이크', sales: 90000 },
  { date: '2023-10-22', name: '초코라떼', sales: 60000 },
  { date: '2023-10-23', name: '아메리카노', sales: 150000 },
  { date: '2023-10-24', name: '라떼', sales: 110000 },
  { date: '2023-10-25', name: '소금빵', sales: 70000 },
  { date: '2023-10-26', name: '아메리카노', sales: 180000 },
  { date: '2023-10-27', name: '라떼', sales: 130000 },
  { date: '2023-10-28', name: '아메리카노', sales: 320000 },
  { date: '2023-10-28', name: '바스크 치즈케이크', sales: 110000 },
  { date: '2023-10-29', name: '라떼', sales: 200000 },
  { date: '2023-10-29', name: '소금빵', sales: 100000 },
  { date: '2023-10-30', name: '아메리카노', sales: 160000 },
  { date: '2023-10-31', name: '라떼', sales: 115000 },
  { date: '2023-10-31', name: '초코라떼', sales: 55000 },
];

type Props = {
  startDate: string;
  endDate: string;
};

export default function GraphVisualizer({ startDate, endDate }: Props) {
  const { barChartData, lineChartData } = useMemo(() => {
    const barChartData = processBarChartData(salesData, startDate, endDate);
    const lineChartData = processLineChartData(
      salesData,
      startDate,
      endDate
    );
    return { barChartData, lineChartData };
  }, [startDate, endDate]);

  return (
    <div className='flex flex-col gap-6 mt-4'>
      <div className='p-2 rounded-lg bg-white'>
        <h2 className='text-lg font-bold mb-4 text-gray-700'>메뉴별 매출 현황</h2>
        <div className='h-64'>
          <BarChart data={barChartData} dataKey='name' />
        </div>
      </div>
      <div className='p-2 rounded-lg bg-white'>
        <h2 className='text-lg font-bold mb-4 text-gray-700'>월별 매출 추이</h2>
        <div className='h-64'>
          <LineChart data={lineChartData} dataKey='name' />
        </div>
      </div>
    </div>
  );
}
