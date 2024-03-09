import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { PageLang } from '@/interface/General.model'

import { appViewport } from '@/constants'
import HomeContainer from '@/modules/home/containers/Home'

const keywords = [
  'تولید محتوا هوش مصنوعی',
  'ابزار تولید محتوا هوش مصنوعی',
  'سایت تولید محتوا هوش مصنوعی',
  'برنامه تولید محتوا هوش مصنوعی',
  'تولید محتوا با هوش مصنوعی',
  'هوش مصنوعی تولید محتوا رایگان',
  'هوش مصنوعی برای تولید محتوا',
  'هوش مصنوعی تولید محتوا فارسی',
  'تولید محتوا هوش مصنوعی رایگان',
  'معرفی هوش مصنوعی برای تولید محتوا',
  'تولید محتوا اینستاگرام',
  'تولید محتوای اینستاگرام',
  'تولید محتوا در اینستاگرام',
]

export async function generateMetadata({ params: { locale } }: PageLang): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('Home.Title'),
    keywords: `${t('Home.Keywords')} ${keywords.join(', ')}`,
    description: t('Home.Description'),
  }
}

export const viewport = appViewport.appDefaultViewport

export default function Home() {
  return <HomeContainer />
}
