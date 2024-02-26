import clsx, { ClassValue } from 'clsx'
import React from 'react'

import Link from './link'

interface Props {
  lng: string
  link: string
  icon: React.ReactNode
  title: React.ReactNode
  className?: ClassValue
}

const DashboardMenu: React.FC<Props> = ({ lng, link, className, icon, title }) => {
  return (
    <Link
      lng={lng as string}
      href={link}
      className={clsx(
        'flex items-center gap-4 px-4 py-2 rounded-md border border-white hover:border-gray-100 hover:bg-gray-50 hover:text-primary',
        className,
      )}
    >
      {icon}
      {title}
    </Link>
  )
}

export default DashboardMenu
