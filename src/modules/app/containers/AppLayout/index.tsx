'use client'

import clsx from 'clsx'
import { useTranslations } from 'next-intl'
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
      icon: (
        <div className="flex h-6 w-6">
          <IconHome />
        </div>
      ),
      link: '/app',
      title: t('Menus.Home')
    },
    {
      icon: (
        <div className="flex h-6 w-6">
          <IconCopywriting />
        </div>
      ),
      link: '/app/copywriting',
      title: t('Menus.Copywriting')
    },
    {
      icon: (
        <div className="flex h-6 w-6">
          <IconResume />
        </div>
      ),
      link: '/app/resume',
      title: t('Menus.Resume')
    },
    {
      icon: (
        <div className="flex h-6 w-6">
          <IconChat />
        </div>
      ),
      link: '/app/chat',
      title: t('Menus.Chat')
    },
    {
      icon: (
        <div className="flex h-6 w-6">
          <IconDashboard />
        </div>
      ),
      link: '/app/dashboard',
      title: t('Menus.Dashboard')
    },
    {
      icon: (
        <div className="flex h-6 w-6">
          <IconHistory />
        </div>
      ),
      link: '/app/history',
      title: t('Menus.History')
    },
    {
      icon: (
        <div className="flex h-6 w-6">
          <IconSettings />
        </div>
      ),
      link: '/app/settings',
      title: t('Menus.Settings')
    }
  ]

  useEffect(() => {
    if (user) {
      setLoading(true)
      getUserProfile()
        .then((res) => {
          setUser(res)
          setLoading(false)
        })
        .catch(() => {
          resetUser()
          removeUserToken()
          router.push(`/login?returnUrl=${pathname}`)
        })
    }
  }, [pathname, resetUser, router.push, setUser, user])

  if (loading) return null

  return (
    <main className="bg-white dark:bg-popover">
      <div className="hidden md:block">
        <AppSiderBar isOpen={isMenuOpen} menus={menus} setOpen={setIsMenuOpen} />
      </div>

      <div
        className={clsx(
          'fixed top-0 right-0 h-screen w-full bg-background/80 transition-all duration-300 ease-in-out dark:bg-background/50',
          {
            '-z-[100] opacity-0': !isMobileMenuOpen,
            'z-[100] opacity-100': isMobileMenuOpen
          }
        )}
      >
        <div
          className={clsx('fixed h-screen w-[250px] bg-background shadow-xl transition-all duration-300 ease-in-out', {
            '-start-[250px]': !isMobileMenuOpen,
            'start-0': isMobileMenuOpen
          })}
          ref={menuRef}
        >
          <AppSiderBar isOpen={true} menus={menus} setOpen={setIsMenuOpen} />
        </div>
      </div>

      <div className="block md:hidden">
        <AppHeader setOpen={() => setIsMobileMenuOpen(true)} />
      </div>

      <div
        className={clsx('transition-all duration-200 ease-in-out md:py-3 md:pe-3', {
          'md:ps-[100px]': !isMenuOpen,
          'md:ps-[250px]': isMenuOpen
        })}
      >
        <div className={clsx('min-h-[calc(100vh-24px)] rounded-xl bg-popover shadow-inner dark:bg-background')}>{children}</div>
      </div>
    </main>
  )
}
