import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

import { IconWand } from '@tabler/icons-react'
import clsx from 'clsx'
import { useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import Loader from '@/components/ui/loader'

import { ResumeFormType } from '@/modules/resume/interface'
import { createResumeBio } from '@/modules/resume/service'

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
    createResumeBio(resumeId as string).then(data => {
      setLoading(false)
      const text: any = JSON.parse(data)

      setCreatedTexts((text.about_me || []).map((text: string, index: number) => ({ id: String(index), text })))
    })
  }

  const onSelectOption = (value: string) => {
    const selected = createdTexts.find(text => text.id === value)

    if (selected) {
      setOpen(false)
      setCreatedTexts([])
      form.setValue('basic.summary', selected.text)
    }
  }

  return (
    <>
      <Button
        size="sm"
        loading={loading}
        onClick={onGenerate}
        className={clsx('text-xs flex gap-1 rounded-full p-2 px-4', { 'pulse-animation': !loading })}
      >
        <IconWand className="w-5 h-5" />
        {formBio ? t('resume.ai.improve') : t('resume.ai.write')}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle> {formBio ? t('resume.ai.improve') : t('resume.ai.write')}</DialogTitle>
            <DialogDescription>{t('resume.ai.generation.title')}</DialogDescription>
          </DialogHeader>

          <div className="w-full overflow-x-hidden overflow-y-auto min-h-[88vh] md:min-h-max">
            {loading ? (
              <div className="flex flex-col items-center justify-center gap-2 text-center py-6">
                <div className="w-10 h-10">
                  <Loader />
                </div>
                <p className="text-xs max-w-[320px] leading-relaxed">{t('resume.ai.generation.loading')}</p>
              </div>
            ) : (
              <div className="space-y-3 py-2">
                {createdTexts.map((text, index) => (
                  <div
                    key={text.id}
                    onClick={() => onSelectOption(text.id)}
                    className={clsx(
                      'p-3 bg-popover border rounded-md cursor-pointer',
                      'transition-all duration-200 ease-in-out',
                      'hover:bg-primary/20 hover:text-primary',
                    )}
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
