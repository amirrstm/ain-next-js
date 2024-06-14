import { Viewport } from 'next'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'
import { Manrope } from 'next/font/google'

import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Suspense } from 'react'

import { Toaster } from '@/components/ui/sonner'

import { appLayoutViewport } from '@/constants/viewport'
import { locales } from '@/i18n'
import StoreProvider from '@/providers/StoreProvider'
import { SWRProvider } from '@/providers/SWRProvider'
import { ThemeProvider } from '@/providers/ThemProvider'
import { ManropeFont, YekanBakhFont } from '@/styles/fonts'
import '@/styles/globals.css'
import '@/styles/main.scss'

export async function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}
export const viewport: Viewport = appLayoutViewport

export default function RootLayout({
  children,
  params: { locale },
}: {
  params: { locale: string }
  children: React.ReactNode
}) {
  const messages = useMessages()
  unstable_setRequestLocale(locale)

  return (
    <html lang={locale} suppressHydrationWarning={true} dir={locale === 'fa' ? 'rtl' : 'ltr'}>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      {/* <GoogleAnalytics gaId="G-30HPPFMJ63" /> */}

      <body
        suppressHydrationWarning={true}
        className={locale === 'fa' ? YekanBakhFont.className : ManropeFont.className}
      >
        <Suspense fallback={<div />}>
          <StoreProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <>
                <SWRProvider>
                  <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
                </SWRProvider>

                <Toaster richColors className={YekanBakhFont.className} />

                {/* <Analytics />
                <SpeedInsights /> */}
              </>
            </ThemeProvider>
          </StoreProvider>
        </Suspense>
      </body>
    </html>
  )
}
