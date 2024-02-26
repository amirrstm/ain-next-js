import { Metadata } from 'next'

import { PageLang } from '@/interface/General.model'

import { useTranslation as serverSideTrans } from '@/app/i18n'
import { appViewport } from '@/constants'
import HomeContainer from '@/modules/home/containers/Home'

export async function generateMetadata({ params }: PageLang): Promise<Metadata> {
  const { t } = await serverSideTrans(params.lng, 'Meta')

  return {
    title: t('Home.Title'),
    description: t('Home.Description'),
  }
}

export const viewport = appViewport.appDefaultViewport

export default async function Home() {
  return <HomeContainer />
}
