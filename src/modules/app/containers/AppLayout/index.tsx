'use client'

import { useTranslations } from 'next-intl'

import clsx from 'clsx'
import React, { useEffect, useState } from 'react'

import { usePathname, useRouter } from '@/components/ui/navigation'

import IconChat from '@/icons/menus/chat'
import IconCopywriting from '@/icons/menus/copywriting'
import IconDashboard from '@/icons/menus/dashboard'
import IconHistory from '@/icons/menus/history'
import IconHome from '@/icons/menus/home'
import IconResume from '@/icons/menus/resume'
import IconSettings from '@/icons/menus/settings'
import useUserStore from '@/lib/store/auth'
import { getUserProfile } from '@/modules/auth/services'
import { removeUserToken } from '@/modules/auth/utils'

import AppHeader from '../../components/AppHeader'
import AppSiderBar from '../../components/AppSideBar'

export default function AppLayoutContainer({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('Layout')
  const menuRef = React.useRef<HTMLDivElement>(null)

  const { user, setUser, reset: resetUser } = useUserStore()
  const [loading, setLoading] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (pathname.includes('/app/resume/')) {
      setIsMenuOpen(false)
    } else {
      setIsMenuOpen(true)
    }
  }, [pathname])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [isMobileMenuOpen])

  const menus = [
    {
      title: t('Menus.Home'),
      link: '/app',
      icon: (
        <div className="flex w-6 h-6">
          <IconHome />
        </div>
      ),
    },
    {
      title: t('Menus.Copywriting'),
      link: '/app/copywriting',
      icon: (
        <div className="flex w-6 h-6">
          <IconCopywriting />
        </div>
      ),
    },
    {
      title: t('Menus.Resume'),
      link: '/app/resume',
      icon: (
        <div className="flex w-6 h-6">
          <IconResume />
        </div>
      ),
    },
    {
      title: t('Menus.Chat'),
      link: '/app/chat',
      icon: (
        <div className="flex w-6 h-6">
          <IconChat />
        </div>
      ),
    },
    {
      title: t('Menus.Dashboard'),
      link: '/app/dashboard',
      icon: (
        <div className="flex w-6 h-6">
          <IconDashboard />
        </div>
      ),
    },
    {
      title: t('Menus.History'),
      link: '/app/history',
      icon: (
        <div className="flex w-6 h-6">
          <IconHistory />
        </div>
      ),
    },
    {
      title: t('Menus.Settings'),
      link: '/app/settings',
      icon: (
        <div className="flex w-6 h-6">
          <IconSettings />
        </div>
      ),
    },
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

      <div
        className={clsx(
          'fixed right-0 top-0 w-full h-screen bg-background/80 dark:bg-background/50 transition-all duration-300 ease-in-out',
          {
            'opacity-0 -z-[100]': !isMobileMenuOpen,
            'opacity-100 z-[100]': isMobileMenuOpen,
          },
        )}
      >
        <div
          ref={menuRef}
          className={clsx('w-[250px] fixed bg-background h-screen transition-all duration-300 ease-in-out shadow-xl', {
            'start-0': isMobileMenuOpen,
            '-start-[250px]': !isMobileMenuOpen,
          })}
        >
          <AppSiderBar menus={menus} isOpen={true} setOpen={setIsMenuOpen} />
        </div>
      </div>

      <div className="block md:hidden">
        <AppHeader setOpen={() => setIsMobileMenuOpen(true)} />
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
