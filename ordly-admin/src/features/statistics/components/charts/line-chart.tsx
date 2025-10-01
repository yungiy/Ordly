'use client';

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

type ChartData = {
  [key: string]: string | number;
  sales: number;
};

type Props = {
  data: ChartData[];
  dataKey: string;
};

export default function LineChart({ data, dataKey }: Props) {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <RechartsLineChart
        data={data}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray='3 3' stroke='#e0e0e0' />
        <XAxis
          dataKey={dataKey}
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: number) =>
            `₩${new Intl.NumberFormat('ko-KR').format(value)}`
          }
        />
        <Tooltip
          formatter={(value: number) => [
            `${new Intl.NumberFormat('ko-KR').format(value)}원`,
            '매출',
          ]}
        />
        <Line
          type='monotone'
          dataKey='sales'
          stroke='#8884d8'
          strokeWidth={2}
          dot={{ r: 4 }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
