import { useTranslations } from 'next-intl'

import { IconProgress } from '@tabler/icons-react'
import clsx from 'clsx'
import React, { useState } from 'react'
import { toast } from 'sonner'
import useSWRMutation from 'swr/mutation'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import Loader from '@/components/ui/loader'
import { useRouter } from '@/components/ui/navigation'

import API from '@/lib/api'
import useUserStore from '@/lib/store/auth'

import { createResume, createResumeFromOccupation, createResumeFromVoice } from '../../service'
import AICreate from './AI'
import ResumeTemplates from './Templates'
import ResumeTypes from './Types'
import VoiceCreate from './Voice'

interface Props {
  open: boolean
  onClose: () => void
}

const CreateResume: React.FC<Props> = ({ open, onClose }) => {
  const router = useRouter()
  const { user } = useUserStore()
  const t = useTranslations('Resume')
  const [templateId, setTemplateId] = useState<string>()
  const [activeTab, setActiveTab] = useState<'templates' | 'type' | 'voice' | 'ai'>('templates')

  const [loading, setLoading] = useState(false)
  const { trigger, isMutating } = useSWRMutation(API.RESUME.POST, createResume)

  const RESUME_TYPES = [
    {
      id: 'custom',
      title: t('Create.Type.CustomTitle'),
      description: t('Create.Type.CustomDescription'),
    },
    {
      id: 'ai',
      title: t('Create.Type.AITitle'),
      description: t('Create.Type.AIDescription'),
    },
    {
      id: 'voice',
      title: t('Create.Type.VoiceTitle'),
      description: t('Create.Type.VoiceDescription'),
    },
  ]

  const titles = {
    ai: {
      title: t('Create.AI.Title'),
      description: t('Create.AI.Description'),
    },
    voice: {
      title: t('Create.Voice.Title'),
      description: t('Create.Voice.Description'),
    },
    templates: {
      title: t('Create.Title'),
      description: t('Create.Template.Description'),
    },
    type: {
      title: t('Create.Title'),
      description: t('Create.Type.Description'),
    },
  }

  const onSelectTemplate = (id: string) => {
    setTemplateId(id)
    setActiveTab('type')
  }

  const onSelectType = (id: string) => {
    if (id === 'custom') {
      trigger({
        template: templateId,
        title: t('Create.TitleForCustom', { name: `${user?.firstName ?? ''}` }),
      }).then(data => {
        closeResume()
        toast.success(t('Create.Success'))
        router.push(`/app/resume/${data}`)
      })
    } else {
      setActiveTab(id as 'ai' | 'voice')
    }
  }

  const onCreateAI = (occupation: string, description?: string) => {
    if (templateId) {
      setLoading(true)
      createResumeFromOccupation(templateId, occupation, description)
        .then(data => {
          setLoading(false)
          closeResume()

          toast.success(t('Create.Success'))
          router.push(`/app/resume/${data}`)
        })
        .catch(() => setLoading(false))
    }
  }

  const onCreateVoice = (file: File) => {
    setLoading(true)
    createResumeFromVoice(file, templateId as string)
      .then(data => {
        setLoading(false)

        closeResume()
        toast.success(t('Create.Success'))
        router.push(`/app/resume/${data}`)
      })
      .catch(() => setLoading(false))
  }

  const closeResume = () => {
    onClose()
    setTemplateId(undefined)
    setActiveTab('templates')
  }

  return (
    <Dialog open={open} onOpenChange={closeResume}>
      <DialogContent
        className={clsx({
          'max-w-5xl': activeTab === 'type',
          'max-w-2xl': activeTab === 'templates',
        })}
      >
        <DialogHeader>
          <DialogTitle>{titles[activeTab as 'ai' | 'voice' | 'templates'].title}</DialogTitle>
          <DialogDescription>{titles[activeTab as 'ai' | 'voice' | 'templates'].description}</DialogDescription>
        </DialogHeader>

        <div className="w-full overflow-x-hidden overflow-y-auto min-h-[88vh] md:min-h-max">
          {(isMutating || loading) && (
            <div className="absolute inset-0 bg-background/80 z-20 flex flex-col gap-3 items-center justify-center rounded-xl">
              <div className="w-14 h-14">
                <Loader />
              </div>
              <p>{t('Loading')}</p>
            </div>
          )}
          {activeTab === 'ai' && <AICreate onSubmit={onCreateAI} />}

          {activeTab === 'voice' && <VoiceCreate onSubmit={onCreateVoice} />}

          {activeTab === 'type' && (
            <div>
              <ResumeTypes items={RESUME_TYPES} onSelect={onSelectType} />

              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setActiveTab('templates')}
                  className="text-neutral-400 hover:text-neutral-500 font-medium"
                >
                  {t('Create.Template.Back')}
                </button>
              </div>
            </div>
          )}
          {activeTab === 'templates' && <ResumeTemplates onSelect={onSelectTemplate} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreateResume
