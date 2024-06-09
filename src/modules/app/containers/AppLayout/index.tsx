'use client'

import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

import {
  IconDashboard,
  IconFileCv,
  IconHistory,
  IconHome,
  IconMessage2Bolt,
  IconPencil,
  IconSettings,
} from '@tabler/icons-react'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'

import { usePathname } from '@/components/ui/navigation'

import useUserStore from '@/lib/store/auth'
import { getUserProfile } from '@/modules/auth/services'
import { removeUserToken } from '@/modules/auth/utils'

import AppHeader from '../../components/AppHeader'
import AppSiderBar from '../../components/AppSideBar'

export default function AppLayoutContainer({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('Layout')

  const { user, setUser, reset: resetUser } = useUserStore()
  const [loading, setLoading] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(true)

  useEffect(() => {
    if (pathname.includes('/app/copywriting/') || pathname.includes('/app/resume/')) {
      setIsMenuOpen(false)
    } else {
      setIsMenuOpen(true)
    }
  }, [pathname])

  const menus = [
    { title: t('Menus.Home'), link: '/app', icon: <IconHome className="w-5 h-5" /> },
    {
      title: t('Menus.Copywriting'),
      link: '/app/copywriting',
      icon: <IconPencil className="w-5 h-5" />,
    },
    {
      title: t('Menus.Resume'),
      link: '/app/resume',
      icon: <IconFileCv className="w-5 h-5" />,
    },
    {
      title: t('Menus.Chat'),
      link: '/app/chat',
      icon: <IconMessage2Bolt className="w-5 h-5" />,
    },
    { title: t('Menus.Dashboard'), link: '/app/dashboard', icon: <IconDashboard className="w-5 h-5" /> },
    { title: t('Menus.History'), link: '/app/history', icon: <IconHistory className="w-5 h-5" /> },
    { title: t('Menus.Settings'), link: '/app/settings', icon: <IconSettings className="w-5 h-5" /> },
  ]

  useEffect(() => {
    if (user) {
      setLoading(true)
      getUserProfile()
        .then(res => {
          setUser(res)
          setLoading(false)
        })
        .catch(() => {
          resetUser()
          removeUserToken()
          router.push(`/login?returnUrl=${pathname}`)
        })
    }
  }, [])

  if (loading) return null

  return (
    <main className="dark:bg-popover bg-white">
      <div className="hidden md:block">
        <AppSiderBar menus={menus} isOpen={isMenuOpen} setOpen={setIsMenuOpen} />
      </div>

      <div className="block md:hidden">
        <AppHeader menus={user ? menus : [menus[0]]} />
      </div>

      <div
        className={clsx('md:py-3 md:pe-3 transition-all duration-200 ease-in-out', {
          'md:ps-[100px]': !isMenuOpen,
          'md:ps-[250px]': isMenuOpen,
        })}
      >
        <div className={clsx('bg-popover dark:bg-background rounded-xl shadow-inner min-h-[calc(100vh-24px)]')}>
          {children}
        </div>
      </div>
    </main>
  )
}
