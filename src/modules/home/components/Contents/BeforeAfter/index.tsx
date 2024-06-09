import { useTranslations } from 'next-intl'

import { IconArrowUp } from '@tabler/icons-react'
import clsx from 'clsx'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import React, { useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import IconLogoSmall from '@/icons/logo-small'

const BeforeAfter: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery({ maxWidth: 768 })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const tabOpacity = useTransform(scrollYProgress, [0, 0.1, 0.3], [1, 1, 0])
  const tabTranslate = useTransform(scrollYProgress, [0, 0.1, 0.3], [0, 0, -300])

  const secondTabOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.6], [0, 1, 0])
  const secondTabTranslate = useTransform(scrollYProgress, [0.3, 0.4, 0.6], [300, 0, -300])

  const thirdTabOpacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1])
  const thirdTabTranslate = useTransform(scrollYProgress, [0.6, 0.7], [300, 0])

  const t = useTranslations('Layout.Home')
  const [activeTab, setActiveTab] = useState(0)

  const TABS = [
    {
      title: t('BeforeAfter.LinkedInPost'),
    },
    {
      title: t('BeforeAfter.GoogleAds'),
    },
    {
      title: t('BeforeAfter.SeoKeyword'),
    },
  ]

  useMotionValueEvent(scrollYProgress, 'change', latest => {
    if (latest < 0.3) {
      setActiveTab(0)
    } else if (latest > 0.3 && latest < 0.6) {
      setActiveTab(1)
    } else if (latest > 0.6) {
      setActiveTab(2)
    }
  })

  return (
    <div ref={ref} className="h-[320vh] md:h-[250vh]">
      <div className="max-w-6xl mx-auto py-12 md:py-20 px-2 md:px-6 sticky top-0">
        <div className="flex flex-col items-center">
          <div className="py-2 w-24 rounded-full bg-primary text-white dark:text-foreground flex justify-center text-xs shadow-xl shadow-primary tracking-widest">
            {t('BeforeAfter.Title')}
          </div>

          <h1 className="text-2xl md:text-4xl font-bold my-6 block">{t('BeforeAfter.Subtitle')}</h1>
        </div>

        <div className="flex justify-center items-center gap-4 md:gap-8 px-2 py-2">
          {TABS.map((tab, index) => (
            <div key={`tab-${index}`} onClick={isMobile ? () => setActiveTab(index) : undefined}>
              <p
                className={clsx('text-sm md:text-lg transition-all duration-200 ease-in-out', {
                  'text-muted': activeTab !== index,
                })}
                style={{ textShadow: activeTab === index ? 'hsl(var(--primary)) 0 4px 12px' : undefined }}
              >
                {tab.title}
              </p>
            </div>
          ))}
        </div>

        <motion.div
          className="grid grid-cols-12 md:gap-6"
          style={{
            opacity: isMobile ? 1 : activeTab === 0 ? tabOpacity : activeTab === 1 ? secondTabOpacity : thirdTabOpacity,
            translateX: isMobile
              ? 0
              : activeTab === 0
                ? tabTranslate
                : activeTab === 1
                  ? secondTabTranslate
                  : thirdTabTranslate,
          }}
        >
          <div className="col-span-12 md:col-span-6">
            <Before description="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است" />
          </div>

          <div className="col-span-12 md:col-span-6">
            <After description="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک  ستون و سطرآنچنان که لازم است" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default BeforeAfter

const Before: React.FC<{ description: string }> = ({ description }) => {
  const t = useTranslations('Layout.Home')

  return (
    <div>
      <div className="py-5">
        <p className="text-center text-lg text-gray-500">{t('BeforeAfter.Handwritten')}</p>
      </div>
      <div className="border border-foreground/15 rounded-2xl p-6">
        <div className="h-[70px]">
          <p className="text-sm font-light mt-2">{description}</p>
        </div>

        <div className="flex pt-12" dir="ltr">
          <div className="flex-1 text-center">
            <p className="text-sm font-light mt-2">5 Impressions</p>
          </div>

          <div className="flex-1 text-center">
            <p className="text-sm font-light mt-2">5 Unique Views</p>
          </div>

          <div className="flex-1 text-center">
            <p className="text-sm font-light mt-2">5 Reactions</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3 mt-3">
        <div className="col-span-6">
          <div className="p-3 border border-destructive bg-destructive/10 rounded-2xl text-center">
            <p className="md:text-base text-sm text-destructive">{t('BeforeAfter.Before.Short')}</p>
          </div>
        </div>

        <div className="col-span-6">
          <div className="p-3 border border-destructive bg-destructive/10 rounded-2xl text-center">
            <p className="md:text-base text-sm text-destructive">{t('BeforeAfter.Before.Attractive')}</p>
          </div>
        </div>

        <div className="col-span-12">
          <div className="p-3 border border-destructive bg-destructive/10 rounded-2xl text-center">
            <p className="md:text-base text-sm text-destructive">{t('BeforeAfter.Before.Principal')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const After: React.FC<{ description: string }> = ({ description }) => {
  const t = useTranslations('Layout.Home')

  return (
    <div>
      <div className="py-5 flex items-center justify-center gap-2">
        <IconLogoSmall bg="hsl(var(--background))" />
        <p className="text-center text-lg">{t('BeforeAfter.AIWritten')}</p>
      </div>

      <div className="border border-foreground/15 rounded-2xl p-6">
        <div className="h-[70px]">
          <p className="text-sm font-light mt-2">{description}</p>
        </div>

        <div className="flex pt-6" dir="ltr">
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="flex items-center text-success">
              <IconArrowUp className="w-5 h-5" />
              <span className="block mt-1">+1440%</span>
            </div>
            <p className="text-sm font-light mt-2">5 Impressions</p>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="flex items-center text-success">
              <IconArrowUp className="w-5 h-5" />
              <span className="block mt-1">+1842%</span>
            </div>
            <p className="text-sm font-light mt-2">129 Unique Views</p>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="flex items-center text-success">
              <IconArrowUp className="w-5 h-5" />
              <span className="block mt-1">+980%</span>
            </div>
            <p className="text-sm font-light mt-2">49 Reactions</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3 mt-3">
        <div className="col-span-6">
          <div className="p-3 border border-success bg-success/10 rounded-2xl text-center">
            <p className="md:text-base text-sm text-success">{t('BeforeAfter.After.Short')}</p>
          </div>
        </div>

        <div className="col-span-6">
          <div className="p-3 border border-success bg-success/10 rounded-2xl text-center">
            <p className="md:text-base text-sm text-success">{t('BeforeAfter.After.Attractive')}</p>
          </div>
        </div>

        <div className="col-span-12">
          <div className="p-3 border border-success bg-success/10 rounded-2xl text-center">
            <p className="md:text-base text-sm text-success">{t('BeforeAfter.After.Principal')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
