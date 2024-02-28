'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'

import clsx from 'clsx'
import { Sparkle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import Link from '@/components/ui/link'

import { useTranslation } from '@/app/i18n/client'

type Props = { dark?: boolean }
const Header: React.FC<Props> = ({ dark = true }) => {
  const { lng } = useParams()
  const { t } = useTranslation(lng as string, 'Layout')

  return (
    <header className="fixed top-2 sm:top-5 left-0 w-full z-50 px-1">
      <div
        className={clsx(
          'border',
          dark ? 'border-gray-800 text-background' : 'border-gray-200',
          'flex justify-between backdrop-blur-2xl max-w-3xl mx-auto items-center rounded-full py-3 px-6',
        )}
        style={{ background: dark ? 'rgba(15, 15, 15, 0.6)' : 'rgba(255, 255, 255, 0.6)' }}
      >
        <div className="relative h-7 sm:h-8">
          <Image
            alt="logo"
            width={200}
            height={200}
            className="w-full h-full object-contain"
            src={dark ? '/images/main-logo.png' : '/images/logo-black.png'}
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-end gap-6">
            <div className="hidden sm:gap-6 sm:items-center sm:flex">
              <Link lng={lng as string} href={'/about'}>
                {t('Header.About')}
              </Link>

              <Link lng={lng as string} href={'/pricing'}>
                {t('Header.Pricing')}
              </Link>

              <Link lng={lng as string} href={'/login'}>
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
