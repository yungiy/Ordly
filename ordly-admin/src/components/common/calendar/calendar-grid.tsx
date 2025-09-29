import DayCell from './day-cell';

const DAYS_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토'];

type Props = {
  monthGrid: Date[][];
  currentMonth: number;
  selectedDate: Date | null;
  onDateClick: (date: Date) => void;
};

export default function CalendarGrid({
  monthGrid,
  currentMonth,
  selectedDate,
  onDateClick,
}: Props) {
  return (
    <div>
      <div className='grid grid-cols-7'>
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className='text-center font-semibold text-gray-500 py-2'
          >
            {day}
          </div>
        ))}
      </div>

      <div className='grid grid-cols-7'>
        {monthGrid.map((week, i) =>
          week.map((date, j) => (
            <DayCell
              key={`${i}-${j}`}
              date={date}
              currentMonth={currentMonth}
              selectedDate={selectedDate}
              onDateClick={onDateClick}
            />
          ))
        )}
      </div>
    </div>
  );
}
