import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'

import { zodResolver } from '@hookform/resolvers/zod'
import { IconPlus, IconSend2 } from '@tabler/icons-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import useSWRMutation from 'swr/mutation'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'

import API from '@/lib/api'

import { requestTemplate } from '../../services'

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
})

const RequestTemplate: React.FC = () => {
  const { toast } = useToast()
  const { resolvedTheme } = useTheme()
  const t = useTranslations('Copywriting')
  const [isOpen, setIsOpen] = useState(false)
  const { trigger, isMutating } = useSWRMutation(API.CATEGORY.REQUEST, requestTemplate)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', description: '' },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
    trigger(data).then(() => {
      form.reset()
      setIsOpen(false)
      toast({ title: t('Template.Fields.Success'), variant: 'success' })
    })
  }

  return (
    <>
      <Button
        className="w-full gap-2"
        onClick={() => setIsOpen(true)}
        variant={resolvedTheme === 'dark' ? 'default' : 'secondary'}
      >
        <IconPlus className="w-5 h-5" />
        <span>{t('Template.Title')}</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent dir="rtl">
          <DialogHeader>
            <DialogTitle asChild>
              <h1 className="text-xl"> {t('Template.Title')}</h1>
            </DialogTitle>
            <DialogDescription asChild>
              <div className="w-full px-2 overflow-y-auto">
                <div className="border-b pb-4 pt-1">
                  <p>{t('Template.Subtitle')}</p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-12 gap-6 mt-4">
                      <div className="col-span-12">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                <p className="mb-2">{t('Template.Fields.Name')}</p>
                              </FormLabel>
                              <FormControl>
                                <Input autoFocus placeholder={t('Template.Fields.NamePlaceholder')} {...field} />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="col-span-12">
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                <p className="mb-2">{t('Template.Fields.Description')}</p>
                              </FormLabel>
                              <FormControl>
                                <Textarea placeholder={t('Template.Fields.DescriptionPlaceholder')} {...field} />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="pt-6 flex justify-end">
                      <Button
                        type="submit"
                        className="flex gap-2"
                        loading={isMutating}
                        disabled={!form.getValues().name}
                      >
                        {t('Template.Fields.Submit')}
                        <IconSend2 className="w-5 h-5 rotate-180" />
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default RequestTemplate
