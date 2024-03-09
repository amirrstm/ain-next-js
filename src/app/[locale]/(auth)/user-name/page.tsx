import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import React from 'react'

import { PageLang } from '@/interface/General.model'

import UserNameContainer from '@/modules/auth/containers/UserName'

export async function generateMetadata({ params: { locale } }: PageLang): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('Login.Title'),
    description: t('Login.Description'),
  }
}

export default async function Login() {
  return <UserNameContainer />
}
