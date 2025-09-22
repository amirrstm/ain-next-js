import * as z from 'zod'

export const certificateSchema = z.array(
  z.object({
    date: z.date().optional(),
    issuer: z.string().optional(),
    name: z.string().optional(),
    url: z.string().optional()
  })
)
