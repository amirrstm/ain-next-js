import * as z from 'zod'

export const awardSchema = z.array(
  z.object({
    date: z.date().optional(),
    title: z.string().optional(),
    awarder: z.string().optional(),
    summary: z.string().optional(),
  }),
)
