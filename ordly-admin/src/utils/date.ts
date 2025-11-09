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

export const getWeekOfMonth = (date: Date) => {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  return Math.floor((date.getDate() + firstDayOfWeek - 1) / 7) + 1;
};

export function formatTimeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + "년 전";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + "달 전";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + "일 전";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + "시간 전";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + "분 전";
  }
  return "방금 전";
}
