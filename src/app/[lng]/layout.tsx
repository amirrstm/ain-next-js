import SiteLayout from '@/components/layout/SiteLayout'
import { Toaster } from '@/components/ui/toaster'

import StoreProvider from '@/providers/StoreProvider'
import { SWRProvider } from '@/providers/SWRProvider'
import { ThemeProvider } from '@/providers/ThemProvider'
import { YekanBakhFont } from '@/styles/fonts'
import '@/styles/globals.css'
import '@/styles/main.scss'

import { languages } from '../i18n/settings'

export async function generateStaticParams() {
  return languages.map(lng => ({ lng }))
}

export default function RootLayout({
  children,
  params: { lng },
}: {
  params: { lng: string }
  children: React.ReactNode
}) {
  return (
    <html lang={lng} suppressHydrationWarning={true} dir={lng === 'fa' ? 'rtl' : 'ltr'}>
      <link rel="icon" href="/en/favicon.ico" sizes="any" />

      <body suppressHydrationWarning={true} className={YekanBakhFont.className}>
        <StoreProvider>
          <SiteLayout lng={lng}>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
              <>
                <SWRProvider>{children}</SWRProvider>

                <Toaster />
              </>
            </ThemeProvider>
          </SiteLayout>
        </StoreProvider>
      </body>
    </html>
  )
}
