'use client'

import clsx from 'clsx'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Progress } from '@/components/ui/progress'
import { IconStats } from '@/icons/common'
import useUserStore from '@/lib/store/auth'
import { YekanBakhNumFont } from '@/styles/fonts'

import type React from 'react'

const DashboardStat: React.FC = () => {
  const { user } = useUserStore()
  const { locale } = useParams()
  const t = useTranslations('Layout')

  if (!user) return null

  const plan = user.userPlan.plan
  const used = user.userPlan.used?.generation

  const progress = (used / plan.generation) * 100

  return (
    <div className="mt-4 md:mt-10">
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 text-primary md:h-8 md:w-8">
          <IconStats />
        </div>

        <span className="text-base md:text-xl">{t('Dashboard.Stats.Last30Days')}</span>
      </div>

      <div className="mt-4 rounded-2xl border border-muted bg-card p-2 md:p-6">
        <div className="flex justify-center gap-3 md:justify-start md:gap-0">
          <div className="pe-3 md:pe-5">
            <p className="text-gray-400 text-xs">{t('Dashboard.Stats.TimeSaved')}</p>
            <h2 className={clsx(locale === 'fa' && YekanBakhNumFont.className, 'mt-1 text-sm md:text-xl')}>
              {Math.ceil(used * 1.14)}
              {used === 0 ? '' : '~'} {t('Dashboard.Stats.Hours')}
            </h2>
          </div>

          <div className="border-muted border-s border-e px-3 md:px-5">
            <p className="text-gray-400 text-xs">{t('Dashboard.Stats.Generations')}</p>
            <h2 className={clsx(locale === 'fa' && YekanBakhNumFont.className, 'mt-1 text-sm md:text-xl')}>
              {used} {t('Of')} {plan?.generation}
            </h2>
          </div>

          <div className="ps-3 md:ps-5">
            <p className="text-gray-400 text-xs">{t('Dashboard.Stats.Plan')}</p>
            <h2 className={clsx(locale === 'fa' && YekanBakhNumFont.className, 'mt-1 text-sm md:text-xl')}>{plan?.name}</h2>
          </div>
        </div>

        <div className="mt-8 hidden rounded-full bg-gray-200 md:block dark:bg-neutral-700">
          <div className="relative" style={{ width: `${progress}%` }}>
            {progress > 0 && (
              <div className="-translate-y-1/2 -translate-x-1/2 absolute top-1/2 left-1/2 z-[1]">
                <span className={clsx(locale === 'fa' && YekanBakhNumFont.className, 'text-white text-xs')}>{progress}%</span>
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
