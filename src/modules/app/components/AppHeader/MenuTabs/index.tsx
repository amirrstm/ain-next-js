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

  return (
    <>
      <div
        className={cn(
          'flex flex-row items-center justify-start [perspective:1000px] relative',
          'overflow-x-auto overflow-y-visible sm:overflow-visible no-visible-scrollbar max-w-full w-full py-2 px-2',
        )}
      >
        {propTabs.map((tab, idx) => (
          <Link
            key={tab.title}
            href={tab.link}
            onMouseLeave={() => setHoverTab(-1)}
            onMouseEnter={() => setHoverTab(idx)}
            style={{ transformStyle: 'preserve-3d' }}
            className={cn('relative px-4 py-2 rounded-md text-sm flex items-center gap-2', {
              'text-neutral-500': pathname !== tab.link,
              'text-primary': pathname === tab.link,
            })}
          >
            {hoverTab === idx && (
              <motion.div
                layoutId="clickedButton"
                transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
                className={cn('absolute inset-0 bg-gray-200 dark:bg-zinc-800 rounded-md ')}
              />
            )}

            {pathname === tab.link && (
              <motion.div
                layoutId="clickedLine"
                transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
                className={cn('absolute -bottom-[9px] left-0 right-0 h-[1px] bg-primary')}
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
