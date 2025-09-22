import { getRequestConfig } from 'next-intl/server'

import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale
  }

  const messages = {
    ...(await import(`./messages/${locale}/zod.json`)).default,
    ...(await import(`./messages/${locale}/form.json`)).default,
    ...(await import(`./messages/${locale}/main.json`)).default,
    ...(await import(`./messages/${locale}/constant.json`)).default
  }

  return { locale, messages }
})
