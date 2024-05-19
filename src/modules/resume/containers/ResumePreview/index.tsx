'use client'

import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

import { IconDownload } from '@tabler/icons-react'
import React from 'react'

import { Button } from '@/components/ui/button'

import PreviewSettings from '../../components/Preview/Settings'
import PreviewTemplates from '../../components/Preview/Templates'
import useResume from '../../hooks/useResume'
import { updateDownload } from '../../service'

const ResumePreviewContainer: React.FC = () => {
  const { resumeId } = useParams()
  const t = useTranslations('Resume')
  const { data, isLoading, mutate } = useResume(resumeId as string)

  const [reloadKey, setReloadKey] = React.useState(0)
  const [loading, setLoading] = React.useState(false)

  const onDownload = () => {
    setLoading(true)
    updateDownload(resumeId as string)
      .then(data => {
        setLoading(false)
        window.open(data)
      })
      .catch(() => setLoading(false))
  }

  const onReloadTemplate = () => {
    setReloadKey(prev => prev + 1)
    mutate()
  }

  return (
    <div>
      <div className="fixed top-0 right-0 left-0 bg-card p-4 flex items-center justify-between border-b border-b-muted">
        <h1 className="text-xl">{t('Settings.Title')}</h1>

        <Button className="flex gap-2 items-center" loading={loading} onClick={onDownload}>
          <IconDownload />
          {t('Settings.Download')}
        </Button>
      </div>

      <div className="fixed top-[73px] right-0 bg-card w-[320px] h-[calc(100vh-73px)]">
        <PreviewTemplates template={data?.template} onReload={onReloadTemplate} />
      </div>

      <div className="fixed top-[73px] left-0 bg-card w-[320px] h-[calc(100vh-73px)]">
        <PreviewSettings
          isLoading={isLoading}
          settings={data?.templateSettings}
          onReload={() => setReloadKey(prev => prev + 1)}
        />
      </div>

      <div className="flex items-center justify-center p-10 py-24">
        <div className="bg-white rounded-md overflow-hidden">
          <iframe
            key={reloadKey}
            referrerPolicy="no-referrer"
            className="w-[210mm] h-[310mm]"
            src={`${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/public/resume/${resumeId}`}
          />
        </div>
      </div>
    </div>
  )
}

export default ResumePreviewContainer
