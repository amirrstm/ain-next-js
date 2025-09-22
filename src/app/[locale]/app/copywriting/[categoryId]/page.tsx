import { getTranslations, setRequestLocale } from 'next-intl/server'

import { appViewport } from '@/constants'
import SingleCategoryContainer from '@/modules/copywriting/containers/SingleCategory'

import type { Metadata } from 'next'
import type { PageLang } from '@/interface/General.model'

export async function generateMetadata({ params: { locale } }: PageLang): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    description: t('Copywriting.Description'),
    title: t('Copywriting.Title')
  }
}

export const viewport = appViewport.appDefaultViewport

export default async function Copywriting({ params: { locale } }: { params: { categoryId: string; locale: string } }) {
  setRequestLocale(locale)

  return <SingleCategoryContainer />
}
