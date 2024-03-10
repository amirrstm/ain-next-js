import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { PageLang } from '@/interface/General.model'

import { appViewport } from '@/constants'
import AboutContainer from '@/modules/common/containers/About'

export async function generateMetadata({ params: { locale } }: PageLang): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('About.Title'),
    description: t('About.Description'),
  }
}

export const viewport = appViewport.appDefaultViewport

export default async function About() {
  return <AboutContainer />
}
