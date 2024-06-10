'use client'

import { useParams } from 'next/navigation'

import { Link } from '@/components/ui/navigation'

import { AppLogo, AppLogoEn } from '@/icons/logos'

import { MenuTabs } from './MenuTabs'
import UserProfile from './UserProfile'

interface Props {
  menus: {
    title: string
    link: string
    icon: React.ReactNode
  }[]
}

const AppHeader: React.FC<Props> = ({ menus }) => {
  const { locale } = useParams()

  return (
    <header className="border-b border-b-input bg-card">
      <div className="flex justify-between items-center py-1 md:py-3 px-3 md:px-6">
        <Link href="/app">
          <div className="relative w-[100px] md:w-[120px] h-6 sm:h-9">
            {locale === 'fa' ? <AppLogo fill="hsl(var(--foreground))" /> : <AppLogoEn fill="hsl(var(--foreground))" />}
          </div>
        </Link>

        <div className="flex">
          <UserProfile />
        </div>
      </div>

      <MenuTabs tabs={menus} />
    </header>
  )
}

export default AppHeader
