import { Metadata } from 'next'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import React from 'react'

import { PageLang } from '@/interface/General.model'

import { locales } from '@/i18n'
import LoginContainer from '@/modules/auth/containers/Login'

export async function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params: { locale } }: PageLang): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('Login.Title'),
    description: t('Login.Description'),
  }
}

export default async function Login({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale)

  return (
    <div className="dark">
      <LoginContainer />
    </div>
  )
}
