import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

import { IconCheck } from '@tabler/icons-react'
import clsx from 'clsx'
import { ReactNode, useContext } from 'react'

import { YekanBakhNumFont } from '@/styles/fonts'

import { RESUME_ENUM_TABS } from '../../constants/resume.enum'
import { ResumeContext } from '../../context'

const MainSidebar: React.FC = () => {
  const t = useTranslations('Resume')
  const { activeTab, setActiveTab } = useContext(ResumeContext)

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

  return (
    <div className="bg-card rounded-xl border border-muted">
      <div className="p-2 xl:p-4 border-b border-b-muted">
        <h1 className="text-primary sm:text-lg font-semibold">{t('Title')}</h1>
        <p className="text-xs text-gray-500 mt-1">{t('Description')}</p>
      </div>
      <div className="ps-2 xl:ps-8 pe-6 xl:pe-2 py-4 overflow-x-auto">
        <ol className="relative text-gray-500 xl:border-s xl:border-muted flex flex-nowrap min-w-[480px] sm:flex-wrap justify-between xl:block">
          <div className="absolute w-[calc(100%-40px)] h-[1px] bg-muted top-3 sm:top-4 right-8 block xl:hidden" />
          {Object.keys(tabs).map((tab, index) => (
            <SingleTab
              key={tab}
              index={index + 1}
              isActive={activeTab === tab}
              title={tabs[tab as RESUME_ENUM_TABS].title}
              isLast={index === Object.keys(tabs).length - 1}
              description={tabs[tab as RESUME_ENUM_TABS].description}
              completed={index < Object.keys(tabs).indexOf(activeTab)}
              onClick={() => activeTab !== tab && setActiveTab(tab as RESUME_ENUM_TABS)}
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
  onClick?: () => void
}> = ({ icon, title, isActive, completed, isLast, index, description, onClick }) => {
  const { locale } = useParams()

  return (
    <li
      onClick={onClick}
      className={clsx('xl:ms-6 flex flex-col xl:flex-row items-center cursor-pointer group relative gap-3 xl:gap-0', {
        'xl:mb-10': !isLast,
        'opacity-85 dark:opacity-100': !isActive && !completed,
      })}
    >
      <span
        className={clsx(
          'xl:absolute xl:-start-10 flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full',
          'bg-muted -start-4 ring-4 ring-muted',
          {
            '!bg-green-500 !text-white !ring-green-500': completed,
            'bg-primary text-white ring-primary': isActive,
            'group-hover:text-primary': !isActive && !completed,
          },
        )}
      >
        {completed ? (
          <IconCheck className="w-4 h-4" />
        ) : index ? (
          <p className={clsx(locale === 'fa' && YekanBakhNumFont.className, 'text-sm sm:text-lg')}>{index}</p>
        ) : (
          icon
        )}
      </span>
      <div className="text-center xl:text-start">
        <h3
          className={clsx('font-medium text-xs lg:text-base', {
            'text-primary': isActive,
            'text-green-500': completed,
            'group-hover:text-primary': !isActive && !completed,
          })}
        >
          {title}
        </h3>
        <p
          className={clsx('hidden xl:block text-xs text-gray-400 group-hover:text-primary font-light', {
            '!text-primary': isActive,
            '!text-green-500': completed,
          })}
        >
          {description}
        </p>
      </div>
    </li>
  )
}
