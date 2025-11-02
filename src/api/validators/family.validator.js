import { z } from 'zod';

export const createFamilySchema = z.object({
  body: z.object({
    family_name: z.string(),
    family_surname: z.string().optional(),
    city: z.string().optional(),
  }),
});

export const joinFamilySchema = z.object({
  body: z.object({
    family_code: z.string().length(8),
  }),
});
