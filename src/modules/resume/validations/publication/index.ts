import * as z from 'zod'

export const publicationSchema = z.array(
  z.object({
    name: z.string().optional(),
    publisher: z.string().optional(),
    releaseDate: z.date().optional(),
    summary: z.string().optional(),
    url: z.string().optional()
  })
)
