'use client'

import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

import { IconProgress } from '@tabler/icons-react'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'

import { CodeInput } from '@/components/ui/code-input'

import { useI18nZodErrors } from '@/lib/zodValidation'
import { YekanBakhNumFont } from '@/styles/fonts'

type Props = {
  loading: boolean
  onBack: () => void
  onResend: () => void
  onSubmit: (data: { code: string }) => void
}
const CodeForm: React.FC<Props> = ({ loading, onSubmit, onBack, onResend }) => {
  useI18nZodErrors('auth')
  const { locale } = useParams()
  const t = useTranslations('Auth')
  const [value, setValue] = useState('')
  const [minutes, setMinutes] = useState(5)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval)
        } else {
          setSeconds(59)
          setMinutes(minutes - 1)
        }
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [seconds])

  const onCodeChange = (e: string) => {
    setValue(e)

    if (e.length === 6) {
      onSubmit({ code: e })
    }
  }

  return (
    <div className="p-6 w-full">
      <div className="text-center">
        <h1 className="text-3xl font-bold from-primary to-textWhite bg-gradient-to-r bg-clip-text text-transparent">
          {t('CodeTitle')}
        </h1>

        <p className="text-xs text-gray-400 max-w-[80%] mx-auto leading-relaxed mt-2">{t('CodeSubtitle')}</p>
      </div>

      <div dir="ltr" className="relative pt-4">
        {loading && (
          <div className="absolute w-full top-4 bottom-0 right-0 left-0 bg-secondary/80 z-10 flex items-center justify-center">
            <IconProgress className="animate-spin w-6 h-6 text-neutral-400" />
          </div>
        )}

        <CodeInput value={value} onChange={onCodeChange} name="code" />
      </div>

      <div className="flex justify-between items-center text-xs py-6">
        {seconds > 0 || minutes > 0 ? (
          <p className={locale === 'fa' ? YekanBakhNumFont.className : ''}>
            {t('Time')}: {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </p>
        ) : (
          <p>{t('DidNotReceive')}</p>
        )}

        <span
          onClick={onResend}
          className={clsx('text-xs text-primary cursor-pointer', {
            '!text-white opacity-35 !cursor-not-allowed': seconds > 0 || minutes > 0,
          })}
        >
          {t('Resend')}
        </span>
      </div>

      <div className="font-light text-xs text-center">
        <span className="text-primary dark:text-primary-foreground cursor-pointer" onClick={onBack}>
          {t('Fields.TwoFactorBack')}
        </span>
      </div>
    </div>
  )
}

export default CodeForm
