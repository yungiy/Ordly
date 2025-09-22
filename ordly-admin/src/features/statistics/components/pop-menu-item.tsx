type Props = {
  rank: number;
  name: string;
  orders: number;
};

export default function PopularMenuItem({ rank, name, orders }: Props) {
  return (
    <div className='flex items-center justify-between border-b-2 border-b-gray-300 pb-2 last:border-b-0'>
      <div className='flex items-center gap-3'>
        <span className='text-md w-6 text-yellow-400 text-center font-bold'>
          {rank}
        </span>
        <span className='font-semibold'>{name}</span>
      </div>
      <span className='font-bold text-gray-800'>
        {orders}
        <span className='ml-1 text-sm font-normal text-gray-800'>건</span>
      </span>
    </div>
  );
}
