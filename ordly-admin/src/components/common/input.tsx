import { ForwardedRef, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends Omit<React.ComponentPropsWithRef<'input'>, 'type'> {
  type: 'text' | 'password' | 'email' | 'search' | 'number' | 'date';
}

const Input = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLInputElement>) => {
    const { className, ...rest } = props;
    return (
      <input
        ref={ref}
        autoComplete='off'
        className={twMerge(
          'h-11 w-full text-black rounded-sm px-4 font-medium focus:outline-none',
          className,
        )}
        {...rest}
      />
    );
  },
);

Input.displayName = 'Input';
export default Input;