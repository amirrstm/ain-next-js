/** biome-ignore-all lint/suspicious/noExplicitAny: false positive */

import { IconWand } from '@tabler/icons-react'
import clsx from 'clsx'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import Loader from '@/components/ui/loader'
import { createResumeHighligh } from '@/modules/resume/service'

import type { ResumeFormType } from '@/modules/resume/interface'

interface Props {
  type?: string
  title?: string
  position?: number
  fieldName?: string
}

function AIGenerate({ title, type, position, fieldName = 'highlights' }: Props) {
  const { resumeId } = useParams()
  const t = useTranslations('form')
  const form = useFormContext<ResumeFormType>()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [createdTexts, setCreatedTexts] = useState<{ value: string }[]>([])

  const onGenerate = () => {
    if (createdTexts.length || !type) return

    if (!title) {
      const messages = {
        education: t('resume.ai.highlight.noEducationTitle'),
        project: t('resume.ai.highlight.noProjectTitle'),
        work: t('resume.ai.highlight.noWorkTitle')
      }

      toast.error(messages[type as keyof typeof messages] as string)
      return
    }

    if (type) {
      setOpen(true)
      setLoading(true)
      createResumeHighligh(resumeId as string, title, type).then((data) => {
        setLoading(false)
        const text = JSON.parse(data)

        setCreatedTexts((text.highlights || []).map((value: string) => ({ value })))
      })
    }
  }

  const onSelectOption = () => {
    const formName = type === 'work' ? 'works' : type === 'project' ? 'projects' : 'educations'

    if (fieldName && createdTexts.length && typeof position === 'number') {
      const fieldPath = `${formName}.${position}.${fieldName}`

      const prevValues = form.getValues(fieldPath)

      setOpen(false)
      setCreatedTexts([])
      form.setValue(fieldPath, [
        ...(prevValues?.length === 1 && prevValues?.[0]?.value === '' ? [] : prevValues),
        ...createdTexts
      ])
    }
  }

  return (
    <>
      <Button
        className={clsx('flex h-8 w-8 gap-1 rounded-full p-0 text-xs sm:h-11 sm:w-11', { 'pulse-animation': !loading })}
        onClick={onGenerate}
        size="sm"
        type="button"
      >
        <IconWand className="h-4 w-4 sm:h-6 sm:w-6" />
      </Button>

      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('resume.ai.write')}</DialogTitle>
          </DialogHeader>

          <div className="min-h-[88vh] w-full overflow-y-auto overflow-x-hidden md:min-h-max">
            {loading ? (
              <div className="flex flex-col items-center justify-center gap-2 py-6 text-center">
                <div className="h-10 w-10">
                  <Loader />
                </div>
                <p className="max-w-[320px] text-xs leading-relaxed">{t('resume.ai.generation.loadingText')}</p>
              </div>
            ) : (
              <div className="space-y-3 py-3">
                {createdTexts.map(({ value }, index) => (
                  <div
                    className={clsx('cursor-pointer rounded-md border bg-popover p-3', 'bg-primary/20 text-primary')}
                    key={`highlight-${index}`}
                  >
                    <p className="text-sm leading-6">{value}</p>
                  </div>
                ))}

                <div className="pt-3" onClick={onSelectOption}>
                  <Button className="w-full">{t('resume.ai.highlight.useHighlight')}</Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AIGenerate
