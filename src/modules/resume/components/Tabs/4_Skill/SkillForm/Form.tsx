import { IconArrowsMove, IconX } from '@tabler/icons-react'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ReactSelect } from '@/components/ui/react-select'
import { useDragAndDrop } from '@/hooks'
import { YekanBakhNumFont } from '@/styles/fonts'

import SkillSelect from '../../../Common/SkillSelect'

import type React from 'react'
import type { ResumeFormType } from '@/modules/resume/interface'

interface Props {
  fieldId: string
  position: number
  hasMove: boolean
  remove: (index: number) => void
  moveCard: (from: number, to: number) => void
}

const SingleSkillForm: React.FC<Props> = ({ position, fieldId, hasMove, moveCard, remove }) => {
  const { locale } = useParams()
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

      <div className="col-span-6 sm:col-span-5">
        <FormField
          control={form.control}
          name={`skills.${position}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.skill.name')}</FormLabel>

              <FormControl>
                <SkillSelect
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  placeholder={t('resume.skill.name')}
                  value={field.value}
                />
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
                  className={locale === 'fa' ? YekanBakhNumFont.className : ''}
                  options={[
                    { label: 1, value: 1 },
                    { label: 2, value: 2 },
                    { label: 3, value: 3 },
                    { label: 4, value: 4 },
                    { label: 5, value: 5 }
                  ]}
                  size="sm"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-12 sm:col-span-4 sm:pt-3 lg:col-span-4">
        <FormField
          control={form.control}
          name={`skills.${position}.hasLevel`}
          render={({ field }) => (
            <FormItem className="mt-3 flex items-center gap-1">
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
