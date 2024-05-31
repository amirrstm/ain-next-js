'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { IconArrowLeft } from '@tabler/icons-react'
import clsx from 'clsx'

import { Button } from '@/components/ui/button'
import { Link } from '@/components/ui/navigation'
import Rating from '@/components/ui/rating'

import { OPEN_AI_LOGO } from '@/constants'
import { YekanBakhNumFont } from '@/styles/fonts'

const HeroHeader: React.FC = () => {
  const t = useTranslations('Layout')

  return (
    <div className="  flex flex-col items-center justify-center">
      <div className="max-w-xl text-center">
        <h1
          className="text-white text-3xl md:text-5xl leading-relaxed"
          style={{
            background: 'radial-gradient(ellipse farthest-corner at bottom center, #000000 -10%, #FFFFFF 40%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {t('Title')}
        </h1>
        <p className="mt-4 text-gray-300 text-xs md:text-base">{t('Subtitle')}</p>
      </div>

      <div className="mt-12">
        <Link href="/login">
          <Button className="rounded-full gap-2 items-center px-6">
            {t('Home.GetStarted')}
            <IconArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      {/* <div className="max-w-[250px] text-center flex flex-col items-center mt-4">
        <Rating count={5} />

        <div className={clsx(YekanBakhNumFont.className, 'text-gray-400 mt-2 text-xs leading-snug')}>
          {t.rich('Home.Rating', {
            count: 3000,
            rating: chunks => <strong className="text-white">{chunks}</strong>,
          })}
        </div>
      </div> */}

      <div className="mt-4 flex items-center gap-2">
        <div className="flex gap-6 items-center">
          <div className="relative h-7 sm:h-4">
            <Image alt="open-ai" width={100} height={100} src={OPEN_AI_LOGO} className="w-full h-full object-contain" />
          </div>
        </div>

        <p className="text-white text-xs text-center mt-1">{t('Home.PoweredBy')}</p>
      </div>
    </div>
  )
}

export default HeroHeader
