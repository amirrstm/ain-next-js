import { useTranslations } from 'next-intl'

import { IconArrowsMove, IconX } from '@tabler/icons-react'
import React from 'react'
import { useFormContext } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { MonthPicker } from '@/components/ui/month-picker'
import { Textarea } from '@/components/ui/textarea'

import { useDragAndDrop } from '@/hooks'
import { ResumeFormType } from '@/modules/resume/interface'

import HighlightField from '../../../Common/HighlightsField'

interface Props {
  fieldId: string
  position: number
  hasMove: boolean
  remove: (index: number) => void
  moveCard: (from: number, to: number) => void
}

const SingleProjectFrom: React.FC<Props> = ({ position, fieldId, hasMove, moveCard, remove }) => {
  const t = useTranslations('form')
  const form = useFormContext<ResumeFormType>()

  const { drag, dragPreview, drop, isDragging } = useDragAndDrop({ fieldId, position, moveCard })

  return (
    <div
      ref={node => dragPreview(drop(node))}
      style={{ opacity: isDragging ? 0.5 : 1, borderStyle: isDragging ? 'dashed' : 'solid' }}
      className="grid grid-cols-12 gap-x-3 gap-y-6 border border-muted rounded-lg p-4 relative"
    >
      {hasMove && (
        <div
          ref={node => drag(drop(node))}
          className="absolute -right-3 -top-3 w-7 h-7 bg-muted z-[2] rounded-full flex items-center justify-center cursor-move"
        >
          <IconArrowsMove className="text-neutral-600 dark:text-white w-4 h-4" />
        </div>
      )}

      <div
        onClick={() => remove(position)}
        className="absolute -left-3 -top-3 w-7 h-7 bg-muted z-[2] rounded-full flex items-center justify-center cursor-pointer"
      >
        <IconX className="text-destructive w-4 h-4" />
      </div>

      <div className="col-span-12 sm:col-span-9">
        <FormField
          control={form.control}
          name={`projects.${position}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.project.name')}</FormLabel>
              <FormControl>
                <Input {...field} inputSize="sm" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-12 sm:col-span-3">
        <FormField
          control={form.control}
          name={`projects.${position}.organization`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.project.organization')}</FormLabel>
              <FormControl>
                <Input {...field} inputSize="sm" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-12 sm:col-span-4 lg:col-span-6">
        <FormField
          control={form.control}
          name={`projects.${position}.url`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.project.url')}</FormLabel>
              <FormControl>
                <Input {...field} inputSize="sm" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-6 sm:col-span-4 lg:col-span-3">
        <FormField
          control={form.control}
          name={`projects.${position}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.project.startDate')}</FormLabel>
              <FormControl>
                <MonthPicker {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-6 sm:col-span-4 lg:col-span-3">
        <FormField
          control={form.control}
          name={`projects.${position}.endDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.project.endDate')}</FormLabel>
              <FormControl>
                <MonthPicker {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-12">
        <FormField
          control={form.control}
          name={`projects.${position}.description`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.project.description')}</FormLabel>
              <FormControl>
                <Textarea {...field} size="sm" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-12">
        <FormLabel>{t('resume.project.highlights')}</FormLabel>
        <div className="text-xs text-neutral-400 dark:text-neutral-500 mt-2 leading-normal">
          {t.rich('resume.project.highlightsTitle', {
            first: chunks => <p>{chunks}</p>,
            second: chunks => <p>{chunks}</p>,
            enter: chunks => <strong className="text-foreground mx-1">{chunks}</strong>,
            high: chunks => <span className="text-red-500 dark:text-red-300">{chunks}</span>,
          })}
        </div>

        <HighlightField
          control={form.control}
          name={`projects.${position}.highlights`}
          placeholder={t('resume.project.highlightsPlaceholder')}
        />
      </div>
    </div>
  )
}

export default SingleProjectFrom
