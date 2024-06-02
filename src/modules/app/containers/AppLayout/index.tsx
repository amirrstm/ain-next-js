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

export default function AppLayoutContainer({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('Layout')

  const { user, setUser, reset: resetUser } = useUserStore()
  const [loading, setLoading] = useState(false)

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
          removeUserToken()
          resetUser()
          router.push(`/login?returnUrl=${pathname}`)
        })
    }
  }, [])

  if (loading) return null

  return (
    <main className="">
      <AppHeader menus={user ? menus : [menus[0]]} />

      <div className={clsx('bg-background max-w-[1248px] mx-auto')}>{children}</div>
    </main>
  )
}
