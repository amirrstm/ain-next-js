import { IconArrowUp } from '@tabler/icons-react'
import clsx from 'clsx'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { type ReactNode, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import IconLogoSmall from '@/icons/logos/logo-small'

import type React from 'react'

type TabTypes = {
  title: { fa: string; en: string }
  before: { fa: ReactNode; en: ReactNode }
  after: { fa: ReactNode; en: ReactNode }
}

const BeforeAfter: React.FC = () => {
  const { locale } = useParams()
  const ref = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery({ maxWidth: 768 })
  const { scrollYProgress } = useScroll({ offset: ['start start', 'end start'], target: ref })

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
      after: {
        en: <div></div>,
        fa: (
          <div>
            <h2 className="font-bold">✨ کفش ورزشی جدید ✨</h2>
            <br />
            آماده‌اید تا بهترین عملکرد خود را در ورزش تجربه کنید؟ با کفش‌های ورزشی جدید ما، هر قدم شما همراه با راحتی و استحکام
            خواهد بود! 👟🌟 همین حالا خرید کنید و تفاوت را احساس کنید. #ورزش #سبک_زندگی #کفش_ورزشی
          </div>
        )
      },
      before: {
        en: <span>Buying</span>,
        fa: <span>خرید کفش و کتانی مردانه در فروشگاه لباس ، بهترین انتخاب برای شماست. #ورزش #کفش_ورزشی #کتانی_مردانه</span>
      },
      title: {
        en: 'Post Caption',
        fa: 'کپشن پست'
      }
    },
    {
      after: {
        en: <div></div>,
        fa: (
          <div>
            <h2 className="font-bold">کیف ورزشی نایک: بهترین همراه شما در باشگاه</h2>
            <br />
            <span>
              آیا به دنبال کیفی هستید که تمام نیازهای شما را در باشگاه برآورده کند؟ کیف ورزشی نایک با طراحی جذاب و کاربردی، همراهی
              ایده‌آل برای شماست. این کیف جادار و ضد آب، تمامی ملزومات ورزشی شما را در خود جای می‌دهد و از وسایل شما در برابر رطوبت
              و آب محافظت می‌کند. با کیف ورزشی نایک، همیشه آماده و منظم خواهید بود. پس دیگر منتظر چه هستید؟ همین حالا کیف ورزشی
              نایک را تهیه کنید و تجربه‌ای متفاوت از راحتی و کارایی داشته باشید.
            </span>
          </div>
        )
      },
      before: {
        en: <div></div>,
        fa: (
          <span>
            کیف ورزشی نایک بهترین کیف موجود در بازار می‌باشد. این کیف با استفاده از بهترین مواد اولیه ساخته شده است. این کیف بسیار
            مناسب شما می‌باشد و پیشنهاد میکنیم حتما خرید کنید.
          </span>
        )
      },
      title: {
        en: 'Product Description',
        fa: 'توضیحات محصول'
      }
    },
    {
      after: {
        en: <div></div>,
        fa: (
          <div>
            <h2 className="font-bold">صرفه‌جویی در زمان و هزینه با آی نویس</h2>
            <h2 className="my-3 font-bold">افزایش تعامل با مخاطبان به کمک آی نویس</h2>
            <h2 className="font-bold">آی نویس: دستیار هوش مصنوعی بی‌نظیر برای تولید محتوای متنی</h2>

            <span className="mt-2 block leading-relaxed">
              با آی نویس، دیگر نیازی به استخدام نویسنده‌ها و صرف وقت و هزینه زیاد برای تولید محتوا ندارید. این دستیار هوشمند تمامی
              نیازهای محتوایی شما را به سرعت و با کیفیت برطرف می‌کند.
            </span>
          </div>
        )
      },

      before: {
        en: <div></div>,
        fa: <span>آی نویس دستیار هوش مصنوعی برای تولید محتوای متنی</span>
      },
      title: {
        en: 'Business Pitch',
        fa: 'شعارهای تبلیغاتی'
      }
    }
  ]

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.3) {
      setActiveTab(0)
    } else if (latest > 0.3 && latest < 0.6) {
      setActiveTab(1)
    } else if (latest > 0.6) {
      setActiveTab(2)
    }
  })

  return (
    <div className="h-auto md:h-[300vh]" ref={isMobile ? undefined : ref}>
      <div className="sticky top-0 mx-auto max-w-6xl px-2 py-12 md:px-6 md:py-20">
        <div className="flex flex-col items-center">
          <div className="flex w-24 justify-center rounded-full bg-primary py-2 text-white text-xs tracking-widest shadow-primary shadow-xl dark:text-foreground">
            {t('BeforeAfter.Title')}
          </div>

          <h1 className="my-6 block font-bold text-2xl md:text-4xl">{t('BeforeAfter.Subtitle')}</h1>
        </div>

        <div className="flex items-center justify-center gap-4 px-2 py-2 md:gap-8">
          {TABS.map((tab, index) => (
            <div key={`tab-${index}`} onClick={isMobile ? () => setActiveTab(index) : undefined}>
              <p
                className={clsx('text-sm transition-all duration-200 ease-in-out md:text-lg', {
                  'text-muted': activeTab !== index
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
            translateX: isMobile ? 0 : activeTab === 0 ? tabTranslate : activeTab === 1 ? secondTabTranslate : thirdTabTranslate
          }}
        >
          <div className="col-span-12 md:col-span-6">
            <Before
              description={TABS[activeTab].before[locale as 'en' | 'fa']}
              height={activeTab === 0 ? `h-auto md:h-[110px]` : `h-auto md:h-[160px]`}
            />
          </div>

          <div className="col-span-12 md:col-span-6">
            <After
              description={TABS[activeTab].after[locale as 'en' | 'fa']}
              height={activeTab === 0 ? `h-auto md:h-[110px]` : `h-auto md:h-[160px]`}
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
        <p className="text-center text-gray-500 text-lg">{t('BeforeAfter.Handwritten')}</p>
      </div>
      <div className="rounded-2xl border border-foreground/15 p-6">
        <div className={height}>
          <div className="font-light text-sm">{description}</div>
        </div>

        <div className="flex pt-14" dir="ltr">
          <div className="flex-1 text-center">
            <p className="mt-2 font-light text-sm">5 Impressions</p>
          </div>

          <div className="flex-1 text-center">
            <p className="mt-2 font-light text-sm">5 Unique Views</p>
          </div>

          <div className="flex-1 text-center">
            <p className="mt-2 font-light text-sm">5 Reactions</p>
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-12 gap-3">
        <div className="col-span-6">
          <div className="rounded-2xl border border-destructive bg-destructive/10 p-3 text-center">
            <p className="text-destructive text-sm md:text-base">{t('BeforeAfter.Before.Short')}</p>
          </div>
        </div>

        <div className="col-span-6">
          <div className="rounded-2xl border border-destructive bg-destructive/10 p-3 text-center">
            <p className="text-destructive text-sm md:text-base">{t('BeforeAfter.Before.Attractive')}</p>
          </div>
        </div>

        <div className="col-span-12">
          <div className="rounded-2xl border border-destructive bg-destructive/10 p-3 text-center">
            <p className="text-destructive text-sm md:text-base">{t('BeforeAfter.Before.Principal')}</p>
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
      <div className="flex items-center justify-center gap-2 py-5">
        <div className="flex h-8 w-8">
          <IconLogoSmall bg="hsl(var(--background))" />
        </div>
        <p className="text-center text-lg">{t('BeforeAfter.AIWritten')}</p>
      </div>

      <div className="rounded-2xl border border-foreground/15 p-6">
        <div className={height}>
          <div className="font-light text-sm">{description}</div>
        </div>

        <div className="flex pt-6" dir="ltr">
          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="flex items-center text-success">
              <IconArrowUp className="h-5 w-5" />
              <span className="mt-1 block">+1440%</span>
            </div>
            <p className="mt-2 font-light text-sm">5 Impressions</p>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="flex items-center text-success">
              <IconArrowUp className="h-5 w-5" />
              <span className="mt-1 block">+1842%</span>
            </div>
            <p className="mt-2 font-light text-sm">129 Unique Views</p>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="flex items-center text-success">
              <IconArrowUp className="h-5 w-5" />
              <span className="mt-1 block">+980%</span>
            </div>
            <p className="mt-2 font-light text-sm">49 Reactions</p>
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-12 gap-3">
        <div className="col-span-6">
          <div className="rounded-2xl border border-success bg-success/10 p-3 text-center">
            <p className="text-sm text-success md:text-base">{t('BeforeAfter.After.Short')}</p>
          </div>
        </div>

        <div className="col-span-6">
          <div className="rounded-2xl border border-success bg-success/10 p-3 text-center">
            <p className="text-sm text-success md:text-base">{t('BeforeAfter.After.Attractive')}</p>
          </div>
        </div>

        <div className="col-span-12">
          <div className="rounded-2xl border border-success bg-success/10 p-3 text-center">
            <p className="text-sm text-success md:text-base">{t('BeforeAfter.After.Principal')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
