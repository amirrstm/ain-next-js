import { useTranslations } from 'next-intl'

import { IconArrowsMove, IconX } from '@tabler/icons-react'
import React from 'react'
import { useFormContext } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ReactSelect } from '@/components/ui/react-select'

import { useDragAndDrop } from '@/hooks'
import { ResumeFormType } from '@/modules/resume/interface'

interface Props {
  fieldId: string
  position: number
  hasMove: boolean
  remove: (index: number) => void
  moveCard: (from: number, to: number) => void
}

const SingleInterestForm: React.FC<Props> = ({ position, fieldId, hasMove, moveCard, remove }) => {
  const t = useTranslations('form')
  const form = useFormContext<ResumeFormType>()
  const { drag, dragPreview, drop, isDragging } = useDragAndDrop({ fieldId, position, moveCard })

  const onRemove = () => {
    if (hasMove) {
      remove(position)
    } else {
      form.setValue(`interests`, [])
    }
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
          <IconArrowsMove className="text-neutral-600 dark:text-white w-4 h-4" />
        </div>
      )}

      <div
        onClick={onRemove}
        className="absolute -left-3 -top-3 w-7 h-7 bg-muted z-[2] rounded-full flex items-center justify-center cursor-pointer"
      >
        <IconX className="text-destructive w-4 h-4" />
      </div>

      <div className="col-span-6 sm:col-span-6">
        <FormField
          control={form.control}
          name={`interests.${position}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.interest.name')}</FormLabel>
              <FormControl>
                <Input {...field} inputSize="sm" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-6">
        <FormField
          control={form.control}
          name={`interests.${position}.keywords`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.interest.keywords')}</FormLabel>
              <FormControl>
                <ReactSelect
                  creatable
                  isMulti
                  {...field}
                  size="sm"
                  noOptionsMessage={() => 'برای اضافه کردن تایپ کنید'}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

export default SingleInterestForm
