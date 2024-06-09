import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'

import { AppCategory } from '@/interface/Category.model'
import { PageLang, ResponseModel } from '@/interface/General.model'

import { appViewport } from '@/constants'
import { locales } from '@/i18n'
import API from '@/lib/api'
import fetchWithUrl, { fetchWithoutCookie } from '@/lib/fetch-url'

const cacheOpt = { next: { revalidate: 3600 } }
const getOne = (id: string) => API.CATEGORY.GET(id)

export async function generateStaticParams() {
  const categories: ResponseModel<AppCategory[]> = await fetchWithoutCookie(API.CATEGORY.LIST_PAIN, cacheOpt)
  const paths = categories.data.map(category => ({ params: { categoryId: category.slug } }))

  return locales.map(locale => paths.map(path => ({ ...path, locale })))
}

export async function generateMetadata({ params: { categoryId } }: PageLang): Promise<Metadata> {
  const category: ResponseModel<AppCategory> = await fetchWithoutCookie(getOne(categoryId), cacheOpt)

  return {
    title: category.data?.meta?.seo?.title || category.data.name,
    description: category.data?.meta?.seo?.description || category.data.description,
  }
}

export const viewport = appViewport.appDefaultViewport

export default async function UseCase({
  params: { categoryId, locale },
}: {
  params: { categoryId: string; locale: string }
}) {
  unstable_setRequestLocale(locale)
  const category: ResponseModel<AppCategory> = await fetchWithUrl(getOne(categoryId), cacheOpt)

  return <p>{category.data.name}</p>
}
