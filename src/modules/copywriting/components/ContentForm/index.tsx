import { useParams } from 'next/navigation'

import { Wand2 } from 'lucide-react'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { AppCategory } from '@/interface/Category.model'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

import { useTranslation } from '@/app/i18n/client'

interface Props {
  loading: boolean
  category: AppCategory
  appCategory?: AppCategory
  onSubmit: (data: Record<string, unknown>) => void
  setAppCategory: Dispatch<SetStateAction<AppCategory | undefined>>
}

const ContentForm: React.FC<Props> = ({ loading, category, appCategory, onSubmit, setAppCategory }) => {
  const form = useForm()
  const { lng } = useParams()
  const { t } = useTranslation(lng as string, 'Copywriting')

  useEffect(() => {
    if (category) {
      setAppCategory(category)

      category.inputs.forEach(input => {
        form.register(input.name, { required: { value: input.isRequired, message: 'لطفا این بخش را خالی نذارید' } })
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
              <FormItem>
                <FormLabel>{input.title}</FormLabel>
                <FormControl>
                  <Textarea rows={input.multiline ? 4 : 1} placeholder={input.placeholder} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <div className="p-4">
          <Button type="submit" className="w-full gap-2" loading={loading}>
            <Wand2 className="w-5 h-5" />
            <span>{t('Category.Generate')}</span>
          </Button>

          <span className="text-xs text-gray-400 mt-2 block">{t('Category.GenerateCost')}</span>
        </div>
      </form>
    </Form>
  )
}

export default ContentForm
