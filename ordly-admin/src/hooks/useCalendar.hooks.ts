'use client';

import { calendarGrid } from '@/utils/date';
import { useMemo, useState } from 'react';

export const useCalendar = (initialDate: Date = new Date()) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthGrid = useMemo(() => calendarGrid(year, month), [year, month]);

  const goToNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToPrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleSelectDate = (date: Date) => setSelectedDate(date);

  return {
    year,
    month,
    currentDate,
    selectedDate,
    monthGrid,
    goToNextMonth,
    goToPrevMonth,
    handleSelectDate,
  };
};
