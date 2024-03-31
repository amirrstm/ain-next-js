import { Metadata } from 'next'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import { PageLang } from '@/interface/General.model'

import { appViewport } from '@/constants'
import { locales } from '@/i18n'
import PlansContainer from '@/modules/pricing/containers/Plans'

export async function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params: { locale } }: PageLang): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('Pricing.Title'),
    description: t('Pricing.Description'),
  }
}

export const viewport = appViewport.appDefaultViewport

export default async function Pricing({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale)

  return <PlansContainer />
}
