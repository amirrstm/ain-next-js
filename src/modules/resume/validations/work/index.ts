import * as z from 'zod'

export const workSchema = z.array(
  z.object({
    url: z.string().optional(),
    name: z.string().optional(),
    endDate: z.date().optional(),
    summary: z.string().optional(),
    position: z.string().optional(),
    startDate: z.date().optional(),
    stillWorking: z.boolean().optional(),
    highlights: z
      .array(
        z.object({
          value: z.string().optional(),
        }),
      )
      .optional(),
    location: z.object({
      city: z.string().optional(),
      state: z.string().optional(),
      country: z.string().optional(),
    }),
  }),
)
