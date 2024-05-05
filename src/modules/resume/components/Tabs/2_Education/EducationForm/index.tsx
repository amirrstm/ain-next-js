import { useTranslations } from 'next-intl'

import { IconArrowsMove, IconX } from '@tabler/icons-react'
import React from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { MonthPicker } from '@/components/ui/month-picker'
import { ReactSelect } from '@/components/ui/react-select'

import { useDragAndDrop } from '@/hooks'
import { useConstants } from '@/modules/resume/hooks/useConstants'
import { ResumeFormType } from '@/modules/resume/interface'

import HighlightField from '../../../Common/HighlightsField'
import LocationForm from '../../../Common/LocationForm'

interface Props {
  fieldId: string
  position: number
  hasMove: boolean
  remove: (index: number) => void
  moveCard: (from: number, to: number) => void
}

const SingleEducationForm: React.FC<Props> = ({ position, fieldId, hasMove, moveCard, remove }) => {
  const t = useTranslations('form')
  const { grades } = useConstants()
  const form = useFormContext<ResumeFormType>()
  const { drag, dragPreview, drop, isDragging } = useDragAndDrop({ fieldId, position, moveCard })

  const stillStudying = useWatch({ control: form.control, name: `educations.${position}.stillStudying` })

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

      <div className="col-span-5 sm:col-span-3 lg:col-span-2">
        <FormField
          control={form.control}
          name={`educations.${position}.studyType`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.education.studyType')}</FormLabel>
              <FormControl>
                <ReactSelect creatable size="sm" options={grades} {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-7 sm:col-span-3">
        <FormField
          control={form.control}
          name={`educations.${position}.area`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.education.area')}</FormLabel>
              <FormControl>
                <Input {...field} inputSize="sm" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
        <FormField
          control={form.control}
          name={`educations.${position}.fieldOfStudy`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.education.fieldOfStudy')}</FormLabel>
              <FormControl>
                <Input {...field} inputSize="sm" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-6 sm:col-span-3">
        <FormField
          control={form.control}
          name={`educations.${position}.institution`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.education.institution')}</FormLabel>
              <FormControl>
                <Input {...field} inputSize="sm" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-12 sm:col-span-3 lg:col-span-2">
        <FormField
          control={form.control}
          name={`educations.${position}.score`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.education.score')}</FormLabel>
              <FormControl>
                <Input {...field} inputSize="sm" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <LocationForm
        control={form.control}
        name={`educations.${position}.location`}
        cityClassName="col-span-6 sm:col-span-3 lg:col-span-2"
        stateClassName="col-span-6 sm:col-span-3 lg:col-span-2"
        countryClassName="col-span-6 sm:col-span-3 lg:col-span-2"
      />

      <div className="col-span-6 sm:col-span-4 lg:col-span-2">
        <FormField
          control={form.control}
          name={`educations.${position}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.education.startDate')}</FormLabel>
              <FormControl>
                <MonthPicker {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-6 sm:col-span-4 lg:col-span-2">
        <FormField
          control={form.control}
          name={`educations.${position}.endDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.education.endDate')}</FormLabel>
              <FormControl>
                <MonthPicker disabled={stillStudying} {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-6 sm:col-span-4 lg:col-span-2 pt-3">
        <FormField
          control={form.control}
          name={`educations.${position}.stillStudying`}
          render={({ field }) => (
            <FormItem className="flex items-center gap-1 mt-3">
              <FormControl>
                <Checkbox {...field} />
              </FormControl>
              <FormLabel>{t('resume.education.stillStudying')}</FormLabel>
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-12">
        <FormLabel>{t('resume.education.highlights')}</FormLabel>
        <p className="text-xs text-neutral-400 dark:text-muted-foreground mt-2">
          <span className="text-red-500 dark:text-red-300">*</span> {t('resume.education.highlightsTitle')}
        </p>

        <HighlightField
          control={form.control}
          name={`educations.${position}.highlights`}
          placeholder={t('resume.education.highlightsPlaceholder')}
        />
      </div>
    </div>
  )
}

export default SingleEducationForm
