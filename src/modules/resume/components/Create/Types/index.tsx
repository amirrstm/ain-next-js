import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import { cn } from '@/lib/utils'

import AI from './icons/ai'
import Custom from './icons/custom'
import Voice from './icons/voice'

const ResumeTypes = ({
  items,
  onSelect
}: {
  onSelect: (id: string) => void
  items: {
    id: string
    title: string
    description: string
  }[]
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className={cn('grid grid-cols-1 py-4 md:grid-cols-2 md:py-10 lg:grid-cols-3')}>
      {items.map((item, idx) => (
        <div
          className="group relative block h-full w-full cursor-pointer p-2"
          key={item?.id}
          onClick={() => onSelect(item.id)}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                className="absolute inset-0 block h-full w-full rounded-3xl bg-neutral-200 dark:bg-slate-800/[0.8]"
                exit={{ opacity: 0, transition: { delay: 0.2, duration: 0.15 } }}
                initial={{ opacity: 0 }}
                layoutId="hoverBackground"
              />
            )}
          </AnimatePresence>
          <Card>
            {item.id === 'voice' && (
              <CardImage>
                <Voice />
              </CardImage>
            )}

            {item.id === 'ai' && (
              <CardImage>
                <AI />
              </CardImage>
            )}

            {item.id === 'custom' && (
              <CardImage>
                <Custom />
              </CardImage>
            )}
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </div>
      ))}
    </div>
  )
}

export default ResumeTypes

export const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        'relative z-20 h-full w-full overflow-hidden rounded-2xl border border-transparent bg-neutral-50 p-2 shadow-md group-hover:border-slate-700 dark:border-white/[0.2] dark:bg-black',
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-1">{children}</div>
      </div>
    </div>
  )
}

export const CardTitle = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return (
    <h4 className={cn('mt-4 text-center font-bold text-zinc-700 tracking-wide md:text-lg dark:text-zinc-100', className)}>
      {children}
    </h4>
  )
}
export const CardDescription = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return (
    <p className={cn('mt-2 text-center text-xs text-zinc-400 leading-relaxed tracking-wide md:text-sm', className)}>{children}</p>
  )
}
export const CardImage = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center md:p-4">
      <div className={cn('flex h-20 w-20 items-center justify-center md:h-44 md:w-44', className)}>{children}</div>
    </div>
  )
}
