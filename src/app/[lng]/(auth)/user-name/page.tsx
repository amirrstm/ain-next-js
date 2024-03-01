import { Metadata } from 'next'

import React from 'react'

import { PageLang } from '@/interface/General.model'

import { useTranslation as serverSideTrans } from '@/app/i18n'
import UserNameContainer from '@/modules/auth/containers/UserName'

export async function generateMetadata({ params }: PageLang): Promise<Metadata> {
  const { t } = await serverSideTrans(params.lng, 'Meta')

  return {
    title: t('Login.Title'),
    description: t('Login.Description'),
  }
}

export default async function Login() {
  return <UserNameContainer />
}
