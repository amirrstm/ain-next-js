'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import { useParams } from 'next/navigation'

import * as React from 'react'

import ComingSoonPage from '@/modules/common/containers/ComingSoon'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const { locale } = useParams()
  const [isComingSoon, setIsComingSoon] = React.useState(false)

  React.useEffect(() => {
    setIsComingSoon(window.location.pathname.includes('https://ainevis.com'))

    if (locale) {
      localStorage.setItem('lang', locale as string)
    }
  }, [locale])

  return <NextThemesProvider {...props}>{isComingSoon ? <ComingSoonPage /> : children}</NextThemesProvider>
}
