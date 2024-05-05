import { useTranslations } from 'next-intl'

import { IconArrowsMove, IconX } from '@tabler/icons-react'
import React from 'react'
import { useFormContext } from 'react-hook-form'

import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ReactSelect } from '@/components/ui/react-select'

import { useDragAndDrop } from '@/hooks'
import { ResumeFormType } from '@/modules/resume/interface'
import { YekanBakhNumFont } from '@/styles/fonts'

interface Props {
  fieldId: string
  position: number
  hasMove: boolean
  remove: (index: number) => void
  moveCard: (from: number, to: number) => void
}

const SingleSkillForm: React.FC<Props> = ({ position, fieldId, hasMove, moveCard, remove }) => {
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

      <div className="col-span-6 sm:col-span-5">
        <FormField
          control={form.control}
          name={`skills.${position}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.skill.name')}</FormLabel>
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
          name={`skills.${position}.level`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.skill.level')}</FormLabel>
              <FormControl>
                <ReactSelect
                  {...field}
                  size="sm"
                  className={YekanBakhNumFont.className}
                  options={[
                    { label: 1, value: 1 },
                    { label: 2, value: 2 },
                    { label: 3, value: 3 },
                    { label: 4, value: 4 },
                    { label: 5, value: 5 },
                  ]}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-12 sm:col-span-4 lg:col-span-4 sm:pt-3">
        <FormField
          control={form.control}
          name={`skills.${position}.hasLevel`}
          render={({ field }) => (
            <FormItem className="flex items-center gap-1 mt-3">
              <FormControl>
                <Checkbox {...field} />
              </FormControl>
              <FormLabel>{t('resume.skill.hasLevel')}</FormLabel>
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-12">
        <FormField
          control={form.control}
          name={`skills.${position}.description`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.skill.description')}</FormLabel>
              <FormControl>
                <Input {...field} inputSize="sm" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

export default SingleSkillForm
