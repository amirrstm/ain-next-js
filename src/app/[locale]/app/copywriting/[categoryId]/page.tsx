import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { AppCategory } from '@/interface/Category.model'
import { PageLang, ResponseModel } from '@/interface/General.model'

import { appViewport } from '@/constants'
import ENDPOINTS from '@/lib/Endpoints'
import fetchWithUrl from '@/lib/fetchUrl'
import SingleCategoryContainer from '@/modules/copywriting/containers/SingleCategory'

export async function generateMetadata({ params: { locale } }: PageLang): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('Copywriting.Title'),
    description: t('Copywriting.Description'),
  }
}

export const viewport = appViewport.appDefaultViewport

export default async function Copywriting({ params: { categoryId } }: { params: { categoryId: string } }) {
  const category: ResponseModel<AppCategory> = await fetchWithUrl(ENDPOINTS.CATEGORY.GET(categoryId), {
    next: { revalidate: 3600 },
  })

  return <SingleCategoryContainer category={category} />
}
