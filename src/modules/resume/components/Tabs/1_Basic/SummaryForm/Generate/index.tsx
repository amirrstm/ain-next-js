import { IconWand } from '@tabler/icons-react'
import clsx from 'clsx'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import Loader from '@/components/ui/loader'
import { createResumeBio } from '@/modules/resume/service'

import type { ResumeFormType } from '@/modules/resume/interface'

function GenerateBio() {
  const { resumeId } = useParams()
  const t = useTranslations('form')
  const form = useFormContext<ResumeFormType>()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const formBio = useWatch({ control: form.control, name: 'basic.summary' })

  const [createdTexts, setCreatedTexts] = useState<{ id: string; text: string }[]>([])

  const onGenerate = () => {
    if (createdTexts.length) return

    setOpen(true)
    setLoading(true)
    createResumeBio(resumeId as string).then((data) => {
      setLoading(false)
      const text = JSON.parse(data)

      setCreatedTexts((text.about_me || []).map((text: string, index: number) => ({ id: String(index), text })))
    })
  }

  const onSelectOption = (value: string) => {
    const selected = createdTexts.find((text) => text.id === value)

    if (selected) {
      setOpen(false)
      setCreatedTexts([])
      form.setValue('basic.summary', selected.text)
    }
  }

  return (
    <>
      <Button
        className={clsx('flex gap-1 rounded-full p-2 px-4 text-xs', { 'pulse-animation': !loading })}
        loading={loading}
        onClick={onGenerate}
        size="sm"
      >
        <IconWand className="h-5 w-5" />
        {formBio ? t('resume.ai.improve') : t('resume.ai.write')}
      </Button>

      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle> {formBio ? t('resume.ai.improve') : t('resume.ai.write')}</DialogTitle>
            <DialogDescription>{t('resume.ai.generation.title')}</DialogDescription>
          </DialogHeader>

          <div className="min-h-[88vh] w-full overflow-y-auto overflow-x-hidden md:min-h-max">
            {loading ? (
              <div className="flex flex-col items-center justify-center gap-2 py-6 text-center">
                <div className="h-10 w-10">
                  <Loader />
                </div>
                <p className="max-w-[320px] text-xs leading-relaxed">{t('resume.ai.generation.loading')}</p>
              </div>
            ) : (
              <div className="space-y-3 py-2">
                {createdTexts.map((text, _index) => (
                  <div
                    className={clsx(
                      'cursor-pointer rounded-md border bg-popover p-3',
                      'transition-all duration-200 ease-in-out',
                      'hover:bg-primary/20 hover:text-primary'
                    )}
                    key={text.id}
                    onClick={() => onSelectOption(text.id)}
                  >
                    <p className="text-xs leading-6">{text.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default GenerateBio
