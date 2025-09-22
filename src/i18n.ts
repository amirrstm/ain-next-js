import { defineRouting } from 'next-intl/routing'
import { getRequestConfig } from 'next-intl/server'

export const locales = ['fa', 'en']

export const routingConfig = defineRouting({
  defaultLocale: 'fa',
  localeDetection: false,
  localePrefix: 'as-needed',
  locales
})

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !routingConfig.locales.includes(locale)) {
    locale = routingConfig.defaultLocale
  }

  const messages = {
    ...(await import(`../messages/${locale}/zod.json`)).default,
    ...(await import(`../messages/${locale}/form.json`)).default,
    ...(await import(`../messages/${locale}/main.json`)).default,
    ...(await import(`../messages/${locale}/constant.json`)).default
  }

  return { locale, messages }
})
