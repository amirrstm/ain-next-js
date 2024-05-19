'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { IconSparkles } from '@tabler/icons-react'
import clsx from 'clsx'

import { Button } from '@/components/ui/button'
import { Link } from '@/components/ui/navigation'

import { LOGO_URL } from '@/constants'
import useUserStore from '@/lib/store/auth'

type Props = { dark?: boolean }
const Header: React.FC<Props> = ({ dark = true }) => {
  const { user } = useUserStore()
  const t = useTranslations('Layout')

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
        <Link href="/" className="relative w-[140px] h-7 sm:h-8 flex">
          <Image
            alt="logo"
            width={200}
            height={200}
            src={LOGO_URL}
            className={clsx('w-full h-full object-contain', {
              'grayscale invert contrast-[1] hue-rotate-[180deg]': dark,
            })}
          />
        </Link>

        <div className="flex-1">
          <div className="flex items-center justify-end gap-6">
            <div className="hidden sm:gap-6 sm:items-center sm:flex">
              <Link href={'/about'} className="text-white">
                {t('Header.About')}
              </Link>

              {!user && (
                <Link href={'/login'} className="text-white">
                  {t('Header.SignIn')}
                </Link>
              )}
            </div>

            <Link href={user ? '/app' : '/login'}>
              <Button className="rounded-full px-8 gap-2">
                <IconSparkles />
                {user ? t('Header.OpenApp') : t('Header.SignUp')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
