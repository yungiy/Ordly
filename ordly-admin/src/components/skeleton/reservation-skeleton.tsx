import CardItem from '../common/card-item';


export default function ReservationSkeleton() {
  return (
    <CardItem>
      <div className='space-y-4 animate-pulse'>
        <div className='h-5 bg-gray-200 rounded w-1/4'></div>
        {[...Array(5)].map((_, index) => (
          <div key={index} className='space-y-2'>
            <div className='h-4 bg-gray-200 rounded w-5/6'></div>
            <div className='h-3 bg-gray-200 rounded w-3/4'></div>
          </div>
        ))}
      </div>
    </CardItem>
  );
}
