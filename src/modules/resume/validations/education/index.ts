import * as z from 'zod'

export const educationSchema = z.array(
  z.object({
    area: z.string().optional(),
    endDate: z.date().optional(),
    fieldOfStudy: z.string().optional(),
    highlights: z
      .array(
        z.object({
          value: z.string().optional()
        })
      )
      .optional(),
    institution: z.string().optional(),
    location: z.object({
      city: z.string().optional(),
      country: z.string().optional(),
      state: z.string().optional()
    }),
    score: z.string().optional(),
    startDate: z.date().optional(),
    stillStudying: z.boolean().optional(),
    studyType: z.string().optional()
  })
)
