import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

import { IconArrowUp } from '@tabler/icons-react'
import clsx from 'clsx'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import React, { ReactNode, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import IconLogoSmall from '@/icons/logos/logo-small'

type TabTypes = {
  title: { fa: string; en: string }
  before: { fa: ReactNode; en: ReactNode }
  after: { fa: ReactNode; en: ReactNode }
}

const BeforeAfter: React.FC = () => {
  const { locale } = useParams()
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

  const TABS: TabTypes[] = [
    {
      title: {
        fa: 'کپشن پست',
        en: 'Post Caption',
      },
      before: {
        fa: (
          <span>
            خرید کفش و کتانی مردانه در فروشگاه لباس ، بهترین انتخاب برای شماست. #ورزش #کفش_ورزشی #کتانی_مردانه
          </span>
        ),
        en: <span>Buying</span>,
      },
      after: {
        en: <div></div>,
        fa: (
          <div>
            <h2 className="font-bold">✨ کفش ورزشی جدید ✨</h2>
            <br />
            آماده‌اید تا بهترین عملکرد خود را در ورزش تجربه کنید؟ با کفش‌های ورزشی جدید ما، هر قدم شما همراه با راحتی و
            استحکام خواهد بود! 👟🌟 همین حالا خرید کنید و تفاوت را احساس کنید. #ورزش #سبک_زندگی #کفش_ورزشی
          </div>
        ),
      },
    },
    {
      title: {
        fa: 'توضیحات محصول',
        en: 'Product Description',
      },
      before: {
        en: <div></div>,
        fa: (
          <span>
            کیف ورزشی نایک بهترین کیف موجود در بازار می‌باشد. این کیف با استفاده از بهترین مواد اولیه ساخته شده است. این
            کیف بسیار مناسب شما می‌باشد و پیشنهاد میکنیم حتما خرید کنید.
          </span>
        ),
      },
      after: {
        en: <div></div>,
        fa: (
          <div>
            <h2 className="font-bold">کیف ورزشی نایک: بهترین همراه شما در باشگاه</h2>
            <br />
            <span>
              آیا به دنبال کیفی هستید که تمام نیازهای شما را در باشگاه برآورده کند؟ کیف ورزشی نایک با طراحی جذاب و
              کاربردی، همراهی ایده‌آل برای شماست. این کیف جادار و ضد آب، تمامی ملزومات ورزشی شما را در خود جای می‌دهد و
              از وسایل شما در برابر رطوبت و آب محافظت می‌کند. با کیف ورزشی نایک، همیشه آماده و منظم خواهید بود. پس دیگر
              منتظر چه هستید؟ همین حالا کیف ورزشی نایک را تهیه کنید و تجربه‌ای متفاوت از راحتی و کارایی داشته باشید.
            </span>
          </div>
        ),
      },
    },
    {
      title: {
        fa: 'شعارهای تبلیغاتی',
        en: 'Business Pitch',
      },

      before: {
        en: <div></div>,
        fa: <span>آی نویس دستیار هوش مصنوعی برای تولید محتوای متنی</span>,
      },
      after: {
        en: <div></div>,
        fa: (
          <div>
            <h2 className="font-bold">صرفه‌جویی در زمان و هزینه با آی نویس</h2>
            <h2 className="font-bold my-3">افزایش تعامل با مخاطبان به کمک آی نویس</h2>
            <h2 className="font-bold">آی نویس: دستیار هوش مصنوعی بی‌نظیر برای تولید محتوای متنی</h2>

            <span className="block mt-2 leading-relaxed">
              با آی نویس، دیگر نیازی به استخدام نویسنده‌ها و صرف وقت و هزینه زیاد برای تولید محتوا ندارید. این دستیار
              هوشمند تمامی نیازهای محتوایی شما را به سرعت و با کیفیت برطرف می‌کند.
            </span>
          </div>
        ),
      },
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
    <div ref={isMobile ? undefined : ref} className="h-auto md:h-[300vh]">
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
                {tab.title[locale as 'fa' | 'en']}
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
            <Before
              height={activeTab === 0 ? `h-auto md:h-[110px]` : `h-auto md:h-[160px]`}
              description={TABS[activeTab].before[locale as 'en' | 'fa']}
            />
          </div>

          <div className="col-span-12 md:col-span-6">
            <After
              height={activeTab === 0 ? `h-auto md:h-[110px]` : `h-auto md:h-[160px]`}
              description={TABS[activeTab].after[locale as 'en' | 'fa']}
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default BeforeAfter

const Before: React.FC<{ description: ReactNode; height?: string }> = ({ description, height }) => {
  const t = useTranslations('Layout.Home')

  return (
    <div>
      <div className="py-5">
        <p className="text-center text-lg text-gray-500">{t('BeforeAfter.Handwritten')}</p>
      </div>
      <div className="border border-foreground/15 rounded-2xl p-6">
        <div className={height}>
          <div className="text-sm font-light">{description}</div>
        </div>

        <div className="flex pt-14" dir="ltr">
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

const After: React.FC<{ description: ReactNode; height?: string }> = ({ description, height }) => {
  const t = useTranslations('Layout.Home')

  return (
    <div>
      <div className="py-5 flex items-center justify-center gap-2">
        <div className="flex w-8 h-8">
          <IconLogoSmall bg="hsl(var(--background))" />
        </div>
        <p className="text-center text-lg">{t('BeforeAfter.AIWritten')}</p>
      </div>

      <div className="border border-foreground/15 rounded-2xl p-6">
        <div className={height}>
          <div className="text-sm font-light">{description}</div>
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
