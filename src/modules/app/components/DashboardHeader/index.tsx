'use client'

import { useTranslations } from 'next-intl'

import { IconSend2 } from '@tabler/icons-react'
import clsx from 'clsx'
import React from 'react'
import { TypeAnimation } from 'react-type-animation'

const DashboardHeader: React.FC = () => {
  const t = useTranslations('Layout')

  return (
    <div
      className={clsx(
        'bg-secondary bg-no-repeat bg-cover bg-center rounded-2xl py-6 md:py-16 px-3 md:px-6',
        'bg-[url("https://res.cloudinary.com/dwwcd5u9v/image/upload/v1708678667/images/hero-screen.svg")]',
      )}
    >
      <div className="flex flex-col items-center justify-center">
        <p className="text-sm text-gray-200">{t('Dashboard.Welcome')}</p>

        <h2 className="text-white text-lg md:text-2xl mt-2">{t('Dashboard.CreateNew')}</h2>
      </div>

      <div className="flex justify-center mt-6">
        <div className="flex items-center gap-3 max-w-xl w-full px-3 py-2 bg-[#ffffff0d] rounded-md">
          <div className="flex-1">
            <TypeAnimation
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              sequence={[
                t('Dashboard.Messages.First'),
                2000,
                t('Dashboard.Messages.Second'),
                2000,
                t('Dashboard.Messages.Third'),
                2000,
                t('Dashboard.Messages.Forth'),
                2000,
              ]}
              style={{ fontSize: '1em', display: 'inline-block', color: '#ffffffcd' }}
            />
          </div>

          <div className="w-9 h-9 flex items-center justify-center bg-[#ffffff22] rounded-md">
            <IconSend2 className="w-5 h-5 rotate-180 text-white" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardHeader
