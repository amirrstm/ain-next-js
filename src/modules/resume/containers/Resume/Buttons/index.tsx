import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

import { IconDeviceFloppy, IconEye } from '@tabler/icons-react'
import React, { useContext } from 'react'

import { Button } from '@/components/ui/button'
import { Link } from '@/components/ui/navigation'

import { RESUME_ENUM_TABS } from '@/modules/resume/constants/resume.enum'
import { ResumeContext } from '@/modules/resume/context'

const Buttons: React.FC = () => {
  const { resumeId } = useParams()
  const t = useTranslations('Resume')
  const { activeTab, setActiveTab } = useContext(ResumeContext)

  const onProgress = () => {
    switch (activeTab) {
      case RESUME_ENUM_TABS.Basic:
        setActiveTab(RESUME_ENUM_TABS.Education)
        return
      case RESUME_ENUM_TABS.Education:
        setActiveTab(RESUME_ENUM_TABS.Experience)
        return
      case RESUME_ENUM_TABS.Experience:
        setActiveTab(RESUME_ENUM_TABS.Skills)
        return
      case RESUME_ENUM_TABS.Skills:
        setActiveTab(RESUME_ENUM_TABS.Projects)
        return
      case RESUME_ENUM_TABS.Projects:
        setActiveTab(RESUME_ENUM_TABS.Publications)
        return
      case RESUME_ENUM_TABS.Publications:
        setActiveTab(RESUME_ENUM_TABS.Others)
        return
    }
  }

  const onBack = () => {
    switch (activeTab) {
      case RESUME_ENUM_TABS.Education:
        setActiveTab(RESUME_ENUM_TABS.Basic)
        return
      case RESUME_ENUM_TABS.Experience:
        setActiveTab(RESUME_ENUM_TABS.Education)
        return
      case RESUME_ENUM_TABS.Skills:
        setActiveTab(RESUME_ENUM_TABS.Experience)
        return
      case RESUME_ENUM_TABS.Projects:
        setActiveTab(RESUME_ENUM_TABS.Skills)
        return
      case RESUME_ENUM_TABS.Publications:
        setActiveTab(RESUME_ENUM_TABS.Projects)
        return
      case RESUME_ENUM_TABS.Others:
        setActiveTab(RESUME_ENUM_TABS.Publications)
        return
    }
  }

  return (
    <div className="flex gap-3 flex-row-reverse xl:flex-col">
      <div className="flex gap-3">
        {activeTab !== RESUME_ENUM_TABS.Others && (
          <Button className="flex-1 flex gap-1" onClick={onProgress}>
            <IconDeviceFloppy className="w-5 h-5" />
            <span> {t('Save')}</span>
          </Button>
        )}
        {activeTab !== RESUME_ENUM_TABS.Basic && (
          <Button onClick={onBack} className="flex-1 bg-neutral-500 dark:bg-muted">
            {t('Back')}
          </Button>
        )}
      </div>
      <Link href={`/resume-preview/${resumeId}`} target="_blank" className="block flex-auto xl:flex-1">
        <Button className="w-full bg-blue-400 flex gap-1 hover:bg-blue-400/80">
          <IconEye className="w-5 h-5" />
          <span>{t('Preview')}</span>
        </Button>
      </Link>
    </div>
  )
}

export default Buttons
