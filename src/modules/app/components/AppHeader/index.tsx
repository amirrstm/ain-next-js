'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { IconMenu2 } from '@tabler/icons-react'
import React, { useState } from 'react'

import { Link } from '@/components/ui/navigation'

import { LOGO_URL } from '@/constants'

import MenuDrawer from './MenuDrawer'

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
    <>
      <div className="flex justify-between items-center px-3 py-4 border-b border-b-muted bg-background">
        <div className="flex gap-2 items-center cursor-pointer" onClick={() => setOpen(true)}>
          <IconMenu2 />
          <span className="text-sm">{t('Header.Menu')}</span>
        </div>

        <Link href="/app">
          <div className="relative w-[120px] h-7 sm:h-8">
            <Image
              alt="logo"
              width={200}
              height={200}
              src={LOGO_URL}
              className="w-full h-full object-contain dark:grayscale dark:invert dark:contrast-[1] dark:hue-rotate-[180deg]"
            />
          </div>
        </Link>
      </div>

      <MenuDrawer menus={menus} open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export default AppHeader
