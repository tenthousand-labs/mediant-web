'use server';

import { z } from 'zod';
import { logInWithPassword } from '@/lib/api/auth/login';
import { redirect } from 'next/navigation';

const logInWithPasswordSchema = z.object({
  email: z.email().max(255).toLowerCase().trim(),
  password: z.string().min(8).max(100),
});

export async function logInWithPasswordAction(
  prevState: any,
  formData: FormData
): Promise<void | { error: string }> {
  const result = logInWithPasswordSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!result.success) {
    return {
      error: 'Failed to sign in',
    };
  }

  try {
    await logInWithPassword(result.data.email, result.data.password);
  } catch (error: any) {
    return { error: 'Failed to sign in' };
  }

  redirect('/dashboard');
}
