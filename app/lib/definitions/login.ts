'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import * as z from 'zod';

export type LogInFormState = {
  email?: { errors: string[] };
  password?: { errors: string[] };
  api?: { errors: string };
};

export async function login(
  state: LogInFormState | null,
  formData: FormData
): Promise<LogInFormState | null> {
  const logInFormSchema = z.object({
    email: z.email({ error: 'Please enter a valid email.' }).trim(),
    password: z
      .string()
      .min(8, { error: 'Be at least 8 characters long' })
      .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
      .regex(/[0-9]/, { error: 'Contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        error: 'Contain at least one special character.',
      })
      .trim(),
  });

  const validatedFields = logInFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(
      'Validation errors:',
      z.treeifyError(validatedFields.error).properties
    );
    return (
      z.treeifyError(validatedFields.error).properties ?? {
        api: { errors: 'Invalid form submission' },
      }
    );
  }

  const { email, password } = validatedFields.data;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MEDIANT_API_URL}/auth/login`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }
  );

  if (!res.ok) {
    let message = 'Login failed';
    try {
      const data = await res.json();
      if (data?.reason) message = data.reason;
    } catch {
      const text = await res.text();
      message = text || message;
    }
    return { api: { errors: message } };
  }

  const token = await res.text();

  const cookieStore = await cookies();

  const FOURTEEN_MINUTES = 14 * 60 * 1000;

  const expiresAt = new Date(Date.now() + FOURTEEN_MINUTES);

  cookieStore.set({
    name: 'token',
    value: token,
    httpOnly: true,
    secure: false,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });

  redirect('/dashboard');
}
