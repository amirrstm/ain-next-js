import { useTranslations } from 'next-intl'

import { IconWand } from '@tabler/icons-react'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { AppCategory } from '@/interface/Category.model'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface Props {
  loading: boolean
  category: AppCategory
  appCategory?: AppCategory
  onSubmit: (data: Record<string, unknown>) => void
  setAppCategory: Dispatch<SetStateAction<AppCategory | undefined>>
}

const ContentForm: React.FC<Props> = ({ loading, category, appCategory, onSubmit, setAppCategory }) => {
  const form = useForm()
  const t = useTranslations('Copywriting')

  useEffect(() => {
    if (category) {
      setAppCategory(category)

      category.inputs.forEach(input => {
        form.register(input.name, {
          value: '',
          required: { value: input.isRequired, message: 'لطفا این بخش را خالی نذارید' },
        })
      })
    }
  }, [category])

  if (!appCategory) return null

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 space-y-8">
        {appCategory.inputs.map(input => (
          <FormField
            key={input._id}
            control={form.control}
            name={input.name}
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>{input.title}</FormLabel>
                <FormControl>
                  {!input.multiline ? (
                    <Input maxLength={100} placeholder={input.placeholder} {...field} />
                  ) : (
                    <Textarea maxLength={300} rows={4} placeholder={input.placeholder} {...field} />
                  )}
                </FormControl>

                <div className="absolute left-0">
                  <p className="text-xs text-gray-400">
                    {input.multiline ? 300 : 100} / {String(field.value || '').length}
                  </p>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <div className="py-4">
          <Button type="submit" className="w-full gap-2" loading={loading}>
            <IconWand className="w-5 h-5" />
            <span>{t('Category.Generate')}</span>
          </Button>

          <span className="text-xs text-gray-400 mt-2 block text-center">{t('Category.GenerateCost')}</span>
        </div>
      </form>
    </Form>
  )
}

export default ContentForm
