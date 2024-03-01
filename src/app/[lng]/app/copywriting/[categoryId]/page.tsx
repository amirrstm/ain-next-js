import { Metadata } from 'next'

import { AppCategory } from '@/interface/Category.model'
import { PageLang, ResponseModel } from '@/interface/General.model'

import { useTranslation as serverSideTrans } from '@/app/i18n'
import { appViewport } from '@/constants'
import ENDPOINTS from '@/lib/Endpoints'
import fetchWithUrl from '@/lib/fetchUrl'
import SingleCategoryContainer from '@/modules/copywriting/containers/SingleCategory'

export async function generateMetadata({ params }: PageLang): Promise<Metadata> {
  const { t } = await serverSideTrans(params.lng, 'Meta')

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
