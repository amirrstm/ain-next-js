import { Metadata } from 'next'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import { PageLang } from '@/interface/General.model'

import { appViewport } from '@/constants'
import { locales } from '@/i18n'
import PrivacyContainer from '@/modules/common/containers/Privacy'

export async function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params: { locale } }: PageLang): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('Privacy.Title'),
    description: t('Privacy.Description'),
  }
}

export const viewport = appViewport.appLayoutViewport

export default async function Privacy({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale)

  return <PrivacyContainer />
}
