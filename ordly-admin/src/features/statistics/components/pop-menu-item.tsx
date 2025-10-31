type Props = {
  rank: number;
  name: string;
  orders: number;
};

export default function PopularMenuItem({ rank, name, orders }: Props) {
  const rankColor =
    rank === 1
      ? 'bg-yellow-400 text-white'
      : rank === 2
      ? 'bg-gray-400 text-white'
      : rank === 3
      ? 'bg-amber-600 text-white'
      : 'bg-gray-200 text-gray-700';

  return (
    <div className='flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0'>
      <div className='flex items-center gap-4'>
        <span
          className={`flex items-center justify-center w-7 h-7 rounded-full font-bold text-sm ${rankColor}`}
        >
          {rank}
        </span>
        <span className='font-semibold text-gray-800'>{name}</span>
      </div>
      <span className='font-medium text-gray-600'>
        {orders.toLocaleString()}
        <span className='ml-1 text-xs font-normal'>건</span>
      </span>
    </div>
  );
}
