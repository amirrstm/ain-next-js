'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { IconMessage2Bolt, IconPencil } from '@tabler/icons-react'
import React from 'react'

import DashboardMenu from '@/components/ui/dashboard-menu'
import LineDivider from '@/components/ui/line-divider'
import { Link, usePathname } from '@/components/ui/navigation'

import UserProfile from './UserProfile'

interface Props {
  menus: {
    title: string
    link: string
    icon: React.ReactNode
  }[]
}

const AppSiderBar: React.FC<Props> = ({ menus }) => {
  const pathname = usePathname()
  const t = useTranslations('Layout')

  return (
    <div className="p-5 fixed right-0 top-0 bottom-0 max-w-[250px] w-full h-full overflow-y-auto flex flex-col justify-between">
      <div>
        <Link href="/app" className="flex relative h-7 sm:h-8">
          <Image
            alt="logo"
            width={200}
            height={200}
            src="/images/logo-black.png"
            className="w-full h-full object-contain dark:grayscale dark:invert dark:contrast-[1] dark:hue-rotate-[180deg]"
          />
        </Link>

        <div className="mt-8 space-y-4">
          {menus.map((menu, index) => (
            <DashboardMenu
              key={index}
              link={menu.link}
              icon={menu.icon}
              title={<span className="text-sm">{menu.title}</span>}
              className={{
                'bg-gray-50 dark:bg-card border-muted text-primary dark:text-primary': pathname === `${menu.link}`,
              }}
            />
          ))}
        </div>

        <LineDivider direction="right">
          <span className="text-xs text-gray-400">{t('Dashboard.Categories')}</span>
        </LineDivider>

        <div className="mb-8 space-y-2">
          <DashboardMenu
            link="/app/copywriting"
            icon={
              <div className="h-8 w-8 bg-secondary rounded-md flex items-center justify-center">
                <IconPencil className="w-4 h-4 text-white" />
              </div>
            }
            title={<span className="text-sm">{t('Menus.Copywriting')}</span>}
            className={{
              'bg-gray-50 dark:bg-card border-muted text-primary dark:text-primary':
                pathname.includes('/app/copywriting'),
            }}
          />

          <DashboardMenu
            link="/app/chat"
            icon={
              <div className="h-8 w-8 bg-secondary rounded-md flex items-center justify-center">
                <IconMessage2Bolt className="w-4 h-4 text-white" />
              </div>
            }
            title={<span className="text-sm">{t('Menus.Chat')}</span>}
          />
        </div>
      </div>

      <UserProfile />
    </div>
  )
}

export default AppSiderBar
