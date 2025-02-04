import * as z from 'zod';

export const registerValidation = z
  .object({
    username: z
      .string()
      .min(3, { message: 'username must be more than 2 characters' })
      .max(20, { message: 'username must be lest or equal than 20 characters' }),
    email: z.string().email({ message: 'Enter valid email' }),
    password: z.string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' }),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm && data.password !== '', {
    message: "Passwords don't match",
    path: ['confirm'],
  });

export const loginValidation = z.object({
  username: z.string(),
  password: z.string(),
});
