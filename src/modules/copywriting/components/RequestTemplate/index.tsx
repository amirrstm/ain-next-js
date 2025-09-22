import { zodResolver } from '@hookform/resolvers/zod'
import { IconPlus, IconSend2 } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import useSWRMutation from 'swr/mutation'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import API from '@/lib/api'

import { requestTemplate } from '../../services'

import type React from 'react'

const formSchema = z.object({
  description: z.string(),
  name: z.string()
})

const RequestTemplate: React.FC = () => {
  const { resolvedTheme } = useTheme()
  const t = useTranslations('Copywriting')
  const [isOpen, setIsOpen] = useState(false)
  const { trigger, isMutating } = useSWRMutation(API.CATEGORY.REQUEST, requestTemplate)

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: { description: '', name: '' },
    resolver: zodResolver(formSchema)
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
    trigger(data).then(() => {
      form.reset()
      setIsOpen(false)
      toast.success(t('Template.Fields.Success'))
    })
  }

  return (
    <>
      <Button
        className="w-full gap-2"
        onClick={() => setIsOpen(true)}
        variant={resolvedTheme === 'dark' ? 'default' : 'secondary'}
      >
        <IconPlus className="h-5 w-5" />
        <span>{t('Template.Title')}</span>
      </Button>

      <Dialog onOpenChange={() => setIsOpen(false)} open={isOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle asChild>
              <>
                <h1 className="text-xl"> {t('Template.Title')}</h1>
                <div className="border-b pb-2 text-xs">
                  <p>{t('Template.Subtitle')}</p>
                </div>
              </>
            </DialogTitle>
            <DialogDescription asChild>
              <div className="w-full overflow-y-auto px-2">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="mt-4 grid grid-cols-12 gap-6">
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

                    <div className="flex justify-end pt-6">
                      <Button className="flex gap-2" disabled={!form.getValues().name} loading={isMutating} type="submit">
                        {t('Template.Fields.Submit')}
                        <IconSend2 className="h-5 w-5 rotate-180" />
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
