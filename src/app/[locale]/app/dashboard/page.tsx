import { getTranslations, setRequestLocale } from 'next-intl/server'

import { appViewport } from '@/constants'
import { locales } from '@/i18n'
import MonthlyChartContainer from '@/modules/dashboard/containers/MonthlyChart'

import type { Metadata } from 'next'
import type { PageLang } from '@/interface/General.model'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params: { locale } }: PageLang): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    description: t('Dashboard.Description'),
    title: t('Dashboard.Title')
  }
}

export const viewport = appViewport.appDefaultViewport

export default async function Dashboard({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)

  return <MonthlyChartContainer />
}
