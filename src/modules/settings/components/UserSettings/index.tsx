'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import useSWRMutation from 'swr/mutation'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import API from '@/lib/api'
import useUserStore from '@/lib/store/auth'
import { useI18nZodErrors } from '@/lib/zodValidation'
import { updateName } from '@/modules/auth/services'

import type React from 'react'

const formSchema = z.object({ firstName: z.string().min(1), lastName: z.string().min(1) })

const UserSettings: React.FC = () => {
  useI18nZodErrors('auth')

  const t = useTranslations('User')
  const { user, setUser } = useUserStore()
  const [loading, setLoading] = useState(false)
  const { trigger } = useSWRMutation(API.USER.UPDATE_NAME, updateName)

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: { firstName: '', lastName: '' },
    resolver: zodResolver(formSchema)
  })

  useEffect(() => {
    if (user) {
      form.setValue('lastName', user.lastName)
      form.setValue('firstName', user.firstName)
    }
  }, [user, form.setValue])

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setLoading(true)
    trigger(data)
      .then(() => {
        setLoading(false)
        if (user) {
          setUser({ ...user, firstName: data.firstName, lastName: data.lastName })
          toast.success(t('Settings.Success'))
        }
      })
      .catch(() => setLoading(false))
  }

  return (
    <div className="rounded-xl border border-muted bg-card">
      <div className="border-b border-b-muted p-4">
        <span className="text-lg">{t('Settings.EditProfile')}</span>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-6 p-4">
            <div className="col-span-12 md:col-span-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <p className="mb-2">{t('Settings.FirstName')}</p>
                    </FormLabel>
                    <FormControl>
                      <Input autoFocus placeholder={t('Settings.FirstName')} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-12 md:col-span-6">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <p className="mb-2">{t('Settings.LastName')}</p>
                    </FormLabel>
                    <FormControl>
                      <Input autoFocus placeholder={t('Settings.LastName')} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end border-t border-t-muted p-4">
            <Button loading={loading} type="submit">
              {t('Settings.Save')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default UserSettings
