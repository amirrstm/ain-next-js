import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

import React, { useEffect, useRef, useState } from 'react'
import { useAudioRecorder } from 'react-audio-voice-recorder'

import { Button } from '@/components/ui/button'

import RecordButton from '../../Common/RecordButton'

interface Props {
  onSubmit: (file: File) => void
}

const textEN = `I hold a degree in [Your Field] with [Number] years of work experience. My expertise includes [Some of Your Expertise]. I have worked at [Company Name] as a [Job Title], where I was able to [Accomplishments in the Position]. I am proficient in [Languages You Speak] and can [Tasks You Can Perform].`

const descriptionEN = 'Then, you can talk about your projects, achievements, research, or even your hobbies.'

const textFA = `من  [سمت شغلی شما] تحصیل کرده رشته [رشته دانشگاهی] با [تجربه کاری] سال تجربه کاری هستم. تخصص های من شامل
            [تعدادی از تخصص های شما] می‌شود. من در [نام شرکت] به عنوان [سمت شغلی] کار کرده‌ام و در این مدت توانستم
            [کارهایی که در این سمت شغلی انجام دادید] . به زبان های [زبان هایی که بلد هستید] مسلط هستم و می‌توانم
            [کارهایی که می‌توانید انجام دهید] را انجام دهم.`

const descriptionFa = 'سپس میتوانید در مورد پروژه ها، دست آورد ها، تحقیقات و یا حتی سرگرمی های خود صحبت کنید.'

const VoiceCreate: React.FC<Props> = ({ onSubmit }) => {
  const { locale } = useParams()
  const t = useTranslations('Resume.Create')
  const [voiceLoading, setVoiceLoading] = useState(false)
  const [recordedFile, setRecordedFile] = useState<File>()
  const recordingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const { startRecording, stopRecording, recordingBlob, isRecording } = useAudioRecorder({
    echoCancellation: false,
    noiseSuppression: false,
  })

  useEffect(() => {
    if (isRecording) {
      recordingTimeoutRef.current = setTimeout(() => {
        stopRecording()
      }, 30000)
    } else {
      if (recordingTimeoutRef.current) {
        clearTimeout(recordingTimeoutRef.current)
        recordingTimeoutRef.current = null
      }
    }

    return () => {
      if (recordingTimeoutRef.current) {
        clearTimeout(recordingTimeoutRef.current)
      }
    }
  }, [isRecording, stopRecording])

  useEffect(() => {
    if (!recordingBlob) return

    setVoiceLoading(true)
    setRecordedFile(new File([recordingBlob], 'voice.wav', { type: 'audio/wav' }))
    setVoiceLoading(false)
  }, [recordingBlob])

  const handleSubmit = () => {
    if (recordedFile) {
      onSubmit(recordedFile)
    }
  }

  return (
    <div className="px-2 py-4">
      <div className="flex flex-col items-center justify-center gap-5">
        <p className="text-center leading-relaxed text-sm">{t('Voice.Subtitle')}</p>
        <RecordButton
          loading={voiceLoading}
          isRecording={isRecording}
          className="w-16 h-16"
          onClick={isRecording ? stopRecording : startRecording}
        />

        {recordedFile && (
          <div className="flex flex-col gap-2 items-center">
            <audio controls src={URL.createObjectURL(recordedFile)} />
          </div>
        )}

        <small className="text-neutral-400 flex gap-1">
          <span className="text-red-500">*</span>
          <span>{t('Voice.Attention')}</span>
          <span className="text-red-500">*</span>
        </small>
      </div>

      <div className="mt-6">
        <p className="text-xs text-center">{t('Voice.Guide')}</p>

        <div className="border border-muted rounded-md p-3 mt-3 bg-black">
          <p className="text-sm leading-loose">
            {locale === 'fa' ? textFA : textEN}
            <br />
            <br />

            {locale === 'fa' ? descriptionFa : descriptionEN}
          </p>
        </div>

        <div className="pt-6">
          <Button className="w-full" disabled={!recordedFile} onClick={handleSubmit}>
            {t('Voice.Submit')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default VoiceCreate
