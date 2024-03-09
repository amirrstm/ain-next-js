'use client'

import { useTranslations } from 'next-intl'

import { zodResolver } from '@hookform/resolvers/zod'
import { IconSettings } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import useSWRMutation from 'swr/mutation'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

import ENDPOINTS from '@/lib/Endpoints'
import useUserStore from '@/lib/store/auth'
import Validations from '@/lib/Validations'
import { updateName } from '@/modules/auth/services'

const formSchema = z.object({
  firstName: z.string().min(1, { message: Validations.Profile.FirstName }),
  lastName: z.string().min(1, { message: Validations.Profile.LastName }),
})

const UserSettingsContainer: React.FC = () => {
  const { toast } = useToast()
  const t = useTranslations('User')
  const { user, setUser } = useUserStore()
  const [loading, setLoading] = useState(false)
  const { trigger } = useSWRMutation(ENDPOINTS.USER.UPDATE_NAME, updateName)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { firstName: '', lastName: '' },
  })

  useEffect(() => {
    if (user) {
      form.setValue('lastName', user.lastName)
      form.setValue('firstName', user.firstName)
    }
  }, [user])

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setLoading(true)
    trigger(data)
      .then(() => {
        if (user) {
          setUser({ ...user, firstName: data.firstName, lastName: data.lastName })
          toast({ title: t('Settings.Success'), variant: 'success' })
        }
      })
      .catch(() => setLoading(false))
  }

  return (
    <div className="p-2 md:py-3 md:px-8">
      <div className="md:mb-4 pt-2 pb-4 md:pb-0">
        <div className="flex items-center gap-2">
          <IconSettings className="w-6 h-6" />
          <span className="text-lg">{t('Settings.Title')}</span>
        </div>
      </div>

      <div className="border rounded-xl bg-white">
        <div className="border-b p-4">
          <span className="text-lg">{t('Settings.EditProfile')}</span>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="p-4 grid grid-cols-12 gap-6">
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

            <div className="border-t mt-6 p-4 flex justify-end">
              <Button type="submit" loading={loading}>
                {t('Settings.Save')}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default UserSettingsContainer
