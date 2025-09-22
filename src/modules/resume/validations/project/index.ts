import * as z from 'zod'

export const projectSchema = z.array(
  z.object({
    description: z.string().optional(),
    endDate: z.date().optional(),
    highlights: z
      .array(
        z.object({
          value: z.string().optional()
        })
      )
      .optional(),
    name: z.string().optional(),
    organization: z.string().optional(),
    startDate: z.date().optional(),
    url: z.string().optional()
  })
)
