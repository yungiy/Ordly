import MainHeaders from '@/components/layout/main-headers';
import Footers from '@/components/layout/footers';
import HomeClient from './HomeClient';

const CATEGORIES = [
  'COFFEE',
  'DESSERT',
  'CAKE',
  'BEER',
  'SPECIAL DRINKS',
  'DINING',
];

export default function Home() {
  return (
    <>
      <div className='bg-white pb-20 hide-scrollbar'>
        <MainHeaders />
        <HomeClient categories={CATEGORIES} />
        <Footers />
      </div>
    </>
  );
}
