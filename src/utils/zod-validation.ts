import * as z from 'zod';

export const registerValidation = z
  .object({
    username: z
      .string()
      .min(3, { message: 'username must be more than 2 characters' })
      .max(20, { message: 'username must be lest or equal than 20 characters' }),
    email: z.string().email({ message: 'Enter valid email' }),
    password: z
      .string()
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

export const filmValidation = z.object({
  title: z.string(),
  description: z.string(),
  duration: z.string().regex(/^\d{2}:\d{2}:\d{2}$/),
  country: z.string(),
  genre: z.string(),
  releaseDate: z.date(),
  director: z.string(),
  cast: z.string(),
  rating: z
    .number()
    .positive()
    .refine((val) => val % 1 !== 0, {
      message: 'Rating must be a float value (e.g., 4.5).',
    }),
  trailerUrl: z.string(),
  imageUrl: z.string(),
});

export const hallValidation = z.object({
  name: z.string().min(3, { message: 'name must be more than 2 characters' }),
  cols: z.number().positive(),
  rows: z.number().positive(),
  capacity: z.number().positive(),
});
