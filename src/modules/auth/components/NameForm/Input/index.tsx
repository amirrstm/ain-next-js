'use client'

import { IconArrowLeft, IconProgress } from '@tabler/icons-react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  loading?: boolean
  onRequestSubmit: () => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ loading, className, type, onRequestSubmit, ...props }, ref) => {
  const radius = 100
  const [visible, setVisible] = React.useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({
    clientX,
    clientY,
    currentTarget
  }: {
    clientX: number
    clientY: number
    currentTarget: HTMLElement
  }) {
    const { left, top } = currentTarget.getBoundingClientRect()

    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }
  return (
    <motion.div
      className="group/input relative rounded-full p-[2px] transition duration-300"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onMouseMove={handleMouseMove}
      style={{
        background: useMotionTemplate`
        radial-gradient(
          ${visible ? `${radius}px` : '0px'} circle at ${mouseX}px ${mouseY}px,
          hsl(var(--primary)),
          transparent 80%
        )
      `
      }}
    >
      <input
        className={cn(
          `flex h-10 w-full rounded-full border-none bg-gray-50 px-3 py-2 text-black text-sm shadow-input transition duration-400 file:font-medium file:text-sm placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 group-hover/input:shadow-none dark:bg-black dark:text-white dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] dark:focus-visible:ring-neutral-600 dark:placeholder:text-neutral-600`,
          className
        )}
        ref={ref}
        type={type}
        {...props}
      />

      <div
        className="-translate-y-1/2 absolute end-2 top-1/2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-neutral-400"
        onClick={onRequestSubmit}
      >
        {loading ? (
          <IconProgress className="h-4 w-4 animate-spin" />
        ) : (
          <IconArrowLeft className="h-4 w-4 rotate-180 text-neutral-400 rtl:rotate-0" />
        )}
      </div>
    </motion.div>
  )
})
Input.displayName = 'Input'

export { Input }
