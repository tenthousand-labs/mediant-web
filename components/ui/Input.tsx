'use client';

import { forwardRef } from 'react';
import clsx from 'clsx';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={clsx(
        'mt-2 block w-full rounded-lg px-3 py-1.5 outline-2 outline-black/50 transition focus:not-data-focus:outline-black/50 focus-visible:outline-none dark:outline-white/50 dark:focus:not-data-focus:outline-white/50',
        className
      )}
      {...props}
    />
  )
);

Input.displayName = 'Input';

export default Input;
