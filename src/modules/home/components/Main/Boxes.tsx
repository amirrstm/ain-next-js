'use client'

import { motion } from 'framer-motion'
import React from 'react'

import { cn } from '@/lib/utils'

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const rows = new Array(150).fill(1)
  const cols = new Array(100).fill(1)
  const colors = [
    '--sky-300',
    '--pink-300',
    '--green-300',
    '--yellow-300',
    '--red-300',
    '--purple-300',
    '--blue-300',
    '--indigo-300',
    '--violet-300'
  ]
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)]
  }

  return (
    <div
      className={cn(
        '-top-[10%] -translate-x-1/2 -translate-y-1/2 -z-[1] absolute left-1/4 flex h-full w-full bg-background p-4 opacity-15 dark:opacity-40',
        className
      )}
      dir="ltr"
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`
      }}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div className="relative h-8 w-16 border-slate-700 border-l" key={`row${i}`}>
          {cols.map((_, j) => (
            <motion.div
              animate={{ transition: { duration: 2 } }}
              className="relative h-8 w-16 border-slate-700 border-t border-r"
              key={`col${j}`}
              whileHover={{ backgroundColor: `var(${getRandomColor()})`, transition: { duration: 0 } }}
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  className="-top-[14px] -left-[22px] pointer-events-none absolute h-6 w-10 stroke-[1px] text-slate-100 dark:text-slate-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 6v12m6-6H6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  )
}

export const Boxes = React.memo(BoxesCore)
