'use client'

import { useParams, usePathname, useRouter } from 'next/navigation'

import clsx from 'clsx'
import { History, Home, LayoutDashboard, Settings } from 'lucide-react'
import React, { useEffect } from 'react'

import { useTranslation } from '@/app/i18n/client'
import useUserStore from '@/lib/store/auth'
import { getUserProfile } from '@/modules/auth/services'

import AppHeader from '../../components/AppHeader'
import AppSiderBar from '../../components/AppSideBar'

export default function AppLayoutContainer({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { lng } = useParams()
  const { user, setUser } = useUserStore()
  const { t } = useTranslation(lng as string, 'Layout')

  const menus = [
    { title: t('Menus.Home'), link: '/app', icon: <Home className="w-5 h-5" /> },
    { title: t('Menus.Dashboard'), link: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { title: t('Menus.History'), link: '/history', icon: <History className="w-5 h-5" /> },
    { title: t('Menus.Settings'), link: '/settings', icon: <Settings className="w-5 h-5" /> },
  ]

  useEffect(() => {
    if (!user) {
      router.push(`${lng}/login?return=${pathname}`)
    } else {
      getUserProfile().then(res => {
        setUser(res)
      })
    }
  }, [])

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
          'h-full min-h-[calc(100vh-40px)] bg-white md:bg-gray-100 md:shadow-inner ',
        )}
      >
        {children}
      </div>
    </main>
  )
}
