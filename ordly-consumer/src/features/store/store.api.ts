import { Category, MenuItem, Store } from '@/generated/prisma';

export type StoreWithCategories = Store & {
  Category: (Category & {
    MenuItem: MenuItem[];
  })[];
};

export const fetcher = (url: string) => fetch(url).then((res) => res.json());