'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import { useParams } from 'next/navigation'

import * as React from 'react'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const { locale } = useParams()

  React.useEffect(() => {
    if (locale) {
      localStorage.setItem('lang', locale as string)
    }
  }, [locale])

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
