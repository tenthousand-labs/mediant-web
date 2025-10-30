import { login } from './actions';
import { Field, Input, Label } from '@headlessui/react';
import clsx from 'clsx';

export default function Page() {
  return (
    <main className="relative isolate m-4">
      <div className="mx-auto max-w-2xl my-48">
        <h1 className="text-center text-2xl font-bold tracking-tight">
          Welcome back
        </h1>
        <form action={login}>
          <Field className="my-4">
            <Label className="text-sm/6 font-bold">Email</Label>
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
            <Label className="text-sm/6 font-bold">Password</Label>
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
