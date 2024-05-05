import * as z from 'zod'

export const volunteerSchema = z.array(
  z.object({
    url: z.string().optional(),
    endDate: z.date().optional(),
    startDate: z.date().optional(),
    summary: z.string().optional(),
    position: z.string().optional(),
    organization: z.string().optional(),
    highlights: z
      .array(
        z.object({
          value: z.string().optional(),
        }),
      )
      .optional(),
  }),
)
