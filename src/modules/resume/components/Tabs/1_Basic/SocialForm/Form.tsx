import { IconArrowsMove, IconX } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ReactSelect } from '@/components/ui/react-select'
import { useDragAndDrop } from '@/hooks'
import { useConstants } from '@/modules/resume/hooks/useConstants'

import type React from 'react'
import type { ResumeFormType } from '@/modules/resume/interface'

interface Props {
  fieldId: string
  position: number
  hasMove: boolean
  remove: (index: number) => void
  moveCard: (from: number, to: number) => void
}

const SingleSocialForm: React.FC<Props> = ({ position, fieldId, hasMove, moveCard, remove }) => {
  const t = useTranslations('form')
  const { socials } = useConstants()
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

      <div className="col-span-6">
        <FormField
          control={form.control}
          name={`profiles.${position}.network`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.basic.social.network')}</FormLabel>
              <FormControl>
                <ReactSelect creatable {...field} menuPlacement="top" options={socials} size="sm" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-6">
        <FormField
          control={form.control}
          name={`profiles.${position}.username`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('resume.basic.social.username')}</FormLabel>
              <FormControl>
                <Input {...field} dir="ltr" inputSize="sm" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

export default SingleSocialForm
