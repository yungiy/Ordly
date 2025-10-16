import MainHeaders from '@/components/layout/main-headers';
import Footers from '@/components/layout/footers';
import HomeClient from './home-client';
import { getMenusForServer } from '@/features/menus/menus.api';

export default async function Home() {
  // 서버에서 직접 데이터를 가져옵니다.
  const initialMenus = await getMenusForServer();

  return (
    <>
      <div className='bg-white pb-20 hide-scrollbar'>
        <MainHeaders />
        <HomeClient initialMenus={initialMenus} />
        <Footers />
      </div>
    </>
  );
}
