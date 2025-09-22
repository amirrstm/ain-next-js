'use client'

import { useParams } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import * as React from 'react'

import type { ThemeProviderProps } from 'next-themes/dist/types'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const { locale } = useParams()

  React.useEffect(() => {
    if (locale) {
      localStorage.setItem('lang', locale as string)
    }
  }, [locale])

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
