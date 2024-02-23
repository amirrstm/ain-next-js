'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'

import clsx from 'clsx'
import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import Rating from '@/components/ui/rating'

import { useTranslation } from '@/app/i18n/client'
import { YekanBakhNumFont } from '@/styles/fonts'

const HeroHeader: React.FC = () => {
  const { lng } = useParams()
  const { t } = useTranslation(lng as string, 'Layout')

  return (
    <div className="pt-32 md:pt-40 flex flex-col items-center justify-center">
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
        <Button className="rounded-full gap-2 items-center px-6">
          {t('Home.GetStarted')}
          <ArrowLeft className="w-4 h-4" />
        </Button>
      </div>

      <div className="max-w-[250px] text-center flex flex-col items-center mt-4">
        <Rating count={5} />

        <div className={clsx(YekanBakhNumFont.className, 'text-gray-400 mt-2 text-xs leading-snug')}>
          <div dangerouslySetInnerHTML={{ __html: t('Home.Rating', { count: 3000 }) }} />
        </div>
      </div>

      <div className="mt-12">
        <p className="text-white text-xs text-center">{t('Home.PoweredBy')}</p>

        <div className="flex gap-6 items-center mt-2">
          <div className="relative h-7 sm:h-6">
            <Image
              alt="open-ai"
              width={100}
              height={100}
              src="/images/open-ai.png"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="relative h-7 sm:h-6">
            <Image
              alt="google-ai"
              width={100}
              height={100}
              src="/images/google-ai.png"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroHeader
