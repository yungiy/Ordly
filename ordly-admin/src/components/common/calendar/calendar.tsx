'use client';

import { useCalendar } from '@/hooks/useCalendar.hooks';
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