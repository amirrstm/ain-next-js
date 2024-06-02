import { useTranslations } from 'next-intl'

import { IconProgress } from '@tabler/icons-react'
import clsx from 'clsx'
import React, { useState } from 'react'
import { toast } from 'sonner'
import useSWRMutation from 'swr/mutation'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useRouter } from '@/components/ui/navigation'

import API from '@/lib/api'
import useUserStore from '@/lib/store/auth'

import { createResume } from '../../service'
import ResumeTemplates from './Templates'
import ResumeTypes from './Types'

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
        onClose()
        toast.success(t('Create.Success'))
        router.push(`/app/resume/${data}`)
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className={clsx({
          'max-w-2xl': activeTab === 'templates',
          'max-w-5xl': activeTab !== 'templates',
        })}
      >
        <DialogHeader>
          <DialogTitle>{t('Create.Title')}</DialogTitle>
          <DialogDescription>
            {activeTab === 'templates' ? t('Create.Template.Description') : t('Create.Type.Description')}
          </DialogDescription>
        </DialogHeader>

        <div className="w-full overflow-x-hidden overflow-y-auto min-h-[88vh] md:min-h-max">
          {isMutating && (
            <div className="absolute inset-0 bg-background/50 z-20 flex items-center justify-center rounded-xl">
              <IconProgress className="w-8 h-8 animate-spin" />
            </div>
          )}
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
