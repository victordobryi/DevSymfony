import { z } from 'zod';

export type FactType = 'math' | 'trivia' | 'date';

export const schema = z
  .object({
    type: z.enum(['math', 'trivia', 'date']),
    number: z.string().optional(),
    useRandom: z.boolean().optional(),
  })
  .refine((data) => data.useRandom || (data.number && /^\d+$/.test(data.number)), {
    message: 'Число должно быть в виде цифры',
    path: ['number'],
  });

export type FormValues = z.infer<typeof schema>;
