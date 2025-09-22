import { getTranslations, setRequestLocale } from 'next-intl/server'

import { appViewport } from '@/constants'
import { locales } from '@/i18n'
import PlansContainer from '@/modules/pricing/containers/Plans'

import type { Metadata } from 'next'
import type { PageLang } from '@/interface/General.model'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params: { locale } }: PageLang): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    description: t('Pricing.Description'),
    title: t('Pricing.Title')
  }
}

export const viewport = appViewport.appDefaultViewport

export default async function Pricing({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)

  return <PlansContainer />
}
