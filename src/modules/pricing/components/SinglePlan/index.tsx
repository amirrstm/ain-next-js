'use client'

import { useTranslations } from 'next-intl'

import clsx from 'clsx'
import { Check, CheckCircle2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { YekanBakhNumFont } from '@/styles/fonts'

interface Props {
  isPopular?: boolean
}

const SinglePlan: React.FC<Props> = ({ isPopular }) => {
  const t = useTranslations('Pricing')

  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-3 relative">
      <div
        className={clsx('bg-secondary rounded-2xl border p-3 md:p-6 ', {
          'border-primary md:scale-105 shadow-sm shadow-primary my-2 md:my-0': isPopular,
        })}
      >
        {isPopular && (
          <div className="absolute -top-[2px] md:-top-[10px] -translate-x-1/2 left-1/2 text-white bg-primary rounded-full px-3 text-xs py-0.5 z-[1]">
            {t('Popular')}
          </div>
        )}

        <div>
          <h1 className="text-2xl font-bold text-center text-white mb-1">رایگان</h1>

          <p className="text-center text-xs font-light leading-8 text-gray-100">مناسب برای استفاده‌ی شخصی و آزمایشی</p>
        </div>

        <div className="text-center mt-4">
          <h2 className={clsx(YekanBakhNumFont.className, 'text-3xl font-bold text-white')}>
            249 <small className="text-gray-200 text-xs">هزارتومان</small>
          </h2>
        </div>

        <div className="mt-4">
          <ul className="mt-6 space-y-4">
            <SingleSpec title="تولید ۱۰۰ محتوا" />
            <SingleSpec title="دسترسی به تمامی امکانات" />

            <SingleSpec title="پشتیبانی ۲۴ ساعته" />

            <SingleSpec title="دسترسی به تمامی امکانات" />

            <SingleSpec title="پشتیبانی ۲۴ ساعته" />

            <SingleSpec title="دسترسی به تمامی امکانات" />

            <SingleSpec title="پشتیبانی ۲۴ ساعته" />

            <SingleSpec title="دسترسی به تمامی امکانات" />
          </ul>
        </div>

        <div className="mt-6">
          <Button className="w-full flex gap-2">
            <Check className="w-4 h-4" />
            {t('Order')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SinglePlan

const SingleSpec: React.FC<{ title: string }> = ({ title }) => {
  return (
    <li className="flex justify-between items-center gap-2">
      <span className="text-sm text-white">{title}</span>

      <CheckCircle2 className="w-4 h-4 text-green-300" />
    </li>
  )
}
