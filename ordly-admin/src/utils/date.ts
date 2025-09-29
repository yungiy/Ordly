export const getMonthDetails = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1).getDay();
  return { firstDay };
};

export const calendarGrid = (year: number, month: number): Date[][] => {
  const { firstDay } = getMonthDetails(year, month);
  const grid: Date[][] = [];
  let currentDay = 1 - firstDay;

  for (let i = 0; i < 5; i++) { // 5주
    const week: Date[] = [];
    for (let j = 0; j < 7; j++) { // 7일
      week.push(new Date(year, month, currentDay));
      currentDay++;
    }
    grid.push(week);
  }
  return grid;
};

export const formatDateToYYYYMMDD = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};