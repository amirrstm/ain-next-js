import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['fa', 'en'],
  defaultLocale: 'fa',
  localeDetection: false,
  localePrefix: 'never',
})

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
