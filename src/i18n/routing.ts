import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

export const locales = ['fa', 'en']
export const fallbackLng = 'fa'

export const routing = defineRouting({
  defaultLocale: fallbackLng,
  localeDetection: false,
  localePrefix: 'as-needed',
  locales
})

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
