import * as z from 'zod'

export const workSchema = z.array(
  z.object({
    endDate: z.date().optional(),
    highlights: z
      .array(
        z.object({
          value: z.string().optional()
        })
      )
      .optional(),
    location: z.object({
      city: z.string().optional(),
      country: z.string().optional(),
      state: z.string().optional()
    }),
    name: z.string().optional(),
    position: z.string().optional(),
    startDate: z.date().optional(),
    stillWorking: z.boolean().optional(),
    summary: z.string().optional(),
    url: z.string().optional()
  })
)
