import { Metadata } from 'next'

import React from 'react'

import { PageLang } from '@/interface/General.model'

import { useTranslation as serverSideTrans } from '@/app/i18n'
import LoginContainer from '@/modules/auth/containers/Login'

export async function generateMetadata({ params }: PageLang): Promise<Metadata> {
  const { t } = await serverSideTrans(params.lng, 'Auth')

  return {
    title: t('Login'),
    description: t('LoginDescription'),
  }
}

export default async function Login() {
  return <LoginContainer />
}
