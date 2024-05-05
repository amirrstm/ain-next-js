import * as z from 'zod'

export const educationSchema = z.array(
  z.object({
    institution: z.string().optional(),
    area: z.string().optional(),
    studyType: z.string().optional(),
    fieldOfStudy: z.string().optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    score: z.string().optional(),
    highlights: z
      .array(
        z.object({
          value: z.string().optional(),
        }),
      )
      .optional(),
    stillStudying: z.boolean().optional(),
    location: z.object({
      city: z.string().optional(),
      state: z.string().optional(),
      country: z.string().optional(),
    }),
  }),
)
