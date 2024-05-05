import * as z from 'zod'

export const projectSchema = z.array(
  z.object({
    url: z.string().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    organization: z.string().optional(),
    endDate: z.date().optional(),
    startDate: z.date().optional(),
    highlights: z
      .array(
        z.object({
          value: z.string().optional(),
        }),
      )
      .optional(),
  }),
)
