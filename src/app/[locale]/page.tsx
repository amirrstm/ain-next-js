import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { PageLang } from '@/interface/General.model'

import { appViewport } from '@/constants'
import HomeContainer from '@/modules/home/containers/Home'

export async function generateMetadata({ params: { locale } }: PageLang): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('Home.Title'),
    description: t('Home.Description'),
  }
}

export const viewport = appViewport.appDefaultViewport

export default function Home() {
  return <HomeContainer />
}
