import clsx, { ClassValue } from 'clsx'
import React from 'react'

import { Link } from './navigation'

interface Props {
  link?: string
  onClick?: () => void
  icon: React.ReactNode
  title: React.ReactNode
  className?: ClassValue
}

const DashboardMenu: React.FC<Props> = ({ link, className, icon, title, onClick }) => {
  if (onClick)
    return (
      <div
        onClick={onClick}
        className={clsx(
          'flex items-center cursor-pointer gap-4 px-4 py-2 rounded-md',
          'border border-background hover:border-muted-foreground hover:bg-card hover:text-primary dark:hover:text-primary',
          className,
        )}
      >
        {icon}
        {title}
      </div>
    )

  return (
    <Link
      href={link as string}
      className={clsx(
        'flex items-center cursor-pointer gap-4 px-4 py-2 rounded-md',
        'border border-background hover:border-muted-foreground hover:bg-card hover:text-primary dark:hover:text-primary',
        className,
      )}
    >
      {icon}
      {title}
    </Link>
  )
}

export default DashboardMenu
