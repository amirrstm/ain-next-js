import { Metadata } from 'next'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import { PageLang } from '@/interface/General.model'

import { appViewport } from '@/constants'
import { locales } from '@/i18n'
import MonthlyChartContainer from '@/modules/dashboard/containers/MonthlyChart'

export async function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params: { locale } }: PageLang): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('Dashboard.Title'),
    description: t('Dashboard.Description'),
  }
}

export const viewport = appViewport.appDefaultViewport

export default async function Dashboard({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale)

  return <MonthlyChartContainer />
}
