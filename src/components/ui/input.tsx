import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, inputSize = 'default', ...props }, ref) => {
  const sizes: Record<string, string> = {
    default: 'h-10 text-sm',
    sm: 'h-8 text-xs'
  }

  return (
    <input
      className={cn(
        'placeholder:text-[#d9d9d9]',
        'flex w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background',
        'bg-card dark:border-input dark:text-white dark:ring-offset-card dark:placeholder:text-neutral-600',
        'file:border-0 file:bg-transparent file:font-medium file:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        sizes[inputSize],
        className
      )}
      ref={ref}
      type={type}
      {...props}
    />
  )
})
Input.displayName = 'Input'

export { Input }
