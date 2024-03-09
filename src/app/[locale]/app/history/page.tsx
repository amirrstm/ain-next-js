import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { PageLang } from '@/interface/General.model'

import { appViewport } from '@/constants'
import UserHistoryContainer from '@/modules/history/containers/UserHistory'

export async function generateMetadata({ params: { locale } }: PageLang): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('History.Title'),
    description: t('History.Description'),
  }
}

export const viewport = appViewport.appDefaultViewport

export default async function Dashboard() {
  return <UserHistoryContainer />
}
