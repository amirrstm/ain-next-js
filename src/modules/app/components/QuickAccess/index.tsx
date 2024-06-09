'use client'

import { useTranslations } from 'next-intl'

import { IconFileCv, IconGridDots, IconHistory, IconMessage2Bolt, IconPencil } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

import { Link } from '@/components/ui/navigation'

import { cn } from '@/lib/utils'

const QuickAccess: React.FC = () => {
  const t = useTranslations('Layout')

  const menus = [
    {
      title: t('Dashboard.Access.Copywriting.Title'),
      link: '/app/copywriting',
      icon: <IconPencil className="text-white w-5 h-5" />,
      description: t('Dashboard.Access.Copywriting.Description'),
    },
    {
      title: t('Dashboard.Access.Resume.Title'),
      link: '/app/resume',
      icon: <IconFileCv className="text-white w-5 h-5" />,
      description: t('Dashboard.Access.Resume.Description'),
    },
    {
      title: t('Dashboard.Access.Chat.Title'),
      link: '/app/chat',
      icon: <IconMessage2Bolt className="text-white w-5 h-5" />,
      description: t('Dashboard.Access.Chat.Description'),
    },
  ]

  return (
    <div className="mt-4 md:mt-10">
      <p className="flex items-center gap-2">
        <IconGridDots className="w-4 h-4 md:w-7 md:h-7 text-primary" />
        <span className="text-base md:text-xl">{t('Dashboard.Access.QuickAccess')}</span>
      </p>

      <div className="grid grid-cols-12 gap-4 mt-6">
        {menus.map((menu, index) => (
          <div key={index} className="col-span-4 group">
            <HoverBorderGradient href={menu.link}>
              <div className="p-4">
                <div className="border border-muted w-12 h-12 rounded-lg flex justify-center items-center group-hover:border-primary group-hover:border-2 transition-all duration-200 ease-in-out">
                  <div className="w-10 h-10 bg-foreground dark:bg-secondary rounded-lg flex items-center justify-center">
                    {menu.icon}
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-lg font-semibold">{menu.title}</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-500 mt-1 leading-relaxed">
                    {menu.description}
                  </p>
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
    TOP: 'radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)',
    LEFT: 'radial-gradient(16.6% 43.1% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)',
    BOTTOM: 'radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)',
    RIGHT: 'radial-gradient(16.2% 41.199999999999996% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)',
  }

  const highlight = 'radial-gradient(75% 181.15942028985506% at 50% 50%, #3275F8 0%, rgba(255, 255, 255, 0) 100%)'

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection(prevState => rotateDirection(prevState))
      }, duration * 1000)
      return () => clearInterval(interval)
    }
  }, [hovered])

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'relative flex rounded-xl border border-muted content-center bg-black/20 hover:bg-black/10 transition duration-500',
        'dark:bg-white/20 flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px decoration-clone w-full',
      )}
      {...props}
    >
      <div className={cn('w-auto z-10 bg-card px-4 py-2 rounded-xl', className)}>{children}</div>

      <motion.div
        className={cn('flex-none inset-0 overflow-hidden rounded-xl absolute z-0 ')}
        style={{
          width: '100%',
          filter: 'blur(2px)',
          height: '100%',
          position: 'absolute',
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered ? [movingMap[direction], highlight] : movingMap[direction],
        }}
        transition={{ ease: 'linear', duration: duration ?? 1 }}
      />
      <div className="bg-black absolute z-1 flex-none inset-[1px] rounded-xl" />
    </Link>
  )
}
