import { useTranslations } from 'next-intl'

import React, { useEffect, useRef, useState } from 'react'
import { useAudioRecorder } from 'react-audio-voice-recorder'

import { Button } from '@/components/ui/button'

import RecordButton from '../../Common/RecordButton'

interface Props {
  onSubmit: (file: File) => void
}

const VoiceCreate: React.FC<Props> = ({ onSubmit }) => {
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
          className="w-16 h-16"
          loading={voiceLoading}
          isRecording={isRecording}
          onClick={isRecording ? stopRecording : startRecording}
        />

        {recordedFile && !isRecording && (
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
            {t('Voice.Text.First')}
            <br />
            <br />

            {t('Voice.Text.Second')}
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
