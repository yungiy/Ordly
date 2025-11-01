'use client';

import {
  Area,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  TooltipProps,
} from 'recharts';

type ChartData = {
  [key: string]: string | number;
  sales: number;
};

type Props = {
  data: ChartData[];
  dataKey: string;
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: any[];
  label?: string | number;
}) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className='p-2 bg-gray-300 text-white rounded-md opacity-90'>
        <p className='font-bold text-gray-800'>{`${label}`}</p>
        <div className='flex items-center gap-2 mt-1'>
          <div
            className='w-2 h-2 rounded-full'
            style={{ backgroundColor: data.color }}
          />
          <p className='font-semibold text-gray-600 text-sm'>
            {new Intl.NumberFormat('ko-KR').format(data.value ?? 0)}원
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default function LineChart({ data, dataKey }: Props) {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <RechartsLineChart
        data={data}
      >
        <defs>
          <linearGradient id='colorSalesLine' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#f59e0b' stopOpacity={0.4} />
            <stop offset='95%' stopColor='#f59e0b' stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
        <XAxis
          dataKey={dataKey}
          stroke='#a0a0a0'
          fontSize={11}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke='#a0a0a0'
          fontSize={11}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: number) =>
            `₩${new Intl.NumberFormat('ko-KR').format(value)}`
          }
        />
        <Tooltip
          cursor={{ stroke: '#f59e0b', strokeWidth: 1, strokeDasharray: '3 3' }}
          content={<CustomTooltip />}
        />
        <Area type='monotone' dataKey='sales' stroke='none' fill='url(#colorSalesLine)' />
        <Line
          type='monotone'
          dataKey='sales'
          name='매출'
          stroke='#f59e0b'
          strokeWidth={2}
          dot={{ r: 0, strokeWidth: 2, fill: '#f59e0b' }}
          activeDot={{
            r: 6,
            stroke: '#f59e0b',
            fill: '#ffffff',
            strokeWidth: 2,
          }}
          animationDuration={300}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
