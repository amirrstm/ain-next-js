'use client'

import clsx from 'clsx'
import { useTranslations } from 'next-intl'

import { Link } from '@/components/ui/navigation'
import IconChat from '@/icons/menus/chat'
import IconCopywriting from '@/icons/menus/copywriting'
import IconResume from '@/icons/menus/resume'

import DashboardHeader from '../../components/DashboardHeader'
import DashboardStat from '../../components/DashboardStat'
import QuickAccess from '../../components/QuickAccess'

import type React from 'react'

const DashboardContainer: React.FC = () => {
  const t = useTranslations('Layout')

  const menus = [
    {
      description: t('Dashboard.Access.Copywriting.Description'),
      icon: (
        <div className="h-7 w-7">
          <IconCopywriting />
        </div>
      ),
      link: '/app/copywriting',
      title: t('Dashboard.Access.Copywriting.Title')
    },
    {
      description: t('Dashboard.Access.Resume.Description'),
      icon: (
        <div className="h-7 w-7">
          <IconResume />
        </div>
      ),
      link: '/app/resume',
      title: t('Dashboard.Access.Resume.Title')
    },
    {
      description: t('Dashboard.Access.Chat.Description'),
      icon: (
        <div className="h-7 w-7">
          <IconChat />
        </div>
      ),
      link: '/app/chat',
      title: t('Dashboard.Access.Chat.Title')
    }
  ]

  return (
    <div className="p-2 md:p-6">
      <DashboardHeader />

      <DashboardStat />

      <div className="hidden md:block">
        <QuickAccess />
      </div>

      <div className="mt-6 block space-y-6 md:hidden">
        {menus.map((menu, index) => (
          <Link
            className={clsx(
              'group cursor-pointer transition-all duration-200 ease-in-out',
              'flex items-center gap-4 rounded-xl border border-muted bg-background p-4 shadow-sm hover:shadow-primary'
            )}
            href={menu.link}
            key={index}
          >
            <span className="flex h-14 items-center justify-center rounded-lg bg-secondary px-4 group-hover:text-primary">
              {menu.icon}
            </span>

            <div className="flex flex-1 flex-col items-start transition-all duration-200 ease-in-out group-hover:scale-[1.01]">
              <h3 className="font-semibold">{menu.title}</h3>
              <p className="mt-1 text-gray-500 text-xs leading-5">{menu.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default DashboardContainer
