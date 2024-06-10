import Link from 'next/link'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import { cn } from '@/lib/utils'

import AI from './icons/ai'
import Custom from './icons/custom'
import Voice from './icons/voice'

const ResumeTypes = ({
  items,
  onSelect,
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
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-4 md:py-10')}>
      {items.map((item, idx) => (
        <div
          key={item?.id}
          onClick={() => onSelect(item.id)}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative group block h-full p-2 w-full cursor-pointer"
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
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
        'rounded-2xl h-full w-full p-2 overflow-hidden bg-neutral-50 shadow-md dark:bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20',
        className,
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
    <h4
      className={cn('text-zinc-700 dark:text-zinc-100 font-bold tracking-wide md:text-lg mt-4 text-center', className)}
    >
      {children}
    </h4>
  )
}
export const CardDescription = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return (
    <p className={cn('mt-2 text-zinc-400 tracking-wide leading-relaxed text-xs md:text-sm text-center', className)}>
      {children}
    </p>
  )
}
export const CardImage = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center md:p-4">
      <div className={cn('w-20 md:w-44 h-20 md:h-44 flex items-center justify-center', className)}>{children}</div>
    </div>
  )
}
