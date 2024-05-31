'use client'

import { useTranslations } from 'next-intl'

import clsx from 'clsx'
import React, { useState } from 'react'
import { toast } from 'sonner'

import GoogleIcon from '@/icons/google'

import { Input } from './Input'

type Props = { loading: boolean; googleLoading: boolean; onSubmit: (data: { mobile: string }) => void }
const LoginForm: React.FC<Props> = ({ loading, onSubmit, googleLoading }) => {
  const t = useTranslations('Auth')
  const [value, setValue] = useState('')

  const onGoogle = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_ENDPOINT}/api/v1/auth/user/google`
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onRequestSubmit()
    }
  }

  const onRequestSubmit = () => {
    if (!value || value.length === 0) {
      toast.error(t('Fields.Mobile'))
      return
    }

    onSubmit({ mobile: value })
  }

  return (
    <div className=" p-6 w-full">
      <div className="text-center">
        <h1 className="text-3xl font-bold from-primary to-textWhite bg-gradient-to-r bg-clip-text text-transparent">
          {t('Title')}
        </h1>

        <p className="text-xs text-gray-400 max-w-[80%] mx-auto leading-relaxed mt-2">{t('Subtitle')}</p>
      </div>

      <div className="pt-6">
        <Input
          dir="ltr"
          value={value}
          loading={loading}
          inputMode="numeric"
          onKeyDown={onKeyDown}
          onRequestSubmit={onRequestSubmit}
          placeholder={t('MobilePlaceholder')}
          onChange={e => setValue(e.target.value)}
        />
      </div>

      <div
        onClick={onGoogle}
        className={clsx('flex cursor-pointer items-center gap-2 px-1 py-4 justify-center', {
          '!opacity-40 !cursor-not-allowed': googleLoading,
        })}
      >
        <GoogleIcon />
        <span className="text-xs">{t('Google')}</span>
      </div>
    </div>
  )
}

export default LoginForm
