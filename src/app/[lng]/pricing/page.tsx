import { Metadata } from 'next'

import { PageLang } from '@/interface/General.model'

import { useTranslation as serverSideTrans } from '@/app/i18n'
import { appViewport } from '@/constants'
import PlansContainer from '@/modules/pricing/containers/Plans'

export async function generateMetadata({ params }: PageLang): Promise<Metadata> {
  const { t } = await serverSideTrans(params.lng, 'Meta')

  return {
    title: t('Pricing.Title'),
    description: t('Pricing.Description'),
  }
}

export const viewport = appViewport.appDefaultViewport

export default async function App() {
  return <PlansContainer />
}
