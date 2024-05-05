import { useTranslations } from 'next-intl'

import { IconArrowsMove, IconX } from '@tabler/icons-react'
import React from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { MonthPicker } from '@/components/ui/month-picker'

import { useDragAndDrop } from '@/hooks'
import { ResumeFormType } from '@/modules/resume/interface'

import HighlightField from '../../../Common/HighlightsField'
import LocationForm from '../../../Common/LocationForm'
import OccupationSelect from '../../../Common/OccupationSelect'

interface Props {
  fieldId: string
  position: number
  hasMove: boolean
  remove: (index: number) => void
  moveCard: (from: number, to: number) => void
}

const SingleWorkForm: React.FC<Props> = ({ position, fieldId, hasMove, moveCard, remove }) => {
  const t = useTranslations('form')
  const form = useFormContext<ResumeFormType>()
  const { drag, dragPreview, drop, isDragging } = useDragAndDrop({ fieldId, position, moveCard })
  const stillWorking = useWatch({ control: form.control, name: `works.${position}.stillWorking` })

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
          <IconArrowsMove className="text-white w-4 h-4" />
        </div>
      )}

      <div
        onClick={() => remove(position)}
        className="absolute -left-3 -top-3 w-7 h-7 bg-muted z-[2] rounded-full flex items-center justify-center cursor-pointer"
      >
        <IconX className="text-destructive w-4 h-4" />
      </div>

      <div className="col-span-12 sm:col-span-3 lg:col-span-3">
        <FormField
          control={form.control}
          name={`works.${position}.position`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.work.position')}</FormLabel>
              <FormControl>
                <OccupationSelect value={field.value} onBlur={field.onBlur} onChange={field.onChange} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-12 sm:col-span-3">
        <FormField
          control={form.control}
          name={`works.${position}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.work.name')}</FormLabel>
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
        name={`works.${position}.location`}
        cityClassName="col-span-4 sm:col-span-3 lg:col-span-2"
        stateClassName="col-span-4 sm:col-span-3 lg:col-span-2"
        countryClassName="col-span-4 sm:col-span-3 lg:col-span-2"
      />

      <div className="col-span-12">
        <FormField
          control={form.control}
          name={`works.${position}.summary`}
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

      <div className="col-span-6 sm:col-span-4 lg:col-span-2">
        <FormField
          control={form.control}
          name={`works.${position}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.work.startDate')}</FormLabel>
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
          name={`works.${position}.endDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.work.endDate')}</FormLabel>
              <FormControl>
                <MonthPicker disabled={stillWorking} {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-12 sm:col-span-4 lg:col-span-4 sm:pt-3">
        <FormField
          control={form.control}
          name={`works.${position}.stillWorking`}
          render={({ field }) => (
            <FormItem className="flex items-center gap-1 mt-3">
              <FormControl>
                <Checkbox {...field} />
              </FormControl>
              <FormLabel>{t('resume.work.stillWorking')}</FormLabel>
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-12">
        <FormLabel>{t('resume.work.highlights')}</FormLabel>
        <p className="text-xs text-muted-foreground mt-2">
          <span className="text-red-300">*</span> {t('resume.work.highlightsTitle')}
        </p>

        <HighlightField
          control={form.control}
          name={`works.${position}.highlights`}
          placeholder={t('resume.work.highlightsPlaceholder')}
        />
      </div>
    </div>
  )
}

export default SingleWorkForm
