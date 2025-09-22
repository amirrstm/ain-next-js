import { IconCheck } from '@tabler/icons-react'
import clsx from 'clsx'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { type ReactNode, useContext } from 'react'

import { YekanBakhNumFont } from '@/styles/fonts'

import { RESUME_ENUM_TABS } from '../../constants/resume.enum'
import { ResumeContext } from '../../context'

const MainSidebar: React.FC = () => {
  const t = useTranslations('Resume')
  const { activeTab, setActiveTab } = useContext(ResumeContext)

  const tabs: Record<RESUME_ENUM_TABS, { title: string; description: string }> = {
    [RESUME_ENUM_TABS.Basic]: { description: t('Tabs.Personal.Description'), title: t('Tabs.Personal.Title') },
    [RESUME_ENUM_TABS.Education]: { description: t('Tabs.Education.Description'), title: t('Tabs.Education.Title') },
    [RESUME_ENUM_TABS.Experience]: { description: t('Tabs.Experience.Description'), title: t('Tabs.Experience.Title') },
    [RESUME_ENUM_TABS.Skills]: { description: t('Tabs.Skills.Description'), title: t('Tabs.Skills.Title') },
    [RESUME_ENUM_TABS.Projects]: { description: t('Tabs.Projects.Description'), title: t('Tabs.Projects.Title') },
    [RESUME_ENUM_TABS.Publications]: {
      description: t('Tabs.Publications.Description'),
      title: t('Tabs.Publications.Title')
    },
    [RESUME_ENUM_TABS.Others]: { description: t('Tabs.Other.Description'), title: t('Tabs.Other.Title') }
  }

  return (
    <div className="rounded-xl border border-muted bg-card">
      <div className="border-b border-b-muted p-2 xl:p-4">
        <h1 className="font-semibold text-primary sm:text-lg">{t('Title')}</h1>
        <p className="mt-1 text-gray-500 text-xs">{t('Description')}</p>
      </div>
      <div className="overflow-x-auto py-4 ps-2 pe-6 xl:ps-8 xl:pe-2">
        <ol className="relative flex min-w-[480px] flex-nowrap justify-between text-gray-500 sm:flex-wrap xl:block xl:border-muted xl:border-s">
          <div className="absolute top-3 right-8 block h-[1px] w-[calc(100%-40px)] bg-muted sm:top-4 xl:hidden" />
          {Object.keys(tabs).map((tab, index) => (
            <SingleTab
              completed={index < Object.keys(tabs).indexOf(activeTab)}
              description={tabs[tab as RESUME_ENUM_TABS].description}
              index={index + 1}
              isActive={activeTab === tab}
              isLast={index === Object.keys(tabs).length - 1}
              key={tab}
              onClick={() => activeTab !== tab && setActiveTab(tab as RESUME_ENUM_TABS)}
              title={tabs[tab as RESUME_ENUM_TABS].title}
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
      className={clsx('group relative flex cursor-pointer flex-col items-center gap-3 xl:ms-6 xl:flex-row xl:gap-0', {
        'opacity-85 dark:opacity-100': !isActive && !completed,
        'xl:mb-10': !isLast
      })}
      onClick={onClick}
    >
      <span
        className={clsx(
          'xl:-start-10 flex h-6 w-6 items-center justify-center rounded-full sm:h-7 sm:w-7 xl:absolute',
          '-start-4 bg-muted ring-4 ring-muted',
          {
            '!bg-green-500 !text-white !ring-green-500': completed,
            'bg-primary text-white ring-primary': isActive,
            'group-hover:text-primary': !isActive && !completed
          }
        )}
      >
        {completed ? (
          <IconCheck className="h-4 w-4" />
        ) : index ? (
          <p className={clsx(locale === 'fa' && YekanBakhNumFont.className, 'text-sm sm:text-lg')}>{index}</p>
        ) : (
          icon
        )}
      </span>
      <div className="text-center xl:text-start">
        <h3
          className={clsx('font-medium text-xs lg:text-base', {
            'group-hover:text-primary': !isActive && !completed,
            'text-green-500': completed,
            'text-primary': isActive
          })}
        >
          {title}
        </h3>
        <p
          className={clsx('hidden font-light text-gray-400 text-xs group-hover:text-primary xl:block', {
            '!text-green-500': completed,
            '!text-primary': isActive
          })}
        >
          {description}
        </p>
      </div>
    </li>
  )
}
