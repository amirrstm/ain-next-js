import { IconWand } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { type Dispatch, type SetStateAction, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ReactSelect } from '@/components/ui/react-select'
import { Textarea } from '@/components/ui/textarea'

import useTones from '../../hooks/useTones'

import type React from 'react'
import type { AppCategory } from '@/interface/Category.model'

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

  const form = useForm({
    defaultValues: {
      temperature: { _id: '0.7', name: t('Category.Creativity.Optimal') },
      variant: { _id: '1', name: t('Category.Variants.One') }
    }
  })

  useEffect(() => {
    if (category) {
      setAppCategory(category)

      category.inputs.forEach((input) => {
        form.register(input.name, {
          required: { message: t('Content.RequiredError'), value: input.isRequired },
          value: ''
        })
      })
    }
  }, [category, form.register, setAppCategory, t])

  useEffect(() => {
    if (tones) {
      form.setValue(
        'tone',
        tones.find((tone) => tone.name === 'متقاعدکننده' || tone.name === 'Convincing')
      )
    }
  }, [tones, form.setValue])

  if (!appCategory) return null

  return (
    <Form {...form}>
      <form className="flex h-full flex-col justify-between space-y-8 p-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-8">
          <div className="flex gap-3">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="tone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Category.ToneOfVoice')}</FormLabel>
                    <FormControl>
                      <ReactSelect
                        getOptionLabel={(op) => op.name}
                        getOptionValue={(op) => op._id}
                        isDisabled={tonesLoading}
                        isLoading={tonesLoading}
                        isSearchable={false}
                        options={tones}
                        size="sm"
                        useLabelValue
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
                control={form.control}
                name="temperature"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Category.Creativity.Title')}</FormLabel>
                    <FormControl>
                      <ReactSelect
                        getOptionLabel={(op) => op.name}
                        getOptionValue={(op) => op._id}
                        isSearchable={false}
                        options={[
                          { _id: '0.7', name: t('Category.Creativity.Optimal') },
                          { _id: '0', name: t('Category.Creativity.None') },
                          { _id: '0.3', name: t('Category.Creativity.Low') },
                          { _id: '0.5', name: t('Category.Creativity.Medium') },
                          { _id: '0.8', name: t('Category.Creativity.High') },
                          { _id: '1', name: t('Category.Creativity.Max') }
                        ]}
                        size="sm"
                        useLabelValue
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {appCategory.inputs.map((input) => (
            <FormField
              control={form.control}
              key={input._id}
              name={input.name}
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>{input.title}</FormLabel>
                  <FormControl>
                    {!input.multiline ? (
                      <Input inputSize="sm" maxLength={100} placeholder={input.placeholder} {...field} />
                    ) : (
                      <Textarea maxLength={300} placeholder={input.placeholder} rows={4} size="sm" {...field} />
                    )}
                  </FormControl>

                  <div className="absolute end-0">
                    <p className="text-gray-400 text-xs">
                      {input.multiline ? 300 : 100} / {String(field.value || '').length}
                    </p>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <div className="pt-4">
          <Button className="w-full gap-2" loading={loading} type="submit">
            <IconWand className="h-5 w-5" />
            <span>{t('Category.Generate')}</span>
          </Button>

          {/* <span className="text-xs text-gray-400 mt-2 block text-center">{t('Category.GenerateCost')}</span> */}
        </div>
      </form>
    </Form>
  )
}

export default ContentForm
