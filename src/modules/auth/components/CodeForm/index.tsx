'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { CodeInput } from '@/components/ui/code-input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Link } from '@/components/ui/navigation'

import { useI18nZodErrors } from '@/lib/zodValidation'
import { YekanBakhNumFont } from '@/styles/fonts'

const formSchema = z.object({ code: z.string().length(6) })

type Props = {
  loading: boolean
  onBack: () => void
  onResend: () => void
  onSubmit: (data: z.infer<typeof formSchema>) => void
}
const CodeForm: React.FC<Props> = ({ loading, onSubmit, onBack, onResend }) => {
  useI18nZodErrors('auth')
  const t = useTranslations('Auth')
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
    <div className="border border-muted-foreground bg-background rounded-lg p-6 w-full shadow-2xl">
      <Link href="/">
        <div className="relative h-7 sm:h-8">
          <Image
            alt="logo"
            width={200}
            height={200}
            src="/images/logo-black.png"
            className="w-full h-full object-contain dark:grayscale dark:invert dark:contrast-[1] dark:hue-rotate-[180deg]"
          />
        </div>
      </Link>

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
              <span className="text-sm text-primary dark:text-gray-400"> {t('Resend')}</span>
            </Button>
          </div>

          <Button type="submit" className="w-full" loading={loading}>
            {t('Submit')}
          </Button>
        </form>
      </Form>

      <div className="font-light pt-6 text-sm text-center">
        <span className="text-primary dark:text-primary-foreground cursor-pointer" onClick={onBack}>
          {t('Fields.TwoFactorBack')}
        </span>
      </div>
    </div>
  )
}

export default CodeForm
