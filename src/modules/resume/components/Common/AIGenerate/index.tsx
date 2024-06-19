import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

import { IconWand } from '@tabler/icons-react'
import clsx from 'clsx'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import Loader from '@/components/ui/loader'

import { ResumeFormType } from '@/modules/resume/interface'
import { createResumeHighligh } from '@/modules/resume/service'

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
        work: t('resume.ai.highlight.noWorkTitle'),
        education: t('resume.ai.highlight.noEducationTitle'),
        project: t('resume.ai.highlight.noProjectTitle'),
      }

      toast.error(messages[type as keyof typeof messages] as string)
      return
    }

    if (type) {
      setOpen(true)
      setLoading(true)
      createResumeHighligh(resumeId as string, title, type).then(data => {
        setLoading(false)
        const text: any = JSON.parse(data)

        setCreatedTexts((text.highlights || []).map((value: string) => ({ value })))
      })
    }
  }

  const onSelectOption = () => {
    const formName = type === 'work' ? 'works' : type === 'project' ? 'projects' : 'educations'

    if (fieldName && createdTexts.length && typeof position === 'number') {
      const prevValues = form.getValues(`${formName}.${position}.${fieldName}` as any)

      setOpen(false)
      setCreatedTexts([])
      form.setValue(`${formName}.${position}.${fieldName}` as any, [...(prevValues as any), ...createdTexts])
    }
  }

  return (
    <>
      <Button
        size="sm"
        type="button"
        onClick={onGenerate}
        className={clsx('text-xs flex gap-1 rounded-full w-8 h-8 sm:w-11 sm:h-11 p-0', { 'pulse-animation': !loading })}
      >
        <IconWand className="w-4 h-4 sm:w-6 sm:h-6" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('resume.ai.write')}</DialogTitle>
          </DialogHeader>

          <div className="w-full overflow-x-hidden overflow-y-auto min-h-[88vh] md:min-h-max">
            {loading ? (
              <div className="flex flex-col items-center justify-center gap-2 text-center py-6">
                <div className="w-10 h-10">
                  <Loader />
                </div>
                <p className="text-xs max-w-[320px] leading-relaxed">{t('resume.ai.generation.loadingText')}</p>
              </div>
            ) : (
              <div className="space-y-3 py-3">
                {createdTexts.map(({ value }, index) => (
                  <div
                    key={`highlight-${index}`}
                    className={clsx('p-3 bg-popover border rounded-md cursor-pointer', 'bg-primary/20 text-primary')}
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
