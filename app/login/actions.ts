'use server';

import { cookies } from 'next/headers';

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MEDIANT_API_URL}/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }
  );

  if (!res.ok) {
    throw new Error('Login failed');
  }

  const token = await res.text();

  const cookieStore = await cookies();

  cookieStore.set({
    name: 'token',
    value: token,
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  });
}
