import * as z from 'zod'

export const interestSchema = z.array(
  z.object({
    keywords: z
      .array(
        z.object({
          value: z.string().optional()
        })
      )
      .optional(),
    name: z.string().optional()
  })
)
