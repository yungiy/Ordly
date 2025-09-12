import CardItem from '@/components/common/card-item';
// import Calendar from '@/components/common/calendar';

export default function StatisticsPage() {
  return (
    <div className='flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 sm:p-2 lg:p-4'>
      
      {/* 1. 캘린더 섹션 */}
      <div className='lg:col-span-1'>
        <CardItem title='날짜 선택' className='h-full'>
          {/* <Calendar /> */}
          <p>캘린더가 여기에 표시됩니다.</p>
        </CardItem>
      </div>

      {/* 2. 통계 데이터 섹션 (Grid에서 Flexbox로 변경) */}
      {/* ✅ flex flex-col을 사용하여 내부 아이템을 세로로 배치합니다. */}
      <div className='lg:col-span-2 flex flex-col gap-4'>
        
        {/* KPI 카드 섹션 */}
        {/* ✅ flex-wrap으로 작은 화면에서 KPI 카드가 다음 줄로 넘어가게 합니다. */}
        <div className='lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4'>
          {/* ✅ w-* 클래스가 없으면 내용물 크기에 맞게 자동으로 조절됩니다. */}
          <CardItem title='선택일 총 매출'>
            <span className='text-xl font-bold'>₩ 870,000</span>
          </CardItem>
          <CardItem title='선택일 주문 건수'>
            <span className='text-xl font-bold'>98 건</span>
          </CardItem>
          <CardItem title='객단가'>
            <span className='text-xl font-bold'>₩ 8,877</span>
          </CardItem>
        </div>

        {/* ✅ flex-grow를 사용하여 남은 세로 공간을 모두 차지하도록 합니다. */}
        <div className='flex-grow'>
          <CardItem title='선택 기간 매출 추이' className='h-full'>
            <p>선택된 기간의 매출 그래프가 여기에 표시됩니다.</p>
          </CardItem>
        </div>

        {/* ✅ flex-grow를 사용하여 남은 세로 공간을 모두 차지하도록 합니다. */}
        <div className='flex-grow'>
          <CardItem title='선택 기간 인기 메뉴' className='h-full'>
            <p>선택된 기간의 인기 메뉴 목록이 여기에 표시됩니다.</p>
          </CardItem>
        </div>
      </div>
    </div>
  );
}