import * as z from 'zod'

export const profileSchema = z.array(
  z.object({
    network: z.string().optional(),
    username: z.string().optional(),
  }),
)
