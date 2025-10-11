import { ComponentType } from 'react';
import { twMerge } from 'tailwind-merge';

const badgeColorStyles = {
  red: 'bg-red-500 text-white',
  blue: 'bg-blue-400 text-white',
  green: 'bg-green-600 text-white',
  orange: 'bg-orange-400 text-white',
  gray: 'bg-gray-300 text-gray-900',
};

export type BadgeType = {
  title: string;
  color: keyof typeof badgeColorStyles;
  icon?: ComponentType<{ size?: number; className?: string }>;
}

interface Props extends BadgeType {
  className?: string;
}

export default function Badge({ title, color, icon: Icon, className }: Props) {
  // icon prop이 유효한 React 컴포넌트인지 확인하는 방어적인 로직 추가
  let ValidIcon: ComponentType<{ size?: number; className?: string }> | undefined = Icon;
  if (Icon && typeof Icon !== 'function') {
    console.error(
      `Badge component received an invalid 'icon' prop. Expected a React component (function/class) or undefined, but got:`,
      Icon,
      `Type: ${typeof Icon}. This might be due to an incorrect import (e.g., importing an entire module instead of a specific component).`
    );
    // 유효하지 않은 경우 아이콘을 렌더링하지 않도록 undefined로 설정
    ValidIcon = undefined;
  }

  return (
    <span
      className={twMerge(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold',
        badgeColorStyles[color],
        className,
      )}
    >
      {ValidIcon && <ValidIcon size={12} />}
      {title}
    </span>
  );
}
