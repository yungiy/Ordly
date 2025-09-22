import CardItem from '@/components/common/card-item';
import PopularMenuItem from './pop-menu-item';

type MenuData = {
  rank: number;
  name: string;
  orders: number;
};

type Props = {
  menus: MenuData[];
};

export default function PopMenuList({ menus }: Props) {
  return (
    <CardItem title='인기 메뉴'>
      <div className='space-y-3 pt-2'>
        {menus.map((menu) => (
          <PopularMenuItem
            key={menu.rank}
            rank={menu.rank}
            name={menu.name}
            orders={menu.orders}
          />
        ))}
      </div>
    </CardItem>
  );
}
