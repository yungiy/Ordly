'use client';

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
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
            style={{ backgroundColor: data.fill }}
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

export default function BarChart({ data, dataKey }: Props) {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <RechartsBarChart data={data}>
        <defs>
          {data.map((entry, index) => (
            <linearGradient
              key={`color-${index}`}
              id={`colorBar-${index}`}
              x1='0'
              y1='0'
              x2='0'
              y2='1'
            >
              <stop
                offset='5%'
                stopColor={COLORS[index % COLORS.length]}
                stopOpacity={0.8}
              />
              <stop
                offset='95%'
                stopColor={COLORS[index % COLORS.length]}
                stopOpacity={0.4}
              />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
        <XAxis
          dataKey={dataKey}
          stroke='#a0a0a0'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke='#a0a0a0'
          fontSize={10}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: number) =>
            `₩${new Intl.NumberFormat('ko-KR').format(value)}`
          }
        />
        <Tooltip
          cursor={{ fill: 'rgba(240, 240, 240, 0.5)' }}
          content={<CustomTooltip />}
        />
        <Bar dataKey='sales' name='매출' radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={`url(#colorBar-${index})`} />
          ))}
        </Bar>
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
