import * as React from 'react'

import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size = 'default', ...props }, ref) => {
    const sizes: Record<string, string> = {
      sm: 'text-xs',
      default: 'text-sm',
    }

    return (
      <textarea
        className={cn(
          'border-input bg-card dark:text-white dark:placeholder:text-neutral-600 dark:ring-offset-card dark:leading-5',
          'flex min-h-[80px] w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-neutral-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          sizes[size],
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Textarea.displayName = 'Textarea'

export { Textarea }
