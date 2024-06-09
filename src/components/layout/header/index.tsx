'use client'

import { useTranslations } from 'next-intl'

import { IconSparkles } from '@tabler/icons-react'
import clsx from 'clsx'

import ThemeMode from '@/components/theme'
import { Button } from '@/components/ui/button'
import { Link } from '@/components/ui/navigation'

import AppLogo from '@/icons/logo'
import useUserStore from '@/lib/store/auth'

type Props = { dark?: boolean }
const Header: React.FC<Props> = () => {
  const { user } = useUserStore()
  const t = useTranslations('Layout')

  return (
    <header className="bg-background/40 dark:bg-background/30 px-8 h-20 flex items-center relative border-b z-10">
      <nav className={clsx('flex justify-between items-center w-full')}>
        <div className="flex items-center gap-3">
          <Link href="/" className="relative w-[140px] h-7 sm:h-10 flex pb-1">
            <AppLogo fill="hsl(var(--foreground))" />
          </Link>
        </div>

        {/* <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex gap-12">
          <Link href={'/use-cases'} className="">
            {t('Header.UseCases')}
          </Link>

          <Link href={'/pricing'} className="">
            {t('Header.Pricing')}
          </Link>

          <Link href={'/about'} className="">
            {t('Header.About')}
          </Link>
        </div> */}

        <div className="flex gap-3 items-center">
          <ThemeMode />

          <Link href={user ? '/app' : '/login'}>
            <Button className="rounded-full px-6 gap-2">
              <IconSparkles />
              {user ? t('Header.OpenApp') : t('Header.SignUp')}
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
