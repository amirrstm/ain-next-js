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
  const customClass = clsx(
    'flex items-center cursor-pointer gap-4 px-4 py-2 rounded-md border border-white hover:border-gray-100 hover:bg-gray-50 hover:text-primary',
    className,
  )

  if (onClick)
    return (
      <div className={customClass} onClick={onClick}>
        {icon}
        {title}
      </div>
    )

  return (
    <Link href={link as string} className={customClass}>
      {icon}
      {title}
    </Link>
  )
}

export default DashboardMenu
