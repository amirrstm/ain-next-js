import * as z from 'zod'

export const volunteerSchema = z.array(
  z.object({
    endDate: z.date().optional(),
    highlights: z
      .array(
        z.object({
          value: z.string().optional()
        })
      )
      .optional(),
    organization: z.string().optional(),
    position: z.string().optional(),
    startDate: z.date().optional(),
    summary: z.string().optional(),
    url: z.string().optional()
  })
)
