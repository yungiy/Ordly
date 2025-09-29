type Props = {
  date: Date;
  currentMonth: number;
  selectedDate: Date | null;
  onDateClick: (date: Date) => void;
};

export default function DayCell({ date, currentMonth, selectedDate, onDateClick }: Props) {
  const isToday = new Date().toDateString() === date.toDateString();
  const isSelected = selectedDate?.toDateString() === date.toDateString();
  const isCurrentMonth = date.getMonth() === currentMonth;

  const getCellClasses = () => {
    let classes = 'flex items-start justify-start p-2 text-black font-bold rounded-lg transition-colors aspect-square';
    
    if (!isCurrentMonth) {
      classes += ' text-gray-300';
    } else {
      classes += ' hover:bg-gray-100 cursor-pointer';
    }
    
    if (isSelected) {
      classes += ' bg-blue-600 text-white hover:bg-blue-700';
    }
    
    if (isToday) {
      classes = classes.replace('bg-blue-600', '').replace('hover:bg-blue-700', '');
      classes += ' !bg-red-500 text-white font-bold';
    }
    
    return classes;
  };

  return (
    <div 
      className={getCellClasses()} 
      onClick={() => isCurrentMonth && onDateClick(date)}
    >
      <span>{date.getDate()}</span>
    </div>
  );
}