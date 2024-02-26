'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'

import { Menu } from 'lucide-react'
import React, { useState } from 'react'

import { useTranslation } from '@/app/i18n/client'

import MenuDrawer from './MenuDrawer'

interface Props {
  menus: {
    title: string
    link: string
    icon: React.ReactNode
  }[]
}

const AppHeader: React.FC<Props> = ({ menus }) => {
  const { lng } = useParams()
  const { t } = useTranslation(lng as string, 'Layout')
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="flex justify-between items-center px-3 py-4 border-b bg-white">
        <div className="flex gap-2 cursor-pointer" onClick={() => setOpen(true)}>
          <Menu />
          <span>{t('Header.Menu')}</span>
        </div>

        <div className="relative h-7 sm:h-8">
          <Image
            alt="logo"
            width={200}
            height={200}
            src="/images/logo-black.png"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <MenuDrawer menus={menus} open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export default AppHeader
