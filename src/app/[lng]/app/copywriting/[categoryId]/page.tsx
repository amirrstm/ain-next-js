import { Metadata } from 'next'

import { PageLang } from '@/interface/General.model'

import { useTranslation as serverSideTrans } from '@/app/i18n'
import { appViewport } from '@/constants'
import SingleCategoryContainer from '@/modules/copywriting/containers/SingleCategory'

export async function generateMetadata({ params }: PageLang): Promise<Metadata> {
  const { t } = await serverSideTrans(params.lng, 'Meta')

  return {
    title: t('Copywriting.Title'),
    description: t('Copywriting.Description'),
  }
}

export const viewport = appViewport.appDefaultViewport

export default async function Copywriting() {
  return <SingleCategoryContainer />
}
