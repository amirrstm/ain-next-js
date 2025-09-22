'use client'

import { IconMenu } from '@tabler/icons-react'
import clsx from 'clsx'
import { useParams } from 'next/navigation'

import DashboardMenu from '@/components/ui/dashboard-menu'
import { Link, usePathname } from '@/components/ui/navigation'
import { AppLogo, AppLogoEn } from '@/icons/logos'
import IconLogoSmall from '@/icons/logos/logo-small'

import UserProfile from './UserProfile'

import type React from 'react'

interface Props {
  isOpen: boolean
  setOpen: (open: boolean) => void
  menus: {
    title: string
    link: string
    icon: React.ReactNode
  }[]
}

const AppSiderBar: React.FC<Props> = ({ menus, isOpen, setOpen }) => {
  const { locale } = useParams()
  const pathname = usePathname()

  const isSamePage = (link: string) => (link === '/app' ? pathname === link : pathname.includes(link))

  return (
    <div
      className={clsx(
        'flex h-full w-full flex-col justify-between overflow-y-auto p-5 md:fixed md:top-0 md:bottom-0 md:left-0 rtl:right-0',
        'transition-all duration-200 ease-in-out',
        {
          'max-w-[100px]': !isOpen,
          'max-w-[250px]': isOpen
        }
      )}
    >
      <div>
        {isOpen ? (
          <div className="flex items-center justify-between">
            <Link className="flex" href="/app">
              <div className={clsx('relative h-6 w-[100px] sm:h-9 md:w-[120px]')}>
                {locale === 'fa' ? <AppLogo fill="hsl(var(--foreground))" /> : <AppLogoEn fill="hsl(var(--foreground))" />}
              </div>
            </Link>

            <IconMenu className="hidden h-5 w-5 cursor-pointer md:block" onClick={() => setOpen(false)} />
          </div>
        ) : (
          <div className={clsx('relative flex w-full cursor-pointer justify-center')} onClick={() => setOpen(true)}>
            <div className="h-10 w-10">
              <IconLogoSmall bg="hsl(var(--popover))" fill="hsl(var(--foreground))" />
            </div>
          </div>
        )}

        <div className="mt-8 space-y-4">
          {menus.map((menu, index) => (
            <DashboardMenu
              className={{
                '!border-muted bg-neutral-50 font-medium text-primary dark:bg-card': isSamePage(menu.link),
                'font-light': !isSamePage(menu.link)
              }}
              icon={menu.icon}
              key={index}
              link={menu.link}
              title={isOpen ? <span className="text-[15px]">{menu.title}</span> : undefined}
            />
          ))}
        </div>
      </div>

      <UserProfile isOpen={isOpen} />
    </div>
  )
}

export default AppSiderBar
