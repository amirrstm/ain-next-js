import * as z from 'zod'

export const basicSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  label: z.string().optional(),
  url: z.string().optional(),
  gender: z.string().optional(),
  marriage: z.string().optional(),
  military: z.string().optional(),
  birthDate: z.date().optional(),
  email: z.string().optional(),
  summary: z.string().optional(),
  phone: z.object({
    text: z.string().optional(),
    countryCode: z.string().optional(),
  }),

  location: z.object({
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    address: z.string().optional(),
  }),
})
