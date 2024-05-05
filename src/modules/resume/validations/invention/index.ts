import * as z from 'zod'

export const inventionSchema = z.array(
  z.object({
    date: z.date().optional(),
    url: z.string().optional(),
    name: z.string().optional(),
    summary: z.string().optional(),
  }),
)
