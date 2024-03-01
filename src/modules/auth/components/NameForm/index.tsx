'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Link from '@/components/ui/link'

import { useTranslation } from '@/app/i18n/client'
import Validations from '@/lib/Validations'

const formSchema = z.object({
  name: z.string().min(1, { message: Validations.Login.Mobile }),
})

type Props = { loading: boolean; onSubmit: (data: z.infer<typeof formSchema>) => void }
const NameForm: React.FC<Props> = ({ loading, onSubmit }) => {
  const { lng } = useParams()
  const { t } = useTranslation(lng as string, 'Auth')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '' },
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
        <Link lng={lng as string} href="/app" className="text-primary cursor-pointer">
          {t('Skip')}
        </Link>
      </div>
    </div>
  )
}

export default NameForm
