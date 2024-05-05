import * as z from 'zod'

export const languageSchema = z.array(
  z.object({
    language: z.string().optional(),
    level: z.number().optional(),
    hasLevel: z.boolean().optional(),
    fluency: z.string().optional(),
  }),
)
