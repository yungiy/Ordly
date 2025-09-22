import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  title?: string;
  children: ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export default function CardItem({ title, children, className, ...rest }: Props) {
  const baseStyles =
    'rounded-xl shadow-sm bg-white border border-gray-100 transition-all duration-200 p-4 h-full';
  const classes = twMerge(baseStyles, className);

  return (
    <div className={classes} {...rest}>
      {title && <h3 className='font-bold text-xl pb-2 text-gray-800'>{title}</h3>}
      <div className='text-gray-600'>{children}</div>
    </div>
  );
}