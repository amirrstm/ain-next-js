import * as z from 'zod'

export const teachingSchema = z.array(
  z.object({
    date: z.date().optional(),
    title: z.string().optional(),
    summary: z.string().optional(),
    institution: z.string().optional(),
    location: z
      .object({
        city: z.string().optional(),
        state: z.string().optional(),
        country: z.string().optional(),
      })
      .optional(),
  }),
)
