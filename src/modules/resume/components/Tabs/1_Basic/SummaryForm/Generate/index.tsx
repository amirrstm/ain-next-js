import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

import { IconWand } from '@tabler/icons-react'
import clsx from 'clsx'
import React, { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import { ResumeFormType } from '@/modules/resume/interface'
import { createResumeBio } from '@/modules/resume/service'

function GenerateBio() {
  const { resumeId } = useParams()
  const t = useTranslations('form')
  const form = useFormContext<ResumeFormType>()

  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const formBio = useWatch({ control: form.control, name: 'basic.summary' })

  const [createdTexts, setCreatedTexts] = React.useState<{ id: string; text: string }[]>([])

  const onGenerate = () => {
    if (createdTexts.length) return

    setLoading(true)
    createResumeBio(resumeId as string).then(data => {
      setLoading(false)
      setCreatedTexts(
        data
          .split('\n')
          .filter(text => !!text)
          .map((text, index) => ({ id: String(index), text })),
      )
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
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          loading={loading}
          onClick={onGenerate}
          className={clsx('text-xs flex gap-1 rounded-full p-2 px-4', { 'pulse-animation': !loading })}
        >
          <IconWand className="w-5 h-5" />
          {formBio ? t('resume.ai.improve') : t('resume.ai.write')}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full max-w-4xl border-muted" align="start" asChild>
        <div className="bg-neutral-700">
          {loading ? (
            <div className="border border-primary p-3 rounded-md bg-purple-400/20">
              <p className="text-sm">
                ما با استفاده از سمت شغلی شما داریم چند گزینه‌ای براتون آماده می‌کنیم که از بین اونا انتخاب کنید ...
              </p>
            </div>
          ) : (
            <>
              <div className="border-b border-b-gray-500 pb-3">
                <p className="text-sm">بهترین گزینه‌ای که نمایانگر مهارت‌های شماست را انتخاب کنید:</p>
              </div>
              <RadioGroup
                defaultValue={'0'}
                dir="rtl"
                className="divide-y divide-gray-500"
                onValueChange={onSelectOption}
              >
                {createdTexts.map((text, index) => (
                  <div key={text.id} className="flex items-center gap-2 pt-3">
                    <RadioGroupItem value={String(index)} id={text.id} />
                    <Label
                      htmlFor={text.id}
                      className="text-xs leading-5 text-gray-300 cursor-pointer hover:text-primary"
                    >
                      {text.text}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default GenerateBio
