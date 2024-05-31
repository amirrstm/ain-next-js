'use client'

import { IconArrowLeft, IconProgress } from '@tabler/icons-react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  loading?: boolean
  onRequestSubmit: () => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ loading, className, type, onRequestSubmit, ...props }, ref) => {
    const radius = 100
    const [visible, setVisible] = React.useState(false)

    let mouseX = useMotionValue(0)
    let mouseY = useMotionValue(0)

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      let { left, top } = currentTarget.getBoundingClientRect()

      mouseX.set(clientX - left)
      mouseY.set(clientY - top)
    }
    return (
      <motion.div
        style={{
          background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px,
          hsl(var(--primary)),
          transparent 80%
        )
      `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="p-[2px] rounded-full transition duration-300 group/input relative"
      >
        <input
          type={type}
          className={cn(
            `flex h-10 w-full border-none bg-gray-50 dark:bg-black text-black dark:text-white shadow-input rounded-full px-3 py-2 text-sm
          file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder:text-neutral-600 
          focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
           disabled:cursor-not-allowed disabled:opacity-50
           dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
           group-hover/input:shadow-none transition duration-400
           `,
            className,
          )}
          ref={ref}
          {...props}
        />

        <div
          onClick={onRequestSubmit}
          className="absolute w-7 h-7 rounded-full cursor-pointer flex items-center justify-center border border-neutral-400 top-1/2 -translate-y-1/2 left-2"
        >
          {loading ? (
            <IconProgress className="animate-spin w-4 h-4" />
          ) : (
            <IconArrowLeft className="w-4 h-4 text-neutral-400" />
          )}
        </div>
      </motion.div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
