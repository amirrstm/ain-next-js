import * as z from 'zod'

export const certificateSchema = z.array(
  z.object({
    date: z.date().optional(),
    url: z.string().optional(),
    name: z.string().optional(),
    issuer: z.string().optional(),
  }),
)
