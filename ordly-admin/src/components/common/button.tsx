import { twMerge } from 'tailwind-merge';

type Props = React.ComponentPropsWithoutRef<'button'>;

export default function Button(props: Props) {
  const { className, children, ...rest } = props;
  return (
    <button
      className={twMerge(
        'w-full rounded-sm bg-white text-black',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}