import * as z from 'zod'

export const speechSchema = z.array(
  z.object({
    date: z.date().optional(),
    url: z.string().optional(),
    name: z.string().optional(),
    summary: z.string().optional(),
  }),
)
