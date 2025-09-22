import { getTranslations, setRequestLocale } from 'next-intl/server'

import { locales } from '@/i18n'
import LoginContainer from '@/modules/auth/containers/Login'

import type { Metadata } from 'next'
import type { PageLang } from '@/interface/General.model'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params: { locale } }: PageLang): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    description: t('Login.Description'),
    title: t('Login.Title')
  }
}

export default async function Login({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)

  return (
    <div className="dark">
      <LoginContainer />
    </div>
  )
}
