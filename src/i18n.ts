import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

export const locales = ['fa']

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound()

  const messages = {
    ...(await import(`../messages/${locale}/zod.json`)).default,
    ...(await import(`../messages/${locale}/form.json`)).default,
    ...(await import(`../messages/${locale}/main.json`)).default,
    ...(await import(`../messages/${locale}/constant.json`)).default,
  }

  return { messages }
})
