import CardItem from '@/components/common/card-item';
// 캘린더 컴포넌트 (예시, 실제 라이브러리로 대체 필요)
//import Calendar from '@/components/common/calendar'; 

export default function StatisticsPage() {
  return (

    <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 sm:p-2 lg:p-4">
      <div className="lg:col-span-1">
        <CardItem title="날짜 선택" className="h-full">
          {/* <Calendar />  */}
          <p>캘린더</p>
        </CardItem>
      </div>

      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        <CardItem title="선택일 총 매출">
          <span className="text-2xl font-bold">₩ 870,000</span>
        </CardItem>
        <CardItem title="선택일 주문 건수">
          <span className="text-2xl font-bold">98 건</span>
        </CardItem>

        <div className="md:col-span-2">
          <CardItem title="선택 기간 매출 추이">
            <p>선택된 기간의 매출 그래프가 여기에 표시됩니다.</p>
          </CardItem>
        </div>

        <div className="md:col-span-2">
          <CardItem title="선택 기간 인기 메뉴">
            <p>선택된 기간의 인기 메뉴 목록이 여기에 표시됩니다.</p>
          </CardItem>
        </div>
      </div>
    </div>
  );
}