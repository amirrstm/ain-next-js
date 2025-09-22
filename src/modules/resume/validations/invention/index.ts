import * as z from 'zod'

export const inventionSchema = z.array(
  z.object({
    date: z.date().optional(),
    name: z.string().optional(),
    summary: z.string().optional(),
    url: z.string().optional()
  })
)
