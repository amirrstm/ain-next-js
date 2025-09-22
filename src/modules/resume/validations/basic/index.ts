import * as z from 'zod'

export const basicSchema = z.object({
  birthDate: z.date().optional(),
  email: z.string().optional(),
  firstName: z.string().optional(),
  gender: z.string().optional(),
  label: z.string().optional(),
  lastName: z.string().optional(),

  location: z.object({
    address: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    state: z.string().optional()
  }),
  marriage: z.string().optional(),
  military: z.string().optional(),
  phone: z.object({
    countryCode: z.string().optional(),
    text: z.string().optional()
  }),
  summary: z.string().optional(),
  url: z.string().optional()
})
