'use client'

import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

import { IconDownload, IconTableOptions, IconTemplate } from '@tabler/icons-react'
import clsx from 'clsx'
import React, { useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'

import { Button } from '@/components/ui/button'

import PreviewSettings from '../../components/Preview/Settings'
import PreviewTemplates from '../../components/Preview/Templates'
import useResume from '../../hooks/useResume'
import { updateDownload } from '../../service'

const ResumePreviewContainer: React.FC = () => {
  const settingsRef = React.useRef<HTMLDivElement>(null)
  const templatesRef = React.useRef<HTMLDivElement>(null)

  const { resumeId } = useParams()
  const t = useTranslations('Resume')
  const { data, isLoading, mutate } = useResume(resumeId as string)
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })

  const [openTemplates, setOpenTemplates] = React.useState(!isTabletOrMobile)
  const [openSettings, setOpenSettings] = React.useState(!isTabletOrMobile)

  const [reloadKey, setReloadKey] = React.useState(0)
  const [loading, setLoading] = React.useState(false)

  useEffect(() => {
    if (isTabletOrMobile) {
      const handleClick = (e: MouseEvent) => {
        if (
          settingsRef.current &&
          !settingsRef.current.contains(e.target as Node) &&
          templatesRef.current &&
          !templatesRef.current.contains(e.target as Node)
        ) {
          setOpenTemplates(false)
          setOpenSettings(false)
        }
      }

      document.addEventListener('mousedown', handleClick)

      return () => {
        document.removeEventListener('mousedown', handleClick)
      }
    }
  }, [isTabletOrMobile])

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
    <div className="h-screen overflow-hidden ">
      <div className="fixed top-0 right-0 left-0 bg-black/60 dark:bg-card p-3 md:p-4 z-10 flex items-center justify-between border-b border-b-muted">
        <h1 className="text-base md:text-xl">{t('Settings.Title')}</h1>

        <div className="flex gap-3">
          <Button
            variant="secondary"
            className="flex gap-2 items-center"
            onClick={() => setOpenTemplates(true)}
            size={isTabletOrMobile ? 'sm' : 'default'}
          >
            <IconTemplate />
            <span className="hidden md:block">{t('Settings.Template.Title')}</span>
          </Button>

          <Button
            variant="secondary"
            className="flex gap-2 items-center"
            onClick={() => setOpenSettings(true)}
            size={isTabletOrMobile ? 'sm' : 'default'}
          >
            <IconTableOptions />
            <span className="hidden md:block">{t('Settings.Options.Title')}</span>
          </Button>

          <Button
            loading={loading}
            onClick={onDownload}
            className="flex gap-2 items-center"
            size={isTabletOrMobile ? 'sm' : 'default'}
          >
            <IconDownload />
            {t('Settings.Download')}
          </Button>
        </div>
      </div>

      <div
        ref={templatesRef}
        className={clsx(
          'transition-all duration-300 ease-in-out z-10',
          'fixed top-[62px] md:top-[73px] bg-black/60 dark:bg-card w-[320px] h-[calc(100vh-62px)] md:h-[calc(100vh-73px)]',
          {
            'right-0': openTemplates,
            '-right-[320px]': !openTemplates,
          },
        )}
      >
        <PreviewTemplates
          template={data?.template}
          onReload={onReloadTemplate}
          onClose={() => setOpenTemplates(false)}
        />
      </div>

      <div
        ref={settingsRef}
        className={clsx(
          'transition-all duration-300 ease-in-out z-10',
          'fixed top-[62px] md:top-[73px] bg-black/60 dark:bg-card w-[320px] h-[calc(100vh-62px)] md:h-[calc(100vh-73px)]',
          {
            'left-0': openSettings,
            '-left-[320px]': !openSettings,
          },
        )}
      >
        <PreviewSettings
          isLoading={isLoading}
          settings={data?.templateSettings}
          onClose={() => setOpenSettings(false)}
          onReload={() => setReloadKey(prev => prev + 1)}
        />
      </div>

      <div className="flex justify-center p-6 pt-24 w-full">
        <div className="sm:bg-white rounded-2xl overflow-hidden md:scale-[0.7] 2xl:scale-100 md:origin-top">
          <iframe
            key={reloadKey}
            referrerPolicy="no-referrer"
            src={`${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/public/resume/${resumeId}`}
            className="w-[210mm] h-[450mm] md:h-[250mm] scale-[0.48] sm:scale-75 md:scale-100 origin-top-right"
          />
        </div>
      </div>
    </div>
  )
}

export default ResumePreviewContainer
