'use client'

import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'

import { IconDashboard, IconHistory, IconHome, IconSettings } from '@tabler/icons-react'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'

import useUserStore from '@/lib/store/auth'
import { getUserProfile } from '@/modules/auth/services'

import AppHeader from '../../components/AppHeader'
import AppSiderBar from '../../components/AppSideBar'

export default function AppLayoutContainer({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('Layout')

  const { user, setUser } = useUserStore()
  const [loading, setLoading] = useState(false)

  const menus = [
    { title: t('Menus.Home'), link: '/app', icon: <IconHome className="w-6 h-6" /> },
    { title: t('Menus.Dashboard'), link: '/app/dashboard', icon: <IconDashboard className="w-6 h-6" /> },
    { title: t('Menus.History'), link: '/app/history', icon: <IconHistory className="w-6 h-6" /> },
    { title: t('Menus.Settings'), link: '/app/settings', icon: <IconSettings className="w-6 h-6" /> },
  ]

  useEffect(() => {
    if (!user) {
      router.push(`/login`)
    } else {
      setLoading(true)
      getUserProfile().then(res => {
        setUser(res)
        setLoading(false)
      })
    }
  }, [])

  if (loading) return null

  return (
    <main className="block md:flex bg-gray-100 md:bg-white">
      <div className="block md:hidden">
        <AppHeader menus={menus} />
      </div>

      <div className="hidden md:block">
        <AppSiderBar menus={menus} />
      </div>
      <div
        className={clsx(
          'ms-2 md:ms-[250px] mt-4 md:mt-5 mb-2 md:mb-5 me-2 md:me-5 flex-1 border rounded-2xl',
          'h-full min-h-[calc(100vh-40px)] bg-white md:bg-gray-100 md:shadow-inner overflow-hidden',
        )}
      >
        {children}
      </div>
    </main>
  )
}
