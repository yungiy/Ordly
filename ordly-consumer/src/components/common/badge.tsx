import { ComponentType } from 'react';
import { twMerge } from 'tailwind-merge';

const badgeColorStyles = {
  red: 'bg-red-500 text-white',
  blue: 'bg-blue-400 text-white',
  green: 'bg-green-600 text-white',
  orange: 'bg-orange-400 text-white',
  gray: 'bg-gray-300 text-gray-900',
};

export interface BadgeType {
  title: string;
  color: keyof typeof badgeColorStyles;
  icon?: ComponentType<{ size?: number; className?: string }>;
}

interface Props extends BadgeType {
  className?: string;
}

export default function Badge({ title, color, icon: Icon, className }: Props) {
  return (
    <span
      className={twMerge(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold',
        badgeColorStyles[color],
        className,
      )}
    >
      {Icon && <Icon size={12} />}
      {title}
    </span>
  );
}

