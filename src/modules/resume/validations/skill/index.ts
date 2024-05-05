import * as z from 'zod'

export const skillSchema = z.array(
  z.object({
    name: z.string().optional(),
    level: z.number().optional(),
    hasLevel: z.boolean().optional(),
    description: z.string().optional(),
  }),
)
