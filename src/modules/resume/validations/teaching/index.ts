import * as z from 'zod'

export const teachingSchema = z.array(
  z.object({
    date: z.date().optional(),
    institution: z.string().optional(),
    location: z
      .object({
        city: z.string().optional(),
        country: z.string().optional(),
        state: z.string().optional()
      })
      .optional(),
    summary: z.string().optional(),
    title: z.string().optional()
  })
)
