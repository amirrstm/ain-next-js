'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import Validations from '@/lib/Validations'

const formSchema = z.object({
  mobile: z
    .string()
    .min(1, { message: Validations.Login.Mobile })
    .length(11, { message: Validations.Login.MobileLength }),
})

type Props = { loading: boolean; onSubmit: (data: z.infer<typeof formSchema>) => void }
const LoginForm: React.FC<Props> = ({ loading, onSubmit }) => {
  const t = useTranslations('Auth')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { mobile: '' },
  })

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
        <h1 className="text-2xl font-semibold">{t('Title')}</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <p className="pb-5 block">{t('Hello')}!</p>
                  <p>{t('Fields.Mobile')}</p>
                </FormLabel>
                <FormControl>
                  <Input autoFocus inputMode="numeric" dir="ltr" placeholder="09911234567" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" loading={loading}>
            {t('Submit')}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default LoginForm
