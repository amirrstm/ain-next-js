import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { PageLang } from '@/interface/General.model'

import { appViewport } from '@/constants'
import DashboardContainer from '@/modules/app/containers/Dashboard'

export async function generateMetadata({ params: { locale } }: PageLang): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('App.Title'),
    description: t('App.Description'),
  }
}

export const viewport = appViewport.appDefaultViewport

export default async function App() {
  return <DashboardContainer />
}
