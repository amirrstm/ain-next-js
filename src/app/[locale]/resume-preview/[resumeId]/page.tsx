import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { unstable_setRequestLocale } from 'next-intl/server'

import { PageLang } from '@/interface/General.model'

import { appDefaultViewport } from '@/constants/viewport'
import { locales } from '@/i18n'
import ResumePreviewContainer from '@/modules/resume/containers/ResumePreview'

export async function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params: { locale } }: PageLang): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('ResumePreview.Title'),
    description: t('ResumePreview.Description'),
  }
}

export const viewport = appDefaultViewport

export default async function ResumePreview({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale)

  return <ResumePreviewContainer />
}
