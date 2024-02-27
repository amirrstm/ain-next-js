'use client'

import Image from 'next/image'
import { useParams, usePathname } from 'next/navigation'

import { Edit2, ImageIcon, MessagesSquare } from 'lucide-react'
import React from 'react'

import DashboardMenu from '@/components/ui/dashboard-menu'
import LineDivider from '@/components/ui/line-divider'

import { useTranslation } from '@/app/i18n/client'

import UserProfile from './UserProfile'

interface Props {
  menus: {
    title: string
    link: string
    icon: React.ReactNode
  }[]
}

const AppSiderBar: React.FC<Props> = ({ menus }) => {
  const { lng } = useParams()
  const pathname = usePathname()
  const { t } = useTranslation(lng as string, 'Layout')

  return (
    <div className="p-5 fixed right-0 top-0 bottom-0 max-w-[250px] w-full h-full overflow-y-auto">
      <div className="relative h-7 sm:h-8">
        <Image
          alt="logo"
          width={200}
          height={200}
          src="/images/logo-black.png"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="mt-8 space-y-4">
        {menus.map((menu, index) => (
          <DashboardMenu
            key={index}
            lng={lng as string}
            link={menu.link}
            icon={menu.icon}
            title={<span className="text-sm">{menu.title}</span>}
            className={{
              'bg-gray-50 border-gray-100 text-primary': pathname === `/${lng}${menu.link}`,
            }}
          />
        ))}
      </div>

      <LineDivider direction="right">
        <span className="text-xs text-gray-400">{t('Dashboard.Categories')}</span>
      </LineDivider>

      <div className="mb-8">
        <DashboardMenu
          lng={lng as string}
          link="/app/copywriting"
          icon={
            <div className="h-8 w-8 bg-secondary rounded-md flex items-center justify-center">
              <Edit2 className="w-4 h-4 text-white" />
            </div>
          }
          title={<span className="text-sm">{t('Menus.Copywriting')}</span>}
          className={{
            'bg-gray-50 border-gray-100 text-primary': pathname.includes('/app/copywriting'),
          }}
        />

        <DashboardMenu
          lng={lng as string}
          link="/category"
          icon={
            <div className="h-8 w-8 bg-secondary rounded-md flex items-center justify-center">
              <MessagesSquare className="w-4 h-4 text-white" />
            </div>
          }
          title={<span className="text-sm">{t('Menus.Chat')}</span>}
        />

        <DashboardMenu
          lng={lng as string}
          link="/category"
          icon={
            <div className="h-8 w-8 bg-secondary rounded-md flex items-center justify-center">
              <ImageIcon className="w-4 h-4 text-white" />
            </div>
          }
          title={<span className="text-sm">{t('Menus.Image')}</span>}
        />
      </div>

      <UserProfile />
    </div>
  )
}

export default AppSiderBar
