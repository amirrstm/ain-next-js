import { Metadata } from 'next'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import { PageLang } from '@/interface/General.model'

import { appViewport } from '@/constants'
import SingleCategoryContainer from '@/modules/copywriting/containers/SingleCategory'

export async function generateMetadata({ params: { locale } }: PageLang): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('Copywriting.Title'),
    description: t('Copywriting.Description'),
  }
}

export const viewport = appViewport.appDefaultViewport

export default async function Copywriting({ params: { locale } }: { params: { categoryId: string; locale: string } }) {
  unstable_setRequestLocale(locale)

  return <SingleCategoryContainer />
}
