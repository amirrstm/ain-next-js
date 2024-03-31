import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { unstable_setRequestLocale } from 'next-intl/server'

import { PageLang } from '@/interface/General.model'

import { appViewport } from '@/constants'
import { locales } from '@/i18n'
import AboutContainer from '@/modules/common/containers/About'

export async function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params: { locale } }: PageLang): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('About.Title'),
    description: t('About.Description'),
  }
}

export const viewport = appViewport.appDefaultViewport

export default async function About({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale)

  return <AboutContainer />
}
