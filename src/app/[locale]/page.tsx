import { getTranslations, setRequestLocale } from 'next-intl/server'

import { appViewport } from '@/constants'
import HomeContainer from '@/modules/home/containers/Home'

import type { Metadata } from 'next'
import type { PageLang } from '@/interface/General.model'

export async function generateMetadata({ params: { locale } }: PageLang): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    description: t('Home.Description'),
    title: t('Home.Title')
  }
}

export const viewport = appViewport.appDefaultViewport

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)

  return <HomeContainer />
}
