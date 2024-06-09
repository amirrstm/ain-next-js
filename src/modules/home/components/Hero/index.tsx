'use client'

import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import Image from 'next/image'

import { IconArrowLeft } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'
import { Link } from '@/components/ui/navigation'

import { OPEN_AI_LOGO } from '@/constants'

const HeroHeader: React.FC = () => {
  const { resolvedTheme } = useTheme()
  const t = useTranslations('Layout')

  return (
    <div className=" flex flex-col items-center justify-center bg-background/55 dark:bg-background/20">
      <div className="max-w-xl text-center">
        <h1 className="text-3xl md:text-5xl leading-relaxed font-bold">{t('Title')}</h1>
        <p className="mt-4 text-xs md:text-base text-neutral-500 dark:text-gray-300">{t('Subtitle')}</p>
      </div>

      <div className="mt-12">
        <Link href="/login">
          <Button className="rounded-full gap-2 items-center px-6">
            {t('Home.GetStarted')}
            <IconArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <div className="flex gap-6 items-center">
          <div className="relative h-7 sm:h-4">
            <Image
              priority
              width={100}
              height={100}
              alt="open-ai"
              src={OPEN_AI_LOGO}
              className={`w-full h-full object-contain ${resolvedTheme === 'light' ? 'grayscale invert contrast-[1] hue-rotate-[180deg]' : ''}`}
            />
          </div>
        </div>

        <p className="text-xs text-center mt-1">{t('Home.PoweredBy')}</p>
      </div>
    </div>
  )
}

export default HeroHeader
