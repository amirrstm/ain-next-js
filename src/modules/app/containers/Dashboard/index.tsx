'use client'

import { useTranslations } from 'next-intl'

import { IconFileCv, IconMessage2Bolt, IconPencil } from '@tabler/icons-react'
import clsx from 'clsx'
import React from 'react'

import { Link } from '@/components/ui/navigation'

import IconChat from '@/icons/menus/chat'
import IconCopywriting from '@/icons/menus/copywriting'
import IconResume from '@/icons/menus/resume'

import DashboardHeader from '../../components/DashboardHeader'
import DashboardStat from '../../components/DashboardStat'
import QuickAccess from '../../components/QuickAccess'

const DashboardContainer: React.FC = () => {
  const t = useTranslations('Layout')

  const menus = [
    {
      link: '/app/copywriting',
      title: t('Dashboard.Access.Copywriting.Title'),
      description: t('Dashboard.Access.Copywriting.Description'),
      icon: (
        <div className="w-7 h-7">
          <IconCopywriting />
        </div>
      ),
    },
    {
      link: '/app/resume',
      title: t('Dashboard.Access.Resume.Title'),
      description: t('Dashboard.Access.Resume.Description'),
      icon: (
        <div className="w-7 h-7">
          <IconResume />
        </div>
      ),
    },
    {
      link: '/app/chat',
      title: t('Dashboard.Access.Chat.Title'),
      description: t('Dashboard.Access.Chat.Description'),
      icon: (
        <div className="w-7 h-7">
          <IconChat />
        </div>
      ),
    },
  ]

  return (
    <div className="p-2 md:p-6">
      <DashboardHeader />

      <DashboardStat />

      <div className="hidden md:block">
        <QuickAccess />
      </div>

      <div className="block md:hidden mt-6 space-y-6">
        {menus.map((menu, index) => (
          <Link
            key={index}
            href={menu.link}
            className={clsx(
              'cursor-pointer group transition-all ease-in-out duration-200',
              'border border-muted rounded-xl bg-background shadow-sm hover:shadow-primary p-4 flex gap-4 items-center',
            )}
          >
            <span className="group-hover:text-primary px-4 h-14 flex items-center justify-center rounded-lg bg-secondary">
              {menu.icon}
            </span>

            <div className="flex flex-1 flex-col items-start transition-all ease-in-out duration-200 group-hover:scale-[1.01]">
              <h3 className="font-semibold">{menu.title}</h3>
              <p className="text-xs text-gray-500 mt-1 leading-5">{menu.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default DashboardContainer
