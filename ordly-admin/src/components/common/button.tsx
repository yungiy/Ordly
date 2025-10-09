import { twMerge } from 'tailwind-merge';

type Props = React.ComponentPropsWithoutRef<'button'>;

export default function Button(props: Props) {
  const { className, children, ...rest } = props;
  return (
    <button
      className={twMerge(
        'w-full rounded-sm disabled:opacity-50 cursor-pointer',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
