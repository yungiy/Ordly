import CardItem from '@/components/common/card-item';

export default function OrderPage() {
  return (
    <div className='flex-1 flex gap-4 p-4 sm:p-2 lg:p-4'>
      <div className='flex-1 flex'>
        <CardItem title='들어온 주문' className='h-full w-full flex flex-col'>
          <div className='flex-1 overflow-y-auto p-2 space-y-3'></div>
        </CardItem>
      </div>

      <div className='flex-1 flex'>
        <CardItem title='조리 중' className='h-full w-full flex flex-col'>
          <div className='flex-1 overflow-y-auto p-2 space-y-3'></div>
        </CardItem>
      </div>

      <div className='flex-1 flex'>
        <CardItem title='완료' className='h-full w-full flex flex-col'>
          <div className='flex-1 overflow-y-auto p-2 space-y-3'></div>
        </CardItem>
      </div>
    </div>
  );
}
