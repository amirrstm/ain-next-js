import * as z from 'zod'

export const interestSchema = z.array(
  z.object({
    name: z.string().optional(),
    keywords: z
      .array(
        z.object({
          value: z.string().optional(),
        }),
      )
      .optional(),
  }),
)
