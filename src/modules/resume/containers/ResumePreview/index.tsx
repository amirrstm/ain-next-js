'use client'

import { IconDownload, IconTableOptions, IconTemplate } from '@tabler/icons-react'
import clsx from 'clsx'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
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
      .then((data) => {
        setLoading(false)
        window.open(data)
      })
      .catch(() => setLoading(false))
  }

  const onReloadTemplate = () => {
    setReloadKey((prev) => prev + 1)
    mutate()
  }

  return (
    <div className="h-screen overflow-hidden">
      <div className="fixed top-0 right-0 left-0 z-10 flex items-center justify-between border-b border-b-muted bg-black/60 p-3 md:p-4 dark:bg-card">
        <h1 className="text-base md:text-xl">{t('Settings.Title')}</h1>

        <div className="flex gap-3">
          <Button
            className="flex items-center gap-2"
            onClick={() => setOpenTemplates(true)}
            size={isTabletOrMobile ? 'sm' : 'default'}
            variant="secondary"
          >
            <IconTemplate />
            <span className="hidden md:block">{t('Settings.Template.Title')}</span>
          </Button>

          <Button
            className="flex items-center gap-2"
            onClick={() => setOpenSettings(true)}
            size={isTabletOrMobile ? 'sm' : 'default'}
            variant="secondary"
          >
            <IconTableOptions />
            <span className="hidden md:block">{t('Settings.Options.Title')}</span>
          </Button>

          <Button
            className="flex items-center gap-2"
            loading={loading}
            onClick={onDownload}
            size={isTabletOrMobile ? 'sm' : 'default'}
          >
            <IconDownload />
            {t('Settings.Download')}
          </Button>
        </div>
      </div>

      <div
        className={clsx(
          'z-10 transition-all duration-300 ease-in-out',
          'fixed top-[62px] h-[calc(100vh-62px)] w-[320px] bg-black/60 md:top-[73px] md:h-[calc(100vh-73px)] dark:bg-card',
          {
            '-right-[320px]': !openTemplates,
            'right-0': openTemplates
          }
        )}
        ref={templatesRef}
      >
        <PreviewTemplates onClose={() => setOpenTemplates(false)} onReload={onReloadTemplate} template={data?.template} />
      </div>

      <div
        className={clsx(
          'z-10 transition-all duration-300 ease-in-out',
          'fixed top-[62px] h-[calc(100vh-62px)] w-[320px] bg-black/60 md:top-[73px] md:h-[calc(100vh-73px)] dark:bg-card',
          {
            '-left-[320px]': !openSettings,
            'left-0': openSettings
          }
        )}
        ref={settingsRef}
      >
        <PreviewSettings
          isLoading={isLoading}
          onClose={() => setOpenSettings(false)}
          onReload={() => setReloadKey((prev) => prev + 1)}
          settings={data?.templateSettings}
        />
      </div>

      <div className="flex w-full justify-center p-6 pt-24">
        <div className="overflow-hidden rounded-2xl sm:bg-white md:origin-top md:scale-[0.7] 2xl:scale-100">
          <iframe
            className="h-[450mm] w-[210mm] origin-top-right scale-[0.48] sm:scale-75 md:h-[275mm] md:scale-100"
            key={reloadKey}
            referrerPolicy="no-referrer"
            src={`${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/public/resume/${resumeId}`}
            title="Resume Preview"
          />
        </div>
      </div>
    </div>
  )
}

export default ResumePreviewContainer
