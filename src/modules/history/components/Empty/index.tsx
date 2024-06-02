import { useTheme } from 'next-themes'

import { IconHistory } from '@tabler/icons-react'
import clsx from 'clsx'
import React from 'react'

const HistoryEmpty: React.FC<{ title: string }> = ({ title }) => {
  const { resolvedTheme } = useTheme()

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div
        style={{
          backgroundImage:
            resolvedTheme === 'light'
              ? 'url("/images/bg-content.svg")'
              : 'linear-gradient(rgba(15,15,15,0.7), rgba(15,15,15,0.7)),url("/images/bg-content.svg")',
        }}
        className={clsx(
          'absolute -bottom-10 left-0 right-0 h-1/2 bg-background bg-no-repeat bg-cover bg-top rotate-180',
        )}
      />

      <div
        style={{
          backgroundImage:
            resolvedTheme === 'light'
              ? 'url("/images/bg-content.svg")'
              : 'linear-gradient(rgba(15,15,15,0.7), rgba(15,15,15,0.7)),url("/images/bg-content.svg")',
        }}
        className={clsx('absolute -top-10  left-0 right-0 h-1/2 bg-background bg-no-repeat bg-cover bg-top')}
      />

      <div className="border border-muted shadow-md rounded-lg max-w-sm p-4 text-center z-[1]">
        <p className="text-gray-500 flex">
          <IconHistory className="text-primary" />
          <span className="flex-1 leading-relaxed">{title}</span>
        </p>
      </div>
    </div>
  )
}

export default HistoryEmpty
