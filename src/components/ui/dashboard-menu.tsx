import clsx, { type ClassValue } from 'clsx'

import { Link } from './navigation'

import type React from 'react'

interface Props {
  link?: string
  active?: boolean
  onClick?: () => void
  icon: React.ReactNode
  title?: React.ReactNode
  className?: ClassValue
}

const DashboardMenu: React.FC<Props> = ({ link, active, className, icon, title, onClick }) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onClick?.()
    }
  }

  if (onClick)
    return (
      <button
        aria-label={typeof title === 'string' ? title : 'Menu item'}
        className={clsx(
          'flex cursor-pointer items-center gap-4 rounded-md px-4 py-2',
          'border border-transparent hover:bg-card hover:text-primary hover:dark:border-muted-foreground',
          { 'text-primary': active },
          className
        )}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        type="button"
      >
        {icon}
        {title}
      </button>
    )

  return (
    <Link
      className={clsx(
        'flex cursor-pointer items-center gap-4 rounded-md px-4 py-2',
        'border border-transparent hover:border-muted hover:bg-card hover:text-primary dark:hover:text-primary',
        className
      )}
      href={link as string}
    >
      {icon}
      {title}
    </Link>
  )
}

export default DashboardMenu
