import { Metadata } from 'next'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import { PageLang } from '@/interface/General.model'

import { appViewport } from '@/constants'
import { locales } from '@/i18n'
import ChatContainer from '@/modules/chat/containers/Chat'

export async function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params: { locale } }: PageLang): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('Chat.Title'),
    description: t('Chat.Description'),
  }
}

export const viewport = appViewport.appDefaultViewport

export default async function Chat({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale)

  return <ChatContainer />
}
