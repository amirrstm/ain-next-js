import { IconArrowsMove, IconX } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { useFormContext, useWatch } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { MonthPicker } from '@/components/ui/month-picker'
import { Textarea } from '@/components/ui/textarea'
import { useDragAndDrop } from '@/hooks'

import AIGenerate from '../../../Common/AIGenerate'
import HighlightField from '../../../Common/HighlightsField'

import type React from 'react'
import type { ResumeFormType } from '@/modules/resume/interface'

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

  const projectName = useWatch({ control: form.control, name: `works.${position}.name` })
  const { drag, dragPreview, drop, isDragging } = useDragAndDrop({ fieldId, moveCard, position })

  return (
    <div
      className="relative grid grid-cols-12 gap-x-3 gap-y-6 rounded-lg border border-muted p-4"
      ref={(node) => dragPreview(drop(node))}
      style={{ borderStyle: isDragging ? 'dashed' : 'solid', opacity: isDragging ? 0.5 : 1 }}
    >
      {hasMove && (
        <div
          className="-right-3 -top-3 absolute z-[2] flex h-7 w-7 cursor-move items-center justify-center rounded-full bg-muted"
          ref={(node) => drag(drop(node))}
        >
          <IconArrowsMove className="h-4 w-4 text-neutral-600 dark:text-white" />
        </div>
      )}

      <div
        className="-left-3 -top-3 absolute z-[2] flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-muted"
        onClick={() => remove(position)}
      >
        <IconX className="h-4 w-4 text-destructive" />
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
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <FormLabel>{t('resume.project.highlights')}</FormLabel>
            <div className="mt-2 text-neutral-400 text-xs leading-normal dark:text-neutral-500">
              {t.rich('resume.project.highlightsTitle', {
                enter: (chunks) => <strong className="mx-1 text-foreground">{chunks}</strong>,
                first: (chunks) => <p>{chunks}</p>,
                high: (chunks) => <span className="text-red-500 dark:text-red-300">{chunks}</span>,
                second: (chunks) => <p>{chunks}</p>
              })}
            </div>
          </div>

          <AIGenerate position={position} title={projectName} type="project" />
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
