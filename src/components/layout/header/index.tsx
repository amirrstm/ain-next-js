'use client'

import Image from 'next/image'

import clsx from 'clsx'
import { Sparkle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import Link from '@/components/ui/link'

import { useTranslation } from '@/app/i18n/client'

type Props = { lng: string }
const Header: React.FC<Props> = ({ lng }) => {
  const { t } = useTranslation(lng, 'Layout')

  return (
    <header className="fixed top-2 sm:top-5 left-0 w-full z-50 px-1">
      <div
        className={clsx(
          'border border-gray-800',
          'flex justify-between backdrop-blur-2xl text-background max-w-3xl mx-auto items-center rounded-full py-3 px-6',
        )}
        style={{ background: 'rgba(15, 15, 15, 0.6)' }}
      >
        <div className="relative h-7 sm:h-8">
          <Image
            alt="logo"
            width={200}
            height={200}
            src="/images/main-logo.png"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-end gap-6">
            <div className="hidden sm:gap-6 sm:items-center sm:flex">
              <Link lng={lng} href={'/about'}>
                {t('Header.About')}
              </Link>

              <Link lng={lng} href={'/pricing'}>
                {t('Header.Pricing')}
              </Link>

              <Link lng={lng} href={'/login'}>
                {t('Header.SignIn')}
              </Link>
            </div>

            <Button className="rounded-full px-8 gap-2">
              <Sparkle />
              {t('Header.SignUp')}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
