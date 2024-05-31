'use client'

import { useTranslations } from 'next-intl'

import { IconMenu2 } from '@tabler/icons-react'
import React, { useState } from 'react'

import { Link } from '@/components/ui/navigation'

import AppLogo from '@/icons/logo'

import { MenuTabs } from './MenuTabs'
import UserProfile from './UserProfile'

interface Props {
  menus: {
    title: string
    link: string
    icon: React.ReactNode
  }[]
}

const AppHeader: React.FC<Props> = ({ menus }) => {
  const t = useTranslations('Layout')
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-b-input bg-card">
      <div className="flex justify-between items-center py-3 px-6">
        <Link href="/app">
          <div className="relative w-[120px] h-7 sm:h-9">
            <AppLogo fill="#fff" />
          </div>
        </Link>

        <UserProfile />
      </div>

      <MenuTabs tabs={menus} />
    </div>
  )
}

export default AppHeader
