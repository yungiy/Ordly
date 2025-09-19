/*
 * [컴포넌트 명세: Calendar]
 *
 * @purpose
 * - 캘린더 UI의 최상위 컨테이너 역할
 * - `useCalendar` 훅을 호출하여 모든 상태와 로직을 가져온 후,
 * 각각의 책임을 가진 하위 컴포넌트(`CalendarHeader`, `CalendarGrid`)에
 * 필요한 데이터와 함수를 `props`로 전달
 */

'use client';

import { useCalendar } from '@/hook/useCalendar';
import CalendarHeader from './calendar-header';
import CalendarGrid from './calendar-grid';

export default function Calendar() {
  const { 
    year, 
    month, 
    monthGrid, 
    selectedDate,
    goToNextMonth, 
    goToPrevMonth, 
    handleSelectDate 
  } = useCalendar();

  return (
    <div className="flex flex-col w-full h-full">
      <CalendarHeader
        year={year}
        month={month}
        onPrev={goToPrevMonth}
        onNext={goToNextMonth}
      />
      <CalendarGrid 
        monthGrid={monthGrid}
        currentMonth={month}
        selectedDate={selectedDate}
        onDateClick={handleSelectDate}
      />
    </div>
  );
}