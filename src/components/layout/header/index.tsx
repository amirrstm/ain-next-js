'use client'

import { IconSparkles } from '@tabler/icons-react'
import clsx from 'clsx'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import ThemeMode from '@/components/theme'
import { Link } from '@/components/ui/navigation'
import { AppLogo, AppLogoEn } from '@/icons/logos'
import useUserStore from '@/lib/store/auth'

type Props = { dark?: boolean }
const Header: React.FC<Props> = () => {
  const { locale } = useParams()
  const { user } = useUserStore()
  const t = useTranslations('Layout')

  return (
    <header className="relative z-10 flex h-20 items-center border-b bg-background/40 px-4 md:px-8 dark:bg-background/30">
      <nav className={clsx('flex w-full items-center justify-between gap-1')}>
        <div className="flex items-center gap-3">
          <Link className="relative flex h-7 w-[100px] pb-1 sm:h-10 md:w-[140px]" href="/">
            {locale === 'fa' ? <AppLogo fill="hsl(var(--foreground))" /> : <AppLogoEn fill="hsl(var(--foreground))" />}
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

        <div className="flex items-center gap-3">
          <ThemeMode />

          <Link href={user ? '/app' : '/login'}>
            <div className="flex items-center gap-2 rounded-full bg-primary px-6 py-2 text-primary-foreground text-xs md:text-sm">
              <IconSparkles />
              {user ? t('Header.OpenApp') : t('Header.SignUp')}
            </div>
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
