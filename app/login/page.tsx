'use client';

import { login } from '../lib/definitions/login';
import { Field, Input, Label } from '@headlessui/react';
import clsx from 'clsx';
import { useActionState } from 'react';

export default function Page() {
  const [state, action, pending] = useActionState(login, null);

  return (
    <main className="relative isolate m-4">
      <div className="mx-auto max-w-2xl my-48">
        <h1 className="text-center text-2xl font-bold tracking-tight">
          Welcome back
        </h1>

        <div className="h-5 mt-4">
          {state?.api?.errors && (
            <p className="text-sm font-bold text-red-500 text-center">
              {state.api.errors}
            </p>
          )}
        </div>

        <form action={action}>
          <Field className="my-4">
            <div className="flex justify-between">
              <Label className="text-sm/6 font-bold">Email</Label>
              {state?.email?.errors && (
                <Label className="text-sm/6 font-bold text-red-500">
                  {state.email.errors}
                </Label>
              )}
            </div>

            <Input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className={clsx(
                'mt-2 block w-full rounded-lg px-3 py-1.5 text-sm/6 outline-2 outline-black/50 dark:outline-white/50',
                'focus:not-data-focus:outline-black/50 dark:focus:not-data-focus:outline-white/50 data-focus:outline-black dark:data-focus:outline-white'
              )}
            />
          </Field>

          <Field className="my-4">
            <div className="flex justify-between">
              <Label className="text-sm/6 font-bold">Password</Label>
              {state?.password?.errors && (
                <Label className="text-sm/6 font-bold text-red-500">
                  {state.password.errors[0]}
                </Label>
              )}
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className={clsx(
                'mt-2 block w-full rounded-lg px-3 py-1.5 text-sm/6 outline-2 outline-black/50 dark:outline-white/50',
                'focus:not-data-focus:outline-black/50 dark:focus:not-data-focus:outline-white/50 data-focus:outline-black dark:data-focus:outline-white'
              )}
            />
          </Field>

          <button
            type="submit"
            className="flex w-full justify-center my-12 rounded-lg bg-pink-700 px-3 py-1.5 text-sm/6 font-bold hover:bg-pink-600 focus-visible:outline-pink-500 text-white dark:text-black"
          >
            Log In
          </button>
        </form>
      </div>
    </main>
  );
}
