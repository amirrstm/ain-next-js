'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { CodeInput } from '@/components/ui/code-input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { useTranslation } from '@/app/i18n/client'
import Validations from '@/lib/Validations'
import { YekanBakhNumFont } from '@/styles/fonts'

const formSchema = z.object({ code: z.string().length(6, { message: Validations.Login.Code }) })

type Props = {
  loading: boolean
  onBack: () => void
  onResend: () => void
  onSubmit: (data: z.infer<typeof formSchema>) => void
}
const CodeForm: React.FC<Props> = ({ loading, onSubmit, onBack, onResend }) => {
  const { lng } = useParams()
  const { t } = useTranslation(lng as string, 'Auth')
  const [minutes, setMinutes] = useState(5)
  const [seconds, setSeconds] = useState(0)

  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema), defaultValues: { code: '' } })

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

  return (
    <div className="border border-gray-100 bg-white rounded-lg p-6 w-full shadow-2xl">
      <div>
        <div className="relative h-7 sm:h-8">
          <Image
            alt="logo"
            width={200}
            height={200}
            src="/images/logo-black.png"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="text-center mt-4">
        <h1 className="text-2xl rtl:font-semibold">{t('CodeTitle')}</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
          <FormField
            control={form.control}
            name="code"
            render={({
              field,
              formState: {
                errors: { code: codeError },
              },
            }) => (
              <FormItem>
                <FormLabel>{t('Fields.Code')}</FormLabel>
                <div className="flex justify-center pt-2">
                  <FormControl>
                    <div dir="ltr" className={clsx(YekanBakhNumFont.className, 'w-full')}>
                      <CodeInput
                        name="code"
                        error={!!codeError}
                        value={field.value}
                        onBlur={field.onBlur}
                        onChange={field.onChange}
                      />
                    </div>
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between items-center text-sm my-5">
            {seconds > 0 || minutes > 0 ? (
              <p className={YekanBakhNumFont.className}>
                {t('Time')}: {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </p>
            ) : (
              <p>{t('DidNotReceive')}</p>
            )}

            <Button type="button" variant="link" onClick={onResend} disabled={seconds > 0 || minutes > 0}>
              <span className="text-sm"> {t('Resend')}</span>
            </Button>
          </div>

          <Button type="submit" className="w-full" loading={loading}>
            {t('Submit')}
          </Button>
        </form>
      </Form>

      <div className="font-light pt-6 text-sm text-center">
        <span className="text-primary cursor-pointer" onClick={onBack}>
          {t('Fields.TwoFactorBack')}
        </span>
      </div>
    </div>
  )
}

export default CodeForm
