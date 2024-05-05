import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

import { useEffect } from 'react'
import { useAudioRecorder } from 'react-audio-voice-recorder'

import { getBlobDuration } from '@/lib/utils'
import { uploadResumeVoice } from '@/modules/resume/service'

import RecordButton from '../../Common/RecordButton'
import { ProfileAvatar } from './Avatar'
import BasicForm from './BasicForm'
import ContactForm from './ContactForm'
import SocialForm from './SocialForm'
import SummaryForm from './SummaryForm'

const BasicTab: React.FC = () => {
  const { resumeId } = useParams()
  const t = useTranslations('Resume.Basic')
  const { startRecording, stopRecording, recordingBlob, isRecording } = useAudioRecorder({
    echoCancellation: false,
    noiseSuppression: false,
  })

  useEffect(() => {
    if (!recordingBlob) return

    getBlobDuration(recordingBlob).then(duration => {
      // const audio = new Audio(URL.createObjectURL(recordingBlob))
      // audio.play()
      const file = new File([recordingBlob], 'basic.wav', { type: 'audio/wav' })
      uploadResumeVoice(file, resumeId as string)
    })
  }, [recordingBlob])

  return (
    <>
      <div className="bg-background rounded-lg border border-muted">
        <div className="p-3 sm:p-4 border-b border-b-muted flex justify-between items-center">
          <div>
            <h2 className="text-md sm:text-lg font-semibold">{t('Title')}</h2>
            <p className="text-xs sm:text-sm text-gray-400">{t('Description')}</p>
          </div>

          <RecordButton onClick={isRecording ? stopRecording : startRecording} isRecording={isRecording} />
        </div>

        <div className="py-6 px-4 flex flex-col lg:flex-row items-center gap-8 sm:gap-6 lg:gap-3">
          <div className="px-8">
            <ProfileAvatar />
          </div>

          <div className="flex-1">
            <BasicForm />
          </div>
        </div>
      </div>

      <div className="bg-background rounded-lg border border-muted">
        <div className="p-3 sm:p-4 border-b border-b-muted">
          <h2 className="text-md sm:text-lg font-semibold">{t('ContactTitle')}</h2>
          <p className="text-xs sm:text-sm text-gray-400">{t('ContactDescription')}</p>
        </div>

        <div className="py-6 px-4">
          <ContactForm />
        </div>
      </div>

      <div className="bg-background rounded-lg border border-muted">
        <div className="p-3 sm:p-4 border-b border-b-muted">
          <h2 className="text-md sm:text-lg font-semibold">{t('SummaryTitle')}</h2>
          <p className="text-xs sm:text-sm text-gray-400">{t('SummaryDescription')}</p>
        </div>

        <div className="py-6 px-4">
          <SummaryForm />
        </div>
      </div>

      <SocialForm />
    </>
  )
}

export default BasicTab
