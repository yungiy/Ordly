import { getWeekOfMonth } from './date';

type SalesData = {
  date: string;
  name: string;
  sales: number;
};

export const processBarChartData = (
  data: SalesData[],
  startDate: string,
  endDate: string
) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const menuSales: { [key: string]: number } = {};

  data.forEach((item) => {
    const itemDate = new Date(item.date);
    if (itemDate >= start && itemDate <= end) {
      menuSales[item.name] = (menuSales[item.name] || 0) + item.sales;
    }
  });

  return Object.keys(menuSales)
    .map((name) => ({
      name,
      sales: menuSales[name],
    }))
    .sort((a, b) => b.sales - a.sales);
};

export const processLineChartData = (
  data: SalesData[],
  startDate: string,
  endDate: string
) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const weeklySales: { [key: string]: number } = {};

  data.forEach((item) => {
    const itemDate = new Date(item.date);
    if (itemDate >= start && itemDate <= end) {
      const year = itemDate.getFullYear();
      const month = itemDate.getMonth() + 1;
      const week = getWeekOfMonth(itemDate);
      const weeklyKey = `${year}-${month}월 ${week}주차`;
      weeklySales[weeklyKey] = (weeklySales[weeklyKey] || 0) + item.sales;
    }
  });

  return Object.keys(weeklySales)
    .map((weekKey) => ({
      name: weekKey.substring(5),
      sales: weeklySales[weekKey],
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
};