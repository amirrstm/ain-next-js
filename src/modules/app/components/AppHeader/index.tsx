'use client'

import { IconMenu2 } from '@tabler/icons-react'
import { useParams } from 'next/navigation'

import { Link } from '@/components/ui/navigation'
import { AppLogo, AppLogoEn } from '@/icons/logos'

import UserProfile from './UserProfile'

interface Props {
  setOpen: (open: boolean) => void
}

const AppHeader: React.FC<Props> = ({ setOpen }) => {
  const { locale } = useParams()

  return (
    <header className="border-b border-b-input bg-card">
      <div className="flex items-center justify-between px-3 py-1 md:px-6 md:py-3">
        <Link href="/app">
          <div className="relative flex h-12 w-[100px] sm:h-9 md:w-[120px]">
            {locale === 'fa' ? <AppLogo fill="hsl(var(--foreground))" /> : <AppLogoEn fill="hsl(var(--foreground))" />}
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <UserProfile />

          <div className="cursor-pointer" onClick={() => setOpen(false)}>
            <IconMenu2 />
          </div>
        </div>
      </div>
    </header>
  )
}

export default AppHeader
