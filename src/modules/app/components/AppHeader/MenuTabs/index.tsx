'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

import { Link, usePathname } from '@/components/ui/navigation'
import { cn } from '@/lib/utils'

type Tab = {
  title: string
  link: string
  icon: React.ReactNode
}

export const MenuTabs = ({ tabs: propTabs }: { tabs: Tab[] }) => {
  const pathname = usePathname()
  const [hoverTab, setHoverTab] = useState<number>(-1)

  const isSamePage = (link: string) => (link === '/app' ? pathname === link : pathname.includes(link))

  return (
    <>
      <div
        className={cn(
          'relative flex flex-row items-center justify-start [perspective:1000px]',
          'no-visible-scrollbar w-full max-w-full overflow-x-auto overflow-y-visible px-2 py-2 sm:overflow-visible'
        )}
      >
        {propTabs.map((tab, idx) => (
          <Link
            className={cn('relative flex items-center gap-2 rounded-md px-4 py-2 text-sm', {
              'text-neutral-500': !isSamePage(tab.link),
              'text-primary': isSamePage(tab.link)
            })}
            href={tab.link}
            key={tab.title}
            onMouseEnter={() => setHoverTab(idx)}
            onMouseLeave={() => setHoverTab(-1)}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {hoverTab === idx && (
              <motion.div
                className={cn('absolute inset-0 rounded-md bg-gray-200 dark:bg-zinc-800')}
                layoutId="clickedButton"
                transition={{ bounce: 0.3, duration: 0.6, type: 'spring' }}
              />
            )}

            {isSamePage(tab.link) && (
              <motion.div
                className={cn('-bottom-[9px] absolute right-0 left-0 h-[1px] bg-primary')}
                layoutId="clickedLine"
                transition={{ bounce: 0.3, duration: 0.6, type: 'spring' }}
              />
            )}

            <span className="relative">{tab.icon}</span>
            <span className="relative flex-1 text-nowrap">{tab.title}</span>
          </Link>
        ))}
      </div>
    </>
  )
}
