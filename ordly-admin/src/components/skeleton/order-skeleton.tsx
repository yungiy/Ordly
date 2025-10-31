import CardItem from '@/components/common/card-item';

const SkeletonOrderCard = ({
  hasTwoButtons = true,
}: {
  hasTwoButtons?: boolean;
}) => (
  <div className='rounded-lg bg-gray-200 p-2'>
    <div className='h-5 w-3/4 bg-gray-400 rounded-md mb-2'></div>
    <div className='h-4 w-1/2 bg-gray-300 rounded-md mb-4'></div>
    <div className='flex gap-2'>
      <div className='h-9 flex-1 bg-gray-300 rounded-md'></div>
      {hasTwoButtons && (
        <div className='h-9 flex-1 bg-gray-400 rounded-md'></div>
      )}
    </div>
  </div>
);

export default function OrderPageSkeleton() {
  return (
    <div className='flex-1 flex gap-4 p-2 sm:p-2 lg:p-4 animate-pulse'>
      <CardItem className='h-full w-full flex flex-col'>
        <div className='h-7 w-24 bg-gray-300 rounded-md mb-4'></div>
        <div className='flex-1 overflow-y-auto p-2 space-y-3'>
          <SkeletonOrderCard hasTwoButtons={true} />
          <SkeletonOrderCard hasTwoButtons={true} />
          <SkeletonOrderCard hasTwoButtons={true} />
        </div>
      </CardItem>

      <CardItem className='h-full w-full flex flex-col'>
        <div className='h-7 w-24 bg-gray-300 rounded-md mb-4'></div>
        <div className='flex-1 overflow-y-auto p-2 space-y-3'>
          <SkeletonOrderCard hasTwoButtons={true} />
          <SkeletonOrderCard hasTwoButtons={true} />
          <SkeletonOrderCard hasTwoButtons={true} />
        </div>
      </CardItem>

      <CardItem className='h-full w-full flex flex-col'>
        <div className='h-7 w-24 bg-gray-300 rounded-md mb-4'></div>
        <div className='flex-1 overflow-y-auto p-2 space-y-3'>
          <SkeletonOrderCard hasTwoButtons={false} />
          <SkeletonOrderCard hasTwoButtons={false} />
          <SkeletonOrderCard hasTwoButtons={false} />
        </div>
      </CardItem>
    </div>
  );
}
