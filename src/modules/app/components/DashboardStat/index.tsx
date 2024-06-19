'use client'

import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

import clsx from 'clsx'
import React from 'react'

import { Progress } from '@/components/ui/progress'

import { IconStats } from '@/icons/common'
import useUserStore from '@/lib/store/auth'
import { YekanBakhNumFont } from '@/styles/fonts'

const DashboardStat: React.FC = () => {
  const { user } = useUserStore()
  const { locale } = useParams()
  const t = useTranslations('Layout')

  if (!user) return null

  const used = user.userPlan.used
  const plan = user.userPlan.plan

  const progress = (used / plan.generation) * 100

  return (
    <div className="mt-4 md:mt-10">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 md:w-8 md:h-8 text-primary">
          <IconStats />
        </div>

        <span className="text-base md:text-xl">{t('Dashboard.Stats.Last30Days')}</span>
      </div>

      <div className="border border-muted rounded-2xl p-2 md:p-6 bg-card mt-4">
        <div className="flex justify-center gap-3 md:gap-0 md:justify-start">
          <div className="pe-3 md:pe-5">
            <p className="text-xs text-gray-400">{t('Dashboard.Stats.TimeSaved')}</p>
            <h2 className={clsx(locale === 'fa' && YekanBakhNumFont.className, 'text-sm md:text-xl mt-1')}>
              {Math.ceil(used * 1.14)}
              {used === 0 ? '' : '~'} {t('Dashboard.Stats.Hours')}
            </h2>
          </div>

          <div className="px-3 md:px-5 border-s border-e border-muted">
            <p className="text-xs text-gray-400">{t('Dashboard.Stats.Generations')}</p>
            <h2 className={clsx(locale === 'fa' && YekanBakhNumFont.className, 'text-sm md:text-xl mt-1')}>
              {used} {t('Of')} {plan?.generation}
            </h2>
          </div>

          <div className="ps-3 md:ps-5">
            <p className="text-xs text-gray-400">{t('Dashboard.Stats.Plan')}</p>
            <h2 className={clsx(locale === 'fa' && YekanBakhNumFont.className, 'text-sm md:text-xl mt-1')}>
              {plan?.name}
            </h2>
          </div>
        </div>

        <div className="hidden md:block mt-8 bg-gray-200 dark:bg-neutral-700 rounded-full">
          <div className="relative" style={{ width: `${progress}%` }}>
            {progress > 0 && (
              <div className="absolute top-1/2 left-1/2 z-[1] -translate-y-1/2 -translate-x-1/2">
                <span className={clsx(locale === 'fa' && YekanBakhNumFont.className, 'text-xs text-white')}>
                  {progress}%
                </span>
              </div>
            )}
            <Progress value={100} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardStat
