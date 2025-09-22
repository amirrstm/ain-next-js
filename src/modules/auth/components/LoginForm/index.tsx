'use client'

import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { toast } from 'sonner'

import GoogleIcon from '@/icons/google'

import { Input } from './Input'

import type React from 'react'

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
    <div className="w-full p-6">
      <div className="text-center">
        <h1 className="bg-gradient-to-r from-primary to-textWhite bg-clip-text font-bold text-3xl text-transparent">
          {t('Title')}
        </h1>

        <p className="mx-auto mt-2 max-w-[80%] text-gray-400 text-xs leading-relaxed">{t('Subtitle')}</p>
      </div>

      <div className="pt-6">
        <Input
          dir="ltr"
          inputMode="numeric"
          loading={loading}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          onRequestSubmit={onRequestSubmit}
          placeholder={t('MobilePlaceholder')}
          value={value}
        />
      </div>

      <div
        className={clsx('flex cursor-pointer items-center justify-center gap-2 px-1 py-4', {
          '!opacity-40 !cursor-not-allowed': googleLoading
        })}
        onClick={onGoogle}
      >
        <GoogleIcon />
        <span className="text-white text-xs">{t('Google')}</span>
      </div>
    </div>
  )
}

export default LoginForm
