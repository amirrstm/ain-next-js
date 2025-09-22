'use client'

import { IconProgress } from '@tabler/icons-react'
import clsx from 'clsx'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { CodeInput } from '@/components/ui/code-input'
import { useI18nZodErrors } from '@/lib/zodValidation'
import { YekanBakhNumFont } from '@/styles/fonts'

import type React from 'react'

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
  }, [seconds, minutes])

  const onCodeChange = (e: string) => {
    setValue(e)

    if (e.length === 6) {
      onSubmit({ code: e })
    }
  }

  return (
    <div className="w-full p-6">
      <div className="text-center">
        <h1 className="bg-gradient-to-r from-primary to-textWhite bg-clip-text font-bold text-3xl text-transparent">
          {t('CodeTitle')}
        </h1>

        <p className="mx-auto mt-2 max-w-[80%] text-gray-400 text-xs leading-relaxed">{t('CodeSubtitle')}</p>
      </div>

      <div className="relative pt-4" dir="ltr">
        {loading && (
          <div className="absolute top-4 right-0 bottom-0 left-0 z-10 flex w-full items-center justify-center bg-secondary/80">
            <IconProgress className="h-6 w-6 animate-spin text-neutral-400" />
          </div>
        )}

        <CodeInput name="code" onChange={onCodeChange} value={value} />
      </div>

      <div className="flex items-center justify-between py-6 text-xs">
        {seconds > 0 || minutes > 0 ? (
          <p className={locale === 'fa' ? YekanBakhNumFont.className : ''}>
            {t('Time')}: {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </p>
        ) : (
          <p>{t('DidNotReceive')}</p>
        )}

        <span
          className={clsx('cursor-pointer text-primary text-xs', {
            '!text-white !cursor-not-allowed opacity-35': seconds > 0 || minutes > 0
          })}
          onClick={onResend}
        >
          {t('Resend')}
        </span>
      </div>

      <div className="text-center font-light text-xs">
        <span className="cursor-pointer text-primary dark:text-primary-foreground" onClick={onBack}>
          {t('Fields.TwoFactorBack')}
        </span>
      </div>
    </div>
  )
}

export default CodeForm
