import CardItem from '@/components/common/card-item';

export default function MenuPage() {
  return (
    <div className='flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 sm:p-2 lg:p-4'>
      <div className='md:col-span-2'>
        <CardItem title='메뉴 목록' className='h-full'>
          <p>등록된 메뉴들이 여기에 표시됩니다.</p>
        </CardItem>
      </div>
      <div className='md:col-span-1'>
        <CardItem title='메뉴 추가' className='h-full'>
          <p>새로운 메뉴를 추가하는 폼이 여기에 표시됩니다.</p>
        </CardItem>
      </div>
    </div>
  );
}
