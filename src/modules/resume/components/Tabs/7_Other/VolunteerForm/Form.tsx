import { IconArrowsMove, IconX } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { MonthPicker } from '@/components/ui/month-picker'
import { useDragAndDrop } from '@/hooks'

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

const SingleVolunteerForm: React.FC<Props> = ({ position, fieldId, hasMove, moveCard, remove }) => {
  const t = useTranslations('form')
  const form = useFormContext<ResumeFormType>()
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

      <div className="col-span-12 sm:col-span-6">
        <FormField
          control={form.control}
          name={`volunteers.${position}.position`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.volunteer.position')}</FormLabel>
              <FormControl>
                <Input {...field} inputSize="sm" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-12 sm:col-span-6">
        <FormField
          control={form.control}
          name={`volunteers.${position}.organization`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.volunteer.organization')}</FormLabel>
              <FormControl>
                <Input {...field} inputSize="sm" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-12">
        <FormField
          control={form.control}
          name={`volunteers.${position}.summary`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.work.summary')}</FormLabel>
              <FormControl>
                <Input {...field} inputSize="sm" placeholder={t('resume.work.summaryPlaceholder')} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-6 sm:col-span-6">
        <FormField
          control={form.control}
          name={`volunteers.${position}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.volunteer.startDate')}</FormLabel>
              <FormControl>
                <MonthPicker {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-6 sm:col-span-6">
        <FormField
          control={form.control}
          name={`volunteers.${position}.endDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.volunteer.endDate')}</FormLabel>
              <FormControl>
                <MonthPicker {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-12">
        <FormLabel>{t('resume.volunteer.highlights')}</FormLabel>
        <div className="mt-2 text-neutral-400 text-xs leading-normal dark:text-neutral-500">
          {t.rich('resume.work.highlightsTitle', {
            enter: (chunks) => <strong className="mx-1 text-foreground">{chunks}</strong>,
            first: (chunks) => <p>{chunks}</p>,
            high: (chunks) => <span className="text-red-500 dark:text-red-300">{chunks}</span>,
            second: (chunks) => <p>{chunks}</p>
          })}
        </div>

        <HighlightField
          control={form.control}
          name={`volunteers.${position}.highlights`}
          placeholder={t('resume.work.highlightsPlaceholder')}
        />
      </div>
    </div>
  )
}

export default SingleVolunteerForm
