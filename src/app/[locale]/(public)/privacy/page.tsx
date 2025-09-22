import { getTranslations, setRequestLocale } from 'next-intl/server'

import { appViewport } from '@/constants'
import { locales } from '@/i18n'
import PrivacyContainer from '@/modules/common/containers/Privacy'

import type { Metadata } from 'next'
import type { PageLang } from '@/interface/General.model'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params: { locale } }: PageLang): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    description: t('Privacy.Description'),
    title: t('Privacy.Title')
  }
}

export const viewport = appViewport.appLayoutViewport

export default async function Privacy({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)

  return <PrivacyContainer />
}
