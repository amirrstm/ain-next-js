'use client'

import { IconArrowLeft } from '@tabler/icons-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'

import { Link } from '@/components/ui/navigation'
import { OPEN_AI_LOGO } from '@/constants'

const HeroHeader: React.FC = () => {
  const { resolvedTheme } = useTheme()
  const t = useTranslations('Layout')

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="max-w-xl px-1 text-center">
        <h1 className="font-bold text-3xl leading-relaxed md:text-5xl rtl:leading-[1.5]">{t('Title')}</h1>
        <p className="mt-4 text-neutral-500 text-xs md:text-base dark:text-gray-300">{t('Subtitle')}</p>
      </div>

      <div className="mt-12">
        <Link href="/login">
          <div className="flex flex-row-reverse items-center gap-2 rounded-full bg-primary px-6 py-2 text-primary-foreground text-sm rtl:flex-row">
            <IconArrowLeft className="h-4 w-4 rotate-180 rtl:rotate-0" />
            {t('Home.GetStarted')}
          </div>
        </Link>
      </div>

      <div className="mt-4 flex flex-row-reverse items-center gap-2 rtl:flex-row">
        <div className="flex items-center gap-6">
          <div className="relative h-7 sm:h-4">
            <Image
              alt="open-ai"
              className={`h-full w-full object-contain ${resolvedTheme === 'light' ? 'contrast-[1] grayscale hue-rotate-[180deg] invert' : ''}`}
              height={100}
              priority
              src={OPEN_AI_LOGO}
              width={100}
            />
          </div>
        </div>

        <p className="text-center text-xs rtl:mt-1">{t('Home.PoweredBy')}</p>
      </div>
    </div>
  )
}

export default HeroHeader
