import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

import { useEffect, useState } from 'react'
import { useAudioRecorder } from 'react-audio-voice-recorder'
import { useFormContext } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

import { getBlobDuration } from '@/lib/utils'
import { ResumeFormType } from '@/modules/resume/interface'
import { uploadResumeVoice } from '@/modules/resume/service'

import RecordButton from '../../../Common/RecordButton'
import GenerateBio from './Generate'
import Info from './Info'

const SummaryForm: React.FC = () => {
  const { resumeId } = useParams()
  const t = useTranslations('form')
  const mainT = useTranslations('Resume.Basic')
  const form = useFormContext<ResumeFormType>()

  const [voiceLoading, setVoiceLoading] = useState(false)
  const { startRecording, stopRecording, recordingBlob, isRecording } = useAudioRecorder({
    echoCancellation: false,
    noiseSuppression: false,
  })

  useEffect(() => {
    if (!recordingBlob) return

    setVoiceLoading(true)
    getBlobDuration(recordingBlob).then(duration => {
      const file = new File([recordingBlob], 'basic.wav', { type: 'audio/wav' })
      uploadResumeVoice(file, resumeId as string)
        .then(data => {
          setVoiceLoading(false)
          form.setValue('basic.summary', data)
        })
        .catch(() => setVoiceLoading(false))
    })
  }, [recordingBlob])

  return (
    <div className="bg-background rounded-lg border border-muted">
      <div className="p-3 sm:p-4 border-b border-b-muted flex items-center justify-between">
        <div>
          <h2 className="text-md sm:text-lg font-semibold">{mainT('SummaryTitle')}</h2>
          <p className="text-xs sm:text-sm text-gray-400">{mainT('SummaryDescription')}</p>
        </div>

        <Info />
      </div>
      <div className="py-6 px-4">
        <div className="grid grid-cols-12 gap-x-3 gap-y-6">
          <div className="col-span-12 ">
            <div className="border border-muted rounded-md ring-primary focus-within:ring-1">
              <div className="p-2 py-4 border-b border-muted flex items-center justify-between">
                <GenerateBio isRecording={isRecording} />

                <div className="flex flex-row-reverse items-center gap-2">
                  <RecordButton
                    loading={voiceLoading}
                    isRecording={isRecording}
                    onClick={isRecording ? stopRecording : startRecording}
                  />
                  <p className="text-xs text-muted-foreground">
                    {isRecording ? t('resume.ai.talking') : t('resume.ai.voice')}
                  </p>
                </div>
              </div>

              <FormField
                name="basic.summary"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        size="sm"
                        placeholder={t('resume.basic.summaryPlaceholder')}
                        className="!ring-0 !ring-offset-0 border-none !bg-transparent !outline-none"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SummaryForm
