import * as z from 'zod'

export const skillSchema = z.array(
  z.object({
    description: z.string().optional(),
    hasLevel: z.boolean().optional(),
    level: z.number().optional(),
    name: z.string().optional()
  })
)
