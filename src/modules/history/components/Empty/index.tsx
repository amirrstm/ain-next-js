import { IconHistory } from '@tabler/icons-react'
import clsx from 'clsx'
import React from 'react'

const HistoryEmpty: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div
        className={clsx(
          'absolute -bottom-10 left-0 right-0 h-1/2 bg-white bg-no-repeat bg-cover bg-top  rotate-180',
          'bg-[url("https://res.cloudinary.com/dwwcd5u9v/image/upload/v1708678667/images/banner.svg")]',
        )}
      />

      <div
        className={clsx(
          'absolute -top-10  left-0 right-0 h-1/2 bg-white bg-no-repeat bg-cover bg-top ',
          'bg-[url("https://res.cloudinary.com/dwwcd5u9v/image/upload/v1708678667/images/banner.svg")]',
        )}
      />

      <div className="border shadow-md rounded-lg max-w-sm p-4 text-center z-[1]">
        <p className="text-gray-500 flex">
          <IconHistory className="text-primary" />
          <span className="flex-1 leading-relaxed">{title}</span>
        </p>
      </div>
    </div>
  )
}

export default HistoryEmpty
