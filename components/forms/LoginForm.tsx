'use client';

import { useActionState } from 'react';

import { authenticate, type LoginActionState } from '@/app/login/actions';
import Button from '@components/ui/Button';
import FieldError from '@components/ui/FieldError';
import Input from '@components/ui/Input';

const INITIAL_STATE: LoginActionState | null = null;

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(
    authenticate,
    INITIAL_STATE
  );

  return (
    <form action={formAction} className="mt-10 space-y-6" noValidate>
      {state?.api?.error ? (
        <p className="text-center text-sm font-semibold text-red-500">
          {state.api.error}
        </p>
      ) : null}

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <FieldError message={state?.email?.errors?.[0]} />
        </div>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <FieldError message={state?.password?.errors?.[0]} />
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </div>

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? 'Logging in…' : 'Log in'}
      </Button>
    </form>
  );
}
