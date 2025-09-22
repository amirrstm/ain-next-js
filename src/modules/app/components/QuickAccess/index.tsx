'use client'

import { IconGridDots } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { Link } from '@/components/ui/navigation'
import IconChat from '@/icons/menus/chat'
import IconCopywriting from '@/icons/menus/copywriting'
import IconResume from '@/icons/menus/resume'
import { cn } from '@/lib/utils'

import type React from 'react'

const QuickAccess: React.FC = () => {
  const t = useTranslations('Layout')

  const menus = [
    {
      description: t('Dashboard.Access.Copywriting.Description'),
      icon: (
        <div className="h-7 w-7">
          <IconCopywriting />
        </div>
      ),
      link: '/app/copywriting',
      title: t('Dashboard.Access.Copywriting.Title')
    },
    {
      description: t('Dashboard.Access.Resume.Description'),
      icon: (
        <div className="h-7 w-7">
          <IconResume />
        </div>
      ),
      link: '/app/resume',
      title: t('Dashboard.Access.Resume.Title')
    },
    {
      description: t('Dashboard.Access.Chat.Description'),
      icon: (
        <div className="h-7 w-7">
          <IconChat />
        </div>
      ),
      link: '/app/chat',
      title: t('Dashboard.Access.Chat.Title')
    }
  ]

  return (
    <div className="mt-4 md:mt-10">
      <p className="flex items-center gap-2">
        <IconGridDots className="h-4 w-4 text-primary md:h-7 md:w-7" />
        <span className="text-base md:text-xl">{t('Dashboard.Access.QuickAccess')}</span>
      </p>

      <div className="mt-6 grid grid-cols-12 gap-4">
        {menus.map((menu, index) => (
          <div className="group col-span-4" key={index}>
            <HoverBorderGradient href={menu.link}>
              <div className="p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-muted transition-all duration-200 ease-in-out group-hover:border-2 group-hover:border-primary">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground dark:bg-secondary">
                    {menu.icon}
                  </div>
                </div>

                <div className="mt-4">
                  <p className="font-semibold text-lg">{menu.title}</p>
                  <p className="mt-1 text-neutral-600 text-xs leading-relaxed dark:text-neutral-500">{menu.description}</p>
                </div>
              </div>
            </HoverBorderGradient>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuickAccess

type Direction = 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT'

export function HoverBorderGradient({
  children,
  className,
  href,
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    href: string
    duration?: number
    clockwise?: boolean
  } & React.HTMLAttributes<HTMLElement>
>) {
  const [hovered, setHovered] = useState<boolean>(false)
  const [direction, setDirection] = useState<Direction>('TOP')

  const rotateDirection = (currentDirection: Direction): Direction => {
    const directions: Direction[] = ['TOP', 'LEFT', 'BOTTOM', 'RIGHT']
    const currentIndex = directions.indexOf(currentDirection)
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length
    return directions[nextIndex]
  }

  const movingMap: Record<Direction, string> = {
    BOTTOM: 'radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)',
    LEFT: 'radial-gradient(16.6% 43.1% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)',
    RIGHT: 'radial-gradient(16.2% 41.199999999999996% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)',
    TOP: 'radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)'
  }

  const highlight = 'radial-gradient(75% 181.15942028985506% at 50% 50%, #3275F8 0%, rgba(255, 255, 255, 0) 100%)'

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState))
      }, duration * 1000)
      return () => clearInterval(interval)
    }
  }, [hovered, duration, rotateDirection])

  return (
    <Link
      className={cn(
        'relative flex content-center rounded-xl border border-muted bg-black/20 transition duration-500 hover:bg-black/10',
        'h-min w-full flex-col flex-nowrap justify-center gap-10 overflow-visible decoration-clone p-px dark:bg-white/20'
      )}
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      <div className={cn('z-10 w-auto rounded-xl bg-card px-4 py-2', className)}>{children}</div>

      <motion.div
        animate={{
          background: hovered ? [movingMap[direction], highlight] : movingMap[direction]
        }}
        className={cn('absolute inset-0 z-0 flex-none overflow-hidden rounded-xl')}
        initial={{ background: movingMap[direction] }}
        style={{
          filter: 'blur(2px)',
          height: '100%',
          position: 'absolute',
          width: '100%'
        }}
        transition={{ duration: duration ?? 1, ease: 'linear' }}
      />
      <div className="absolute inset-[1px] z-1 flex-none rounded-xl bg-black" />
    </Link>
  )
}
