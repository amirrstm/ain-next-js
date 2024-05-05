import * as z from 'zod'

export const publicationSchema = z.array(
  z.object({
    url: z.string().optional(),
    name: z.string().optional(),
    summary: z.string().optional(),
    publisher: z.string().optional(),
    releaseDate: z.date().optional(),
  }),
)
