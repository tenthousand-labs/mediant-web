'use client';

import { Input as HeadlessInput } from '@headlessui/react';
import { ChangeEvent } from 'react';
import clsx from 'clsx';

type InputProps = {
  id: string;
  label: string;
  type?: string;
  value?: string;
};

export function Input({ id, label, type = 'text', value }: InputProps) {
  return (
    <label className="flex flex-col gap-1">
      <HeadlessInput
        id={id}
        name={id}
        type={type}
        placeholder={label}
        value={value}
        className={clsx(
          'rounded-xl bg-neutral-500/20 px-4 py-2',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed'
        )}
      />
    </label>
  );
}
