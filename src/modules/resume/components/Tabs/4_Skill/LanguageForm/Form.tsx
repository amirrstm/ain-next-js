import { useTranslations } from 'next-intl'

import { IconArrowsMove, IconX } from '@tabler/icons-react'
import React from 'react'
import { useFormContext } from 'react-hook-form'

import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { ReactSelect } from '@/components/ui/react-select'

import { useDragAndDrop } from '@/hooks'
import { useConstants } from '@/modules/resume/hooks/useConstants'
import { ResumeFormType } from '@/modules/resume/interface'
import { YekanBakhNumFont } from '@/styles/fonts'

interface Props {
  fieldId: string
  position: number
  hasMove: boolean
  remove: (index: number) => void
  moveCard: (from: number, to: number) => void
}

const SingleLanguageForm: React.FC<Props> = ({ position, fieldId, hasMove, moveCard, remove }) => {
  const t = useTranslations('form')
  const form = useFormContext<ResumeFormType>()
  const { languages, fluencyTypes, numberLevels, stringLevels, describeLevels } = useConstants()
  const { drag, dragPreview, drop, isDragging } = useDragAndDrop({ fieldId, position, moveCard })

  const [fluencyType, setFluencyType] = React.useState(
    describeLevels.find(d => d.value === form.getValues().languages[position].fluency)
      ? fluencyTypes[0]
      : stringLevels.find(d => d.value === form.getValues().languages[position].fluency)
        ? fluencyTypes[1]
        : fluencyTypes[2],
  )
  const levelOptions = {
    'a1-c2': stringLevels,
    graphical: numberLevels,
    describe: describeLevels,
  }

  const onChangeFluency = (value: any) => {
    form.setValue(`languages.${position}.level`, undefined)
    form.setValue(`languages.${position}.fluency`, undefined)
    setFluencyType(fluencyTypes.find(item => item.value === value) as any)
  }

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
          <ReactSelect value={fluencyType.value} options={fluencyTypes} onChange={onChangeFluency} size="sm" />
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
                  size="sm"
                  options={levelOptions[fluencyType.key as keyof typeof levelOptions]}
                  className={fluencyType.key === 'graphical' ? YekanBakhNumFont.className : ''}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {fluencyType.key === 'graphical' && (
        <div className="col-span-4 sm:col-span-4 lg:col-span-3 pt-3">
          <FormField
            control={form.control}
            name={`languages.${position}.hasLevel`}
            render={({ field }) => (
              <FormItem className="flex items-center gap-1 mt-3">
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
