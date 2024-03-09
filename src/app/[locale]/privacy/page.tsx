import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { PageLang } from '@/interface/General.model'

import { appViewport } from '@/constants'
import PrivacyContainer from '@/modules/common/containers/Privacy'

export async function generateMetadata({ params: { locale } }: PageLang): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('Privacy.Title'),
    description: t('Privacy.Description'),
  }
}

export const viewport = appViewport.appLayoutViewport

export default async function App() {
  return <PrivacyContainer />
}
