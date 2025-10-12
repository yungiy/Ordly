import Badge, { BadgeType } from '@/components/common/badge';
import { formatCurrency } from '@/utils/format';

type Props = {
  title: string;
  price: number;
  description: string | null;
  badge?: BadgeType;
}

export default function MenuInfo({ title, price, description, badge }: Props) {
  return (
    <div className="p-6">
      {badge && <div><Badge {...badge} /></div>}
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="mt-2 text-2xl font-bold text-gray-900">
        {formatCurrency(price)}
      </p>
      <p className="mt-4 text-base text-gray-700 whitespace-pre-line">{description ?? '메뉴 설명이 없습니다.'}</p>
    </div>
  );
}
