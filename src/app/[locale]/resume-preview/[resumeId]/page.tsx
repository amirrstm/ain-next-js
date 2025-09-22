import { getTranslations, setRequestLocale } from 'next-intl/server'

import { appDefaultViewport } from '@/constants/viewport'
import { locales } from '@/i18n'
import ResumePreviewContainer from '@/modules/resume/containers/ResumePreview'

import type { Metadata } from 'next'
import type { PageLang } from '@/interface/General.model'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params: { locale } }: PageLang): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    description: t('ResumePreview.Description'),
    title: t('ResumePreview.Title')
  }
}

export const viewport = appDefaultViewport

export default async function ResumePreview({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)

  return <ResumePreviewContainer />
}
