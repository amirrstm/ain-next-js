import { Metadata } from 'next'

import { PageLang } from '@/interface/General.model'

import { useTranslation as serverSideTrans } from '@/app/i18n'
import { appViewport } from '@/constants'
import UserHistoryContainer from '@/modules/history/containers/UserHistory'

export async function generateMetadata({ params }: PageLang): Promise<Metadata> {
  const { t } = await serverSideTrans(params.lng, 'Meta')

  return {
    title: t('History.Title'),
    description: t('History.Description'),
  }
}

export const viewport = appViewport.appDefaultViewport

export default async function Dashboard() {
  return <UserHistoryContainer />
}
