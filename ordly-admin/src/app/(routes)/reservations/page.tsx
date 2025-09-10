import CardItem from '@/components/common/card-item';

export default function MenuPage() {
  return (
    <div className='flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 sm:p-2 lg:p-4'>
      <div className='md:col-span-2'>
        <CardItem className='h-full'>
          <p>캘린더</p>
        </CardItem>
      </div>
      <div className='md:col-span-1'>
        <CardItem className='h-full'>
          <p>오늘 일정</p>
        </CardItem>
      </div>
    </div>
  );
}
