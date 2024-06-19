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

function AIGenerate() {
  const { resumeId } = useParams()
  const t = useTranslations('form')
  const form = useFormContext<ResumeFormType>()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [createdTexts, setCreatedTexts] = useState<{ id: string; text: string }[]>([])

  const onGenerate = () => {
    if (createdTexts.length) return

    setOpen(true)

    setCreatedTexts(
      ['ارائه و پرزنت مقاله درباره هوش مصنوعی', 'ارائه و پرزنت مقاله درباره هوش مصنوعی'].map(
        (text: string, index: number) => ({ id: String(index), text }),
      ),
    )

    // setLoading(true)
    // createResumeBio(resumeId as string).then(data => {
    //   setLoading(false)
    //   const text: any = JSON.parse(data)

    //   setCreatedTexts((text.about_me || []).map((text: string, index: number) => ({ id: String(index), text })))
    // })
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
        type="button"
        onClick={onGenerate}
        className={clsx('text-xs flex gap-1 rounded-full w-11 h-11 p-0', { 'pulse-animation': !loading })}
      >
        <IconWand className="w-6 h-6" />
        {/* {formBio ? t('resume.ai.improve') : t('resume.ai.write')} */}
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

export default AIGenerate
