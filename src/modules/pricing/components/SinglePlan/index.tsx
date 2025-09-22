'use client'

import { IconCheck, IconCircleCheck } from '@tabler/icons-react'
import clsx from 'clsx'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { YekanBakhNumFont } from '@/styles/fonts'

interface Props {
  isPopular?: boolean
}

const SinglePlan: React.FC<Props> = ({ isPopular }) => {
  const { locale } = useParams()
  const t = useTranslations('Pricing')

  return (
    <div className="relative col-span-12 md:col-span-6 lg:col-span-3">
      <div
        className={clsx('rounded-2xl border bg-secondary p-3 md:p-6', {
          'my-2 border-primary shadow-primary shadow-sm md:my-0 md:scale-105': isPopular
        })}
      >
        {isPopular && (
          <div className="-top-[2px] md:-top-[10px] -translate-x-1/2 absolute left-1/2 z-[1] rounded-full bg-primary px-3 py-0.5 text-white text-xs">
            {t('Popular')}
          </div>
        )}

        <div>
          <h1 className="mb-1 text-center font-bold text-2xl text-white">رایگان</h1>

          <p className="text-center font-light text-gray-100 text-xs leading-8">مناسب برای استفاده‌ی شخصی و آزمایشی</p>
        </div>

        <div className="mt-4 text-center">
          <h2 className={clsx(locale === 'fa' && YekanBakhNumFont.className, 'font-bold text-3xl text-white')}>
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
          <Button className="flex w-full gap-2">
            <IconCheck className="h-4 w-4" />
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
    <li className="flex items-center justify-between gap-2">
      <span className="text-sm text-white">{title}</span>

      <IconCircleCheck className="h-4 w-4 text-green-300" />
    </li>
  )
}
