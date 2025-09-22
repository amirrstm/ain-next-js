import * as z from 'zod'

export const languageSchema = z.array(
  z.object({
    fluency: z.string().optional(),
    hasLevel: z.boolean().optional(),
    language: z.string().optional(),
    level: z.number().optional()
  })
)
