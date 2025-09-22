import { IconArrowsMove, IconX } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { useFormContext, useWatch } from 'react-hook-form'

import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { MonthPicker } from '@/components/ui/month-picker'
import { ReactSelect } from '@/components/ui/react-select'
import { useDragAndDrop } from '@/hooks'
import { useConstants } from '@/modules/resume/hooks/useConstants'

import AIGenerate from '../../../Common/AIGenerate'
import HighlightField from '../../../Common/HighlightsField'
import LocationForm from '../../../Common/LocationForm'
import StudyFieldSelect from '../../../Common/StudyFieldSelect'
import UniversitySelect from '../../../Common/UniversitySelect'

import type React from 'react'
import type { ResumeFormType } from '@/modules/resume/interface'

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
  const { drag, dragPreview, drop, isDragging } = useDragAndDrop({ fieldId, moveCard, position })

  const area = useWatch({ control: form.control, name: `educations.${position}.area` })
  const studyType = useWatch({ control: form.control, name: `educations.${position}.studyType` })
  const stillStudying = useWatch({ control: form.control, name: `educations.${position}.stillStudying` })

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

      <div className="col-span-5 sm:col-span-3 lg:col-span-2">
        <FormField
          control={form.control}
          name={`educations.${position}.studyType`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.education.studyType')}</FormLabel>
              <FormControl>
                <ReactSelect creatable options={grades} size="sm" {...field} />
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
                <StudyFieldSelect
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  placeholder={t('resume.education.area')}
                  value={field.value}
                />
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
                <Input {...field} inputSize="sm" placeholder={t('resume.education.fieldOfStudy')} />
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
                <UniversitySelect
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  placeholder={t('resume.education.institution')}
                  value={field.value}
                />
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
        cityClassName="col-span-6 sm:col-span-3 lg:col-span-2"
        control={form.control}
        countryClassName="col-span-6 sm:col-span-3 lg:col-span-2"
        name={`educations.${position}.location`}
        stateClassName="col-span-6 sm:col-span-3 lg:col-span-2"
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

      <div className="col-span-6 pt-3 sm:col-span-4 lg:col-span-2">
        <FormField
          control={form.control}
          name={`educations.${position}.stillStudying`}
          render={({ field }) => (
            <FormItem className="mt-3 flex items-center gap-1">
              <FormControl>
                <Checkbox {...field} />
              </FormControl>
              <FormLabel>{t('resume.education.stillStudying')}</FormLabel>
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-12">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <FormLabel>{t('resume.education.highlights')}</FormLabel>
            <div className="mt-2 text-neutral-400 text-xs leading-normal dark:text-neutral-500">
              {t.rich('resume.education.highlightsTitle', {
                enter: (chunks) => <strong className="mx-1 text-foreground">{chunks}</strong>,
                first: (chunks) => <p>{chunks}</p>,
                high: (chunks) => <span className="text-red-500 dark:text-red-300">{chunks}</span>,
                second: (chunks) => <p>{chunks}</p>
              })}
            </div>
          </div>

          <AIGenerate position={position} title={studyType && area ? `${studyType}-${area}` : undefined} type="education" />
        </div>

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
