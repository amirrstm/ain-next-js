import { useTranslations } from 'next-intl'

import { IconCheck } from '@tabler/icons-react'
import clsx from 'clsx'
import { ReactNode, useContext } from 'react'

import { YekanBakhNumFont } from '@/styles/fonts'

import { RESUME_ENUM_TABS } from '../../constants/resume.enum'
import { ResumeContext } from '../../context'

const MainSidebar: React.FC = () => {
  const t = useTranslations('Resume')
  const { activeTab } = useContext(ResumeContext)

  const tabs: Record<RESUME_ENUM_TABS, { title: string; description: string }> = {
    [RESUME_ENUM_TABS.Basic]: { title: t('Tabs.Personal.Title'), description: t('Tabs.Personal.Description') },
    [RESUME_ENUM_TABS.Education]: { title: t('Tabs.Education.Title'), description: t('Tabs.Education.Description') },
    [RESUME_ENUM_TABS.Experience]: { title: t('Tabs.Experience.Title'), description: t('Tabs.Experience.Description') },
    [RESUME_ENUM_TABS.Skills]: { title: t('Tabs.Skills.Title'), description: t('Tabs.Skills.Description') },
    [RESUME_ENUM_TABS.Projects]: { title: t('Tabs.Projects.Title'), description: t('Tabs.Projects.Description') },
    [RESUME_ENUM_TABS.Publications]: {
      title: t('Tabs.Publications.Title'),
      description: t('Tabs.Publications.Description'),
    },
    [RESUME_ENUM_TABS.Others]: { title: t('Tabs.Other.Title'), description: t('Tabs.Other.Description') },
  }

  console.log(tabs)

  return (
    <div className="bg-background rounded-xl border">
      <div className="p-4 border-b">
        <h1 className="text-primary text-lg font-semibold">{t('Title')}</h1>
        <p className="text-xs text-gray-500 mt-1">{t('Description')}</p>
      </div>
      <div className="ps-8 pe-2 py-4">
        <ol className="relative text-gray-500 border-s border-gray-200">
          {Object.keys(tabs).map((tab, index) => (
            <SingleTab
              key={tab}
              index={index + 1}
              isActive={activeTab === tab}
              title={tabs[tab as RESUME_ENUM_TABS].title}
              isLast={index === Object.keys(tabs).length - 1}
              description={tabs[tab as RESUME_ENUM_TABS].description}
              completed={index < Object.keys(tabs).indexOf(activeTab)}
            />
          ))}
        </ol>
      </div>
    </div>
  )
}

export default MainSidebar

const SingleTab: React.FC<{
  title: string
  index?: number
  icon?: ReactNode
  isLast?: boolean
  isActive?: boolean
  completed?: boolean
  description?: string
}> = ({ icon, title, isActive, completed, isLast, index, description }) => {
  return (
    <li
      className={clsx('ms-6 flex items-center', {
        'mb-10': !isLast,
        'opacity-85': !isActive && !completed,
      })}
    >
      <span
        className={clsx(
          'absolute flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 -start-4 ring-4 ring-white',
          {
            'bg-green-200 text-green-600': completed,
            'bg-blue-200 text-blue-600': isActive,
          },
        )}
      >
        {completed ? (
          <IconCheck className="w-4 h-4" />
        ) : index ? (
          <p className={clsx(YekanBakhNumFont.className, 'text-lg')}>{index}</p>
        ) : (
          icon
        )}
      </span>
      <div>
        <h3 className={clsx('font-medium', { 'text-blue-600': isActive })}>{title}</h3>
        <p className={clsx('text-xs text-gray-400', { 'text-blue-600': isActive })}>{description}</p>
      </div>
    </li>
  )
}
