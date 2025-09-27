'use client';

import { useCalendar } from '@/hooks/useCalendar.hooks';
import CalendarHeader from './calendar-header';
import CalendarGrid from './calendar-grid';
import CardItem from '../card-item';

type Props = {
  selectedDate?: Date | null;
  onDateClick?: (date: Date) => void;
};

export default function Calendar({
  selectedDate: propSelectedDate,
  onDateClick: propOnDateClick,
}: Props) {
  const {
    year,
    month,
    monthGrid,
    selectedDate: hookSelectedDate,
    goToNextMonth,
    goToPrevMonth,
    handleSelectDate: hookHandleSelectDate,
  } = useCalendar();

  const selectedDate =
    propSelectedDate !== undefined ? propSelectedDate : hookSelectedDate;
  const onDateClick = propOnDateClick || hookHandleSelectDate;

  return (
    <CardItem>
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
        onDateClick={onDateClick}
      />
    </CardItem>
  );
}
