import { useTranslations } from 'next-intl'

import { IconCheck, IconPerspective, IconUser } from '@tabler/icons-react'
import clsx from 'clsx'
import { ReactNode } from 'react'

const MainSidebar: React.FC = () => {
  const t = useTranslations('Resume')

  return (
    <div className="bg-white p-8 rounded-xl shadow-md">
      <ol className="relative text-gray-500 border-s border-gray-200">
        <SingleTab completed icon={<IconUser />} title={t('Tabs.Personal')} />
        <SingleTab isActive icon={<IconPerspective />} title={t('Tabs.Experience')} />
        <SingleTab icon={<IconPerspective />} title={t('Tabs.Experience')} />
        <SingleTab icon={<IconPerspective />} title={t('Tabs.Experience')} />
        <SingleTab icon={<IconPerspective />} title={t('Tabs.Experience')} />
        <SingleTab isLast icon={<IconPerspective />} title={t('Tabs.Languages')} />
      </ol>
    </div>
  )
}

export default MainSidebar

const SingleTab: React.FC<{
  isActive?: boolean
  completed?: boolean
  title: string
  icon: ReactNode
  isLast?: boolean
}> = ({ icon, title, isActive, completed, isLast }) => {
  return (
    <li
      className={clsx('ms-6 flex items-center', {
        'mb-12': !isLast,
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
        {completed ? <IconCheck /> : icon}
      </span>
      <h3 className={clsx('font-medium', { 'text-blue-600': isActive })}>{title}</h3>
    </li>
  )
}
