import * as z from 'zod'

export const awardSchema = z.array(
  z.object({
    awarder: z.string().optional(),
    date: z.date().optional(),
    summary: z.string().optional(),
    title: z.string().optional()
  })
)
