'use client';

import { useActionState } from 'react';
import { Input } from '@components/forms/input';
import { logInWithPasswordAction } from './actions';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    logInWithPasswordAction,
    null
  );
  return (
    <>
      <h1 className="text-2xl mb-8 font-bold text-center">Log in</h1>
      <form
        action={formAction}
        className="flex flex-col gap-4 max-w-sm mx-auto"
      >
        <Input id="email" label="Email" type="email" />
        <Input id="password" label="Password" type="password" />
        <button
          type="submit"
          disabled={isPending}
          className="rounded-xl bg-blue-600 px-4 py-2 text-white"
        >
          {isPending ? 'Logging in...' : 'Login'}
        </button>
        {state?.error && (
          <p className="text-center text-red-500">{state.error}</p>
        )}
      </form>
    </>
  );
}
