import { Category, MenuItem } from '@/generated/prisma';

export type MenuItemWithCategory = MenuItem & {
  Category: Category;
};

export async function fetchMenus(): Promise<{
  items: MenuItemWithCategory[];
  categories: Category[];
}> {
  const response = await fetch('/api/menus');

  if (!response.ok) {
    throw new Error('메뉴 데이터를 불러오는데 실패했습니다.');
  }

  const items: MenuItemWithCategory[] = await response.json();
  const uniqueCategories = Array.from(
    new Map(items.map((item) => [item.Category.id, item.Category])).values()
  );
  uniqueCategories.sort((a, b) => a.order - b.order);
  return { items, categories: uniqueCategories };
}