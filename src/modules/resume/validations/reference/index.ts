import * as z from 'zod'

export const referenceSchema = z.array(
  z.object({
    name: z.string().optional(),
    reference: z.string().optional(),
  }),
)
