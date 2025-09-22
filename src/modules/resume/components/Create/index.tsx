import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
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

import type React from 'react'

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
  const { trigger: triggerVoice } = useSWRMutation(API.RESUME.CREATE_FROM_VOICE, createResumeFromVoice)
  const { trigger: triggerOccupation } = useSWRMutation(API.RESUME.CREATE_FROM_OCCUPATION, createResumeFromOccupation)

  const RESUME_TYPES = [
    {
      description: t('Create.Type.CustomDescription'),
      id: 'custom',
      title: t('Create.Type.CustomTitle')
    },
    {
      description: t('Create.Type.AIDescription'),
      id: 'ai',
      title: t('Create.Type.AITitle')
    },
    {
      description: t('Create.Type.VoiceDescription'),
      id: 'voice',
      title: t('Create.Type.VoiceTitle')
    }
  ]

  const titles = {
    ai: {
      description: t('Create.AI.Description'),
      title: t('Create.AI.Title')
    },
    templates: {
      description: t('Create.Template.Description'),
      title: t('Create.Title')
    },
    type: {
      description: t('Create.Type.Description'),
      title: t('Create.Title')
    },
    voice: {
      description: t('Create.Voice.Description'),
      title: t('Create.Voice.Title')
    }
  }

  const onSelectTemplate = (id: string) => {
    setTemplateId(id)
    setActiveTab('type')
  }

  const onSelectType = (id: string) => {
    if (id === 'custom') {
      trigger({
        template: templateId,
        title: t('Create.TitleForCustom', { name: `${user?.firstName ?? ''}` })
      }).then((data) => {
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
      triggerOccupation({ description, occupation, template: templateId })
        .then((data) => {
          setLoading(false)
          closeResume()

          toast.success(t('Create.Success'))
          router.push(`/app/resume/${data}`)
        })
        .catch(() => setLoading(false))
    }
  }

  const onCreateVoice = (file: File) => {
    if (templateId) {
      setLoading(true)
      triggerVoice({ file, template: templateId })
        .then((data) => {
          setLoading(false)

          closeResume()
          toast.success(t('Create.Success'))
          router.push(`/app/resume/${data}`)
        })
        .catch(() => setLoading(false))
    }
  }

  const closeResume = () => {
    onClose()
    setTemplateId(undefined)
    setActiveTab('templates')
  }

  return (
    <Dialog onOpenChange={closeResume} open={open}>
      <DialogContent
        className={clsx({
          'max-w-2xl': activeTab === 'templates',
          'max-w-5xl': activeTab === 'type'
        })}
      >
        <DialogHeader>
          <DialogTitle>{titles[activeTab as 'ai' | 'voice' | 'templates'].title}</DialogTitle>
          <DialogDescription>{titles[activeTab as 'ai' | 'voice' | 'templates'].description}</DialogDescription>
        </DialogHeader>

        <div className="min-h-[88vh] w-full overflow-y-auto overflow-x-hidden md:min-h-max">
          {(isMutating || loading) && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 rounded-xl bg-background/80">
              <div className="h-14 w-14">
                <Loader />
              </div>
              <p>{t('Loading')}</p>
            </div>
          )}
          {activeTab === 'ai' && <AICreate onSubmit={onCreateAI} />}

          {activeTab === 'voice' && <VoiceCreate onSubmit={onCreateVoice} />}

          {activeTab === 'type' && <ResumeTypes items={RESUME_TYPES} onSelect={onSelectType} />}

          {activeTab === 'templates' && <ResumeTemplates onSelect={onSelectTemplate} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreateResume
