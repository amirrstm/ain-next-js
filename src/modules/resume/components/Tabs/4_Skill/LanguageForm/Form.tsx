import { IconArrowsMove, IconX } from '@tabler/icons-react'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import React from 'react'
import { useFormContext } from 'react-hook-form'

import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { ReactSelect } from '@/components/ui/react-select'
import { useDragAndDrop } from '@/hooks'
import { useConstants } from '@/modules/resume/hooks/useConstants'
import { YekanBakhNumFont } from '@/styles/fonts'

import type { ResumeFormType } from '@/modules/resume/interface'

interface Props {
  fieldId: string
  position: number
  hasMove: boolean
  remove: (index: number) => void
  moveCard: (from: number, to: number) => void
}

const SingleLanguageForm: React.FC<Props> = ({ position, fieldId, hasMove, moveCard, remove }) => {
  const { locale } = useParams()
  const t = useTranslations('form')
  const form = useFormContext<ResumeFormType>()
  const { languages, fluencyTypes, numberLevels, stringLevels, describeLevels } = useConstants()
  const { drag, dragPreview, drop, isDragging } = useDragAndDrop({ fieldId, moveCard, position })

  const [fluencyType, setFluencyType] = React.useState(
    describeLevels.find((d) => d.value === form.getValues().languages[position].fluency)
      ? fluencyTypes[0]
      : stringLevels.find((d) => d.value === form.getValues().languages[position].fluency)
        ? fluencyTypes[1]
        : fluencyTypes[2]
  )
  const levelOptions = {
    'a1-c2': stringLevels,
    describe: describeLevels,
    graphical: numberLevels
  }

  const onChangeFluency = (value: string) => {
    form.setValue(`languages.${position}.level`, undefined)
    form.setValue(`languages.${position}.fluency`, undefined)
    setFluencyType(fluencyTypes.find((item) => item.value === value))
  }

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

      <div className="col-span-6 sm:col-span-3">
        <FormField
          control={form.control}
          name={`languages.${position}.language`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.language.language')}</FormLabel>
              <FormControl>
                <ReactSelect {...field} options={languages} size="sm" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-6 sm:col-span-3">
        <FormLabel>{t('resume.language.fluencyType')}</FormLabel>
        <div className="mt-1">
          <ReactSelect onChange={onChangeFluency} options={fluencyTypes} size="sm" value={fluencyType.value} />
        </div>
      </div>

      <div className="col-span-8 sm:col-span-3">
        <FormField
          control={form.control}
          name={fluencyType.key === 'graphical' ? `languages.${position}.level` : `languages.${position}.fluency`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.language.level')}</FormLabel>
              <FormControl>
                <ReactSelect
                  {...field}
                  className={fluencyType.key === 'graphical' && locale === 'fa' ? YekanBakhNumFont.className : ''}
                  options={levelOptions[fluencyType.key as keyof typeof levelOptions]}
                  size="sm"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {fluencyType.key === 'graphical' && (
        <div className="col-span-4 pt-3 sm:col-span-4 lg:col-span-3">
          <FormField
            control={form.control}
            name={`languages.${position}.hasLevel`}
            render={({ field }) => (
              <FormItem className="mt-3 flex items-center gap-1">
                <FormControl>
                  <Checkbox {...field} />
                </FormControl>
                <FormLabel>{t('resume.language.hasLevel')}</FormLabel>
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  )
}

export default SingleLanguageForm
