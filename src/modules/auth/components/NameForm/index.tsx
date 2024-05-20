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
import { Link } from '@/components/ui/navigation'

import { LOGO_URL } from '@/constants'
import { useI18nZodErrors } from '@/lib/zodValidation'

const formSchema = z.object({ name: z.string().min(1) })

type Props = { loading: boolean; returnUrl?: string; onSubmit: (data: z.infer<typeof formSchema>) => void }
const NameForm: React.FC<Props> = ({ loading, returnUrl, onSubmit }) => {
  useI18nZodErrors('auth')
  const t = useTranslations('Auth')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '' },
  })

  return (
    <div className="border border-muted-foreground bg-background rounded-lg p-6 w-full shadow-2xl">
      <div>
        <div className="relative h-7 sm:h-8">
          <Image
            alt="logo"
            width={200}
            height={200}
            src={LOGO_URL}
            className="w-full h-full object-contain dark:grayscale dark:invert dark:contrast-[1] dark:hue-rotate-[180deg]"
          />
        </div>
      </div>

      <div className="text-center mt-4">
        <h1 className="text-2xl font-semibold">{t('NameTitle')}</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <p className="mb-2">{t('Fields.Name')}</p>
                </FormLabel>
                <FormControl>
                  <Input autoFocus placeholder="نام شما" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" loading={loading}>
            {t('Save')}
          </Button>
        </form>
      </Form>

      <div className="font-light pt-6 text-sm text-center">
        <Link href={returnUrl ? returnUrl : '/app'} className="text-primary dark:text-gray-400 cursor-pointer">
          {t('Skip')}
        </Link>
      </div>
    </div>
  )
}

export default NameForm
