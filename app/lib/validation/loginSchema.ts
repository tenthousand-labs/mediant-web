import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Please enter a valid email.' })
    .email('Please enter a valid email.')
    .trim(),
  password: z
    .string({ required_error: 'Password is required.' })
    .min(8, 'Be at least 8 characters long')
    .regex(/[a-zA-Z]/, 'Contain at least one letter.')
    .regex(/[0-9]/, 'Contain at least one number.')
    .regex(/[^a-zA-Z0-9]/, 'Contain at least one special character.')
    .trim(),
});

export type LoginFormInput = z.infer<typeof loginSchema>;
