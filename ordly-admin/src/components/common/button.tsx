import { twMerge } from 'tailwind-merge';

type Props = React.ComponentPropsWithoutRef<'button'>;

export default function Button(props: Props) {
  const { className, children, ...rest } = props;
  return (
    <button
      className={twMerge(
        'w-full rounded-sm bg-white text-black disabled:opacity-50 disabled:cursor-not-allowed',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}