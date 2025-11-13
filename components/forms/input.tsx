'use client';

import { ChangeEvent } from 'react';

type InputProps = {
  label: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function Input({ label, type = 'text', value, onChange }: InputProps) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-medium">{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="rounded border px-2 py-1"
      />
    </label>
  );
}
