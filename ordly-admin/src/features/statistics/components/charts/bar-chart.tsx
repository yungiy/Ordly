'use client';

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

type ChartData = {
  name: string;
  sales: number;
};

type Props = {
  data: ChartData[];
  dataKey: string;
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

export default function BarChart({ data, dataKey }: Props) {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <RechartsBarChart
        data={data}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
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
          cursor={{ fill: 'transparent' }}
          formatter={(value: number) => [
            `${new Intl.NumberFormat('ko-KR').format(value)}원`,
            '매출',
          ]}
        />
        <Bar dataKey='sales' radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
