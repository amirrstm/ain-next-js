import { useTranslations } from 'next-intl'

import { IconArrowUp } from '@tabler/icons-react'
import clsx from 'clsx'
import React, { ReactNode, useState } from 'react'

import IconLogoSmall from '@/icons/logo-small'

const BeforeAfter: React.FC = () => {
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

  return (
    <div className="max-w-6xl mx-auto py-12 md:py-20 px-2 md:px-6">
      <div className="flex flex-col items-center">
        <div className="py-2 w-24 rounded-full bg-primary text-foreground flex justify-center text-xs shadow-xl shadow-primary tracking-widest">
          {t('BeforeAfter.Title')}
        </div>

        <h1 className="text-2xl md:text-4xl font-bold my-6 block">{t('BeforeAfter.Subtitle')}</h1>
      </div>

      <div className="flex justify-center items-center gap-4 md:gap-8 px-2 py-2">
        {TABS.map((tab, index) => (
          <div key={`tab-${index}`} className="cursor-pointer" onClick={() => setActiveTab(index)}>
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

      <div className="grid grid-cols-12 md:gap-6">
        {activeTab === 0 && (
          <>
            <div className="col-span-12 md:col-span-6 animate-fade-in-bottom duration-300">
              <Before description="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است" />
            </div>

            <div className="col-span-12 md:col-span-6 animate-fade-in-bottom duration-400 delay-500">
              <After description="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک  ستون و سطرآنچنان که لازم است" />
            </div>
          </>
        )}

        {activeTab === 1 && (
          <>
            <div className="col-span-12 md:col-span-6 animate-fade-in-bottom duration-300">
              <Before description="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است" />
            </div>

            <div className="col-span-12 md:col-span-6 animate-fade-in-bottom duration-400 delay-500">
              <After description="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک اسه در ستون و سطرآنچنان که لازم است" />
            </div>
          </>
        )}

        {activeTab === 2 && (
          <>
            <div className="col-span-12 md:col-span-6 animate-fade-in-bottom duration-300">
              <Before description="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است" />
            </div>

            <div className="col-span-12 md:col-span-6 animate-fade-in-bottom duration-400 delay-500">
              <After description="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گراه و مجله در ستون و سطرآنچنان که لازم است" />
            </div>
          </>
        )}
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
        <IconLogoSmall />
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
