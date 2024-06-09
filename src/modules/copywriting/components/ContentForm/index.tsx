import { useTranslations } from 'next-intl'

import { IconWand } from '@tabler/icons-react'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { AppCategory } from '@/interface/Category.model'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ReactSelect } from '@/components/ui/react-select'
import { Textarea } from '@/components/ui/textarea'

import useTones from '../../hooks/useTones'

interface Props {
  loading: boolean
  category: AppCategory
  appCategory?: AppCategory
  onSubmit: (data: Record<string, unknown>) => void
  setAppCategory: Dispatch<SetStateAction<AppCategory | undefined>>
}

const ContentForm: React.FC<Props> = ({ loading, category, appCategory, onSubmit, setAppCategory }) => {
  const t = useTranslations('Copywriting')
  const { isLoading: tonesLoading, data: tones } = useTones()

  const form = useForm<any>({
    defaultValues: {
      variant: { _id: '1', name: t('Category.Variants.One') },
      temperature: { _id: '0.7', name: t('Category.Creativity.Optimal') },
    },
  })

  useEffect(() => {
    if (category) {
      setAppCategory(category)

      category.inputs.forEach(input => {
        form.register(input.name, {
          value: '',
          required: { value: input.isRequired, message: t('Content.RequiredError') },
        })
      })
    }
  }, [category])

  useEffect(() => {
    if (tones) {
      form.setValue(
        'tone',
        tones.find(tone => tone.name === 'متقاعدکننده' || tone.name === 'Convincing'),
      )
    }
  }, [tones])

  if (!appCategory) return null

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 space-y-8 h-full flex flex-col justify-between">
        <div className="space-y-8">
          <FormField
            name="tone"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Category.ToneOfVoice')}</FormLabel>
                <FormControl>
                  <ReactSelect
                    size="sm"
                    useLabelValue
                    options={tones}
                    isSearchable={false}
                    isLoading={tonesLoading}
                    isDisabled={tonesLoading}
                    getOptionLabel={(op: any) => op.name}
                    getOptionValue={(op: any) => op._id}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

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

          <div className="flex gap-3">
            <div className="flex-1">
              <FormField
                name="temperature"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Category.Creativity.Title')}</FormLabel>
                    <FormControl>
                      <ReactSelect
                        size="sm"
                        useLabelValue
                        options={[
                          { _id: '0.7', name: t('Category.Creativity.Optimal') },
                          { _id: '0', name: t('Category.Creativity.None') },
                          { _id: '0.3', name: t('Category.Creativity.Low') },
                          { _id: '0.5', name: t('Category.Creativity.Medium') },
                          { _id: '0.8', name: t('Category.Creativity.High') },
                          { _id: '1', name: t('Category.Creativity.Max') },
                        ]}
                        isSearchable={false}
                        getOptionLabel={(op: any) => op.name}
                        getOptionValue={(op: any) => op._id}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex-1">
              <FormField
                name="variant"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Category.Variants.Title')}</FormLabel>
                    <FormControl>
                      <ReactSelect
                        size="sm"
                        useLabelValue
                        options={[
                          { _id: '1', name: t('Category.Variants.One') },
                          { _id: '2', name: t('Category.Variants.Two') },
                          { _id: '3', name: t('Category.Variants.Three') },
                        ]}
                        isSearchable={false}
                        getOptionLabel={(op: any) => op.name}
                        getOptionValue={(op: any) => op._id}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="pt-4">
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
