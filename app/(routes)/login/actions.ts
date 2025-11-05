'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { loginUser } from '@lib/api/users';
import { verifySession } from '@lib/auth/verifySession';
import type { LoginFormInput } from '@lib/validation/loginSchema';
import { loginSchema } from '@lib/validation/loginSchema';

export type LoginActionState = {
  email?: { errors: string[] };
  password?: { errors: string[] };
  api?: { error: string };
};

const NINE_MINUTES_IN_MS = 9 * 60 * 1000;

export async function authenticate(
  _state: LoginActionState | null,
  formData: FormData
): Promise<LoginActionState | null> {
  const validated = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validated.success) {
    const { fieldErrors } = validated.error.flatten();
    return {
      email: fieldErrors.email ? { errors: fieldErrors.email } : undefined,
      password: fieldErrors.password
        ? { errors: fieldErrors.password }
        : undefined,
    };
  }

  const credentials: LoginFormInput = validated.data;

  try {
    const existingToken = await verifySession();
    if (existingToken) {
      redirect('/dashboard');
    }

    const token = await loginUser(credentials);
    const cookieStore = await cookies();

    cookieStore.set({
      name: 'jwt',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(Date.now() + NINE_MINUTES_IN_MS),
      path: '/',
    });
  } catch (error) {
    return {
      api: {
        error:
          error instanceof Error
            ? error.message
            : 'Unable to complete login. Please try again.',
      },
    };
  }

  redirect('/dashboard');
}
