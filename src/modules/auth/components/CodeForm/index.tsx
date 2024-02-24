'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { CodeInput } from '@/components/ui/code-input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { useTranslation } from '@/app/i18n/client'
import Validations from '@/lib/Validations'
import { YekanBakhNumFont } from '@/styles/fonts'

const formSchema = z.object({ code: z.string().length(6, { message: Validations.Login.Code }) })

type Props = { loading: boolean; onSubmit: (data: z.infer<typeof formSchema>) => void; onBack: () => void }
const CodeForm: React.FC<Props> = ({ loading, onSubmit, onBack }) => {
  const { lng } = useParams()
  const { t } = useTranslation(lng as string, 'Auth')

  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema), defaultValues: { code: '' } })

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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
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
                    <div dir="ltr" className={clsx(YekanBakhNumFont.className)}>
                      <CodeInput
                        name="code"
                        lng={lng as string}
                        error={!!codeError}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </div>
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

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
