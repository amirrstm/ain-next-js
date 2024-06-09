'use client'

import { IconMenu } from '@tabler/icons-react'
import clsx from 'clsx'
import React from 'react'

import DashboardMenu from '@/components/ui/dashboard-menu'
import { Link, usePathname } from '@/components/ui/navigation'

import AppLogo from '@/icons/logo'
import IconLogoSmall from '@/icons/logo-small'

import UserProfile from './UserProfile'

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
  const pathname = usePathname()

  const isSamePage = (link: string) => (link === '/app' ? pathname === link : pathname.includes(link))

  return (
    <div
      className={clsx(
        'p-5 fixed right-0 top-0 bottom-0 w-full h-full overflow-y-auto flex flex-col justify-between',
        'transition-all duration-200 ease-in-out',
        {
          'max-w-[95px]': !isOpen,
          'max-w-[250px]': isOpen,
        },
      )}
    >
      <div>
        {isOpen ? (
          <div className="flex items-center justify-between">
            <Link href="/app" className="flex">
              <div className={clsx('relative w-[100px] md:w-[120px] h-6 sm:h-9')}>
                <AppLogo fill="hsl(var(--foreground))" />
              </div>
            </Link>

            <IconMenu className="w-5 h-5 cursor-pointer" onClick={() => setOpen(false)} />
          </div>
        ) : (
          <div onClick={() => setOpen(true)} className={clsx('relative flex w-full justify-center cursor-pointer')}>
            <IconLogoSmall fill="hsl(var(--foreground))" bg="hsl(var(--background))" />
          </div>
        )}

        <div className="mt-8 space-y-4">
          {menus.map((menu, index) => (
            <DashboardMenu
              key={index}
              link={menu.link}
              icon={menu.icon}
              title={isOpen ? <span className="text-[15px]">{menu.title}</span> : undefined}
              className={{
                'bg-neutral-50 dark:bg-card !border-muted text-primary font-medium': isSamePage(menu.link),
                'font-light': !isSamePage(menu.link),
              }}
            />
          ))}
        </div>
      </div>

      <UserProfile isOpen={isOpen} />
    </div>
  )
}

export default AppSiderBar
