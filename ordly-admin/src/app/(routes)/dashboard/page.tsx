import CardItem from '@/components/common/card-item';

export default function Dashboard() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 md:grid-rows-[1fr_2fr] gap-4 flex-grow p-4 sm:p-2 lg:p-4'>
     
      <div className='md:col-span-1 md:row-span-1'>
        <CardItem title='메뉴 (진행중)'>
          <p>진행중인 주문 3건</p>
        </CardItem>
      </div>

      <div className='md:col-span-1 md:row-span-1'>
        <CardItem title='메뉴 (완료)'>
          <p>오늘 완료된 주문 15건</p>
        </CardItem>
      </div>

      <div className='md:col-span-1 md:row-span-2'>
        <CardItem title='오늘 예약' >
          <ul className='space-y-2'>
            <li>14:00 - 김OO 님 (4명)</li>
            <li>18:30 - 박XX 님 (2명)</li>
          </ul>
        </CardItem>
      </div>

      <div className='md:col-span-2 md:row-span-1'>
        <CardItem title='이번달 매출 그래프'>
          <p>그래프가 여기에 표시됩니다.</p>
        </CardItem>
      </div>
    </div>
  );
}