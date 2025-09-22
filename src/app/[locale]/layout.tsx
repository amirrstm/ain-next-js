import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { Suspense } from 'react'

import { Toaster } from '@/components/ui/sonner'
import { appLayoutViewport } from '@/constants/viewport'
import { locales } from '@/i18n'
import StoreProvider from '@/providers/StoreProvider'
import { SWRProvider } from '@/providers/SWRProvider'
import { ThemeProvider } from '@/providers/ThemProvider'
import { ManropeFont, YekanBakhFont } from '@/styles/fonts'

import type { Viewport } from 'next'
import '@/styles/globals.css'
import '@/styles/main.scss'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}
export const viewport: Viewport = appLayoutViewport

export default function RootLayout({ children, params: { locale } }: { params: { locale: string }; children: React.ReactNode }) {
  const messages = useMessages()
  setRequestLocale(locale)

  return (
    <html dir={locale === 'fa' ? 'rtl' : 'ltr'} lang={locale} suppressHydrationWarning={true}>
      <link href="/favicon.ico" rel="icon" sizes="any" />

      <body className={locale === 'fa' ? YekanBakhFont.className : ManropeFont.className} suppressHydrationWarning={true}>
        <Suspense fallback={<div />}>
          <StoreProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange enableSystem>
              <>
                <SWRProvider>
                  <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
                </SWRProvider>

                <Toaster className={YekanBakhFont.className} richColors />

                <Analytics />
                <SpeedInsights />
              </>
            </ThemeProvider>
          </StoreProvider>
        </Suspense>
      </body>
    </html>
  )
}
