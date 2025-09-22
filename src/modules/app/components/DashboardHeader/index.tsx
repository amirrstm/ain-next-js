'use client'

import { IconSend2 } from '@tabler/icons-react'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { TypeAnimation } from 'react-type-animation'

import type React from 'react'

const DashboardHeader: React.FC = () => {
  const { resolvedTheme } = useTheme()
  const t = useTranslations('Layout')

  return (
    <div
      className={clsx(
        'rounded-2xl bg-center bg-cover bg-secondary bg-no-repeat px-3 py-6 md:px-6 md:py-16',
        'bg-[url("https://res.cloudinary.com/dwwcd5u9v/image/upload/v1708678667/images/hero-screen.svg")]',
        resolvedTheme === 'light' && 'contrast-[0.9] grayscale hue-rotate-[180deg] invert'
      )}
    >
      <div className="flex flex-col items-center justify-center">
        <p className="text-gray-200 text-sm">{t('Dashboard.Welcome')}</p>

        <h2 className="mt-2 text-lg text-white md:text-2xl">{t('Dashboard.CreateNew')}</h2>
      </div>

      <div className="mt-6 flex justify-center">
        <div className="flex w-full max-w-xl items-center gap-3 rounded-md bg-[#ffffff0d] px-3 py-2">
          <div className="flex-1">
            <TypeAnimation
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
                2000
              ]}
              style={{ color: '#ffffffcd', display: 'inline-block', fontSize: '1em' }}
              wrapper="span"
            />
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#ffffff22]">
            <IconSend2 className="h-5 w-5 rotate-0 text-white rtl:rotate-180" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardHeader
