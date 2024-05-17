'use client'

import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

import { IconClipboardText, IconOctagonPlus } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import { useAudioRecorder } from 'react-audio-voice-recorder'
import useSWRMutation from 'swr/mutation'

import { Button } from '@/components/ui/button'

import API from '@/lib/api'
import { getBlobDuration } from '@/lib/utils'

import RecordButton from '../../components/Common/RecordButton'
import ResumeEmpty from '../../components/List/Empty'
import SingleResume from '../../components/List/SingleResume'
import ResumeSkelton from '../../components/List/SingleResume/Skelton'
import useResumes from '../../hooks/useResumes'
import { createResume, createResumeFromVoice } from '../../service'

const ResumeListContainer: React.FC = () => {
  const router = useRouter()
  const t = useTranslations('Resume')

  const { data, isLoading, mutate: refreshResumes } = useResumes()
  const { trigger, isMutating } = useSWRMutation(API.RESUME.POST, createResume)

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
      createResumeFromVoice(file)
        .then(data => {
          setVoiceLoading(false)
          router.push(`/app/resume/${data}`)
        })
        .catch(() => setVoiceLoading(false))
    })
  }, [recordingBlob])

  const onCreate = () => {
    trigger().then(data => {
      router.push(`/app/resume/${data}`)
    })
  }

  return (
    <div className="md:p-6 px-0 py-4">
      <div className="flex items-center gap-2 mb-2 md:mb-4 mr-0 md:mr-0">
        <IconClipboardText className="w-8 h-8" />
        <div>
          <p className="text-lg">{t('Title')}</p>
          <p className="text-xs text-gray-500 mt-1">{t('Description')}</p>
        </div>
      </div>

      <div className="bg-background md:border md:rounded-xl md:border-muted md:shadow-sm">
        <div className="p-4 border-b border-b-muted flex items-center justify-between">
          <p className="text-xs md:text-sm">{t('List')}</p>

          <Button loading={isMutating} className="flex gap-2 items-center" onClick={onCreate}>
            <IconOctagonPlus className="w-5 h-5" />
            {t('Create')}
          </Button>
        </div>
        <div className="p-4 min-h-[600px]">
          {isLoading ? (
            <ResumeSkelton />
          ) : !data || data.length === 0 ? (
            <ResumeEmpty loading={isMutating} onCreate={onCreate} />
          ) : (
            <div className="grid grid-cols-12 gap-4">
              {data.map(resume => (
                <div key={resume._id} className="col-span-12 xl:col-span-6 border border-muted p-4 rounded-md">
                  <SingleResume resume={resume} onRefresh={refreshResumes} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResumeListContainer
