'use client'

import clsx from 'clsx'
import dayjs from 'dayjs'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import 'dayjs/locale/fa'
import jalaliday from 'jalaliday'
import React, { useEffect } from 'react'

import { Progress } from '@/components/ui/progress'
import IconDashboard from '@/icons/menus/dashboard'
import useUserStore from '@/lib/store/auth'
import { YekanBakhNumFont } from '@/styles/fonts'

import MonthlyAreaChart from '../../components/AreaChart'
import useDashboard from '../../hooks/useDashboard'

import type { DashboardStat } from '../../interface'

dayjs.extend(jalaliday)

const MonthlyChartContainer: React.FC = () => {
  const { locale } = useParams()
  const { user } = useUserStore()
  const t = useTranslations('Layout')
  const { data } = useDashboard(!!user)

  const [chartData, setChartData] = React.useState<DashboardStat[]>([])

  useEffect(() => {
    if (data) {
      const today = dayjs()

      const chartDates: DashboardStat[] = Array.from({ length: 31 }, (_, i) => i).map((idx) => ({
        date: dayjs(today).subtract(idx, 'day').format('YYYY-MM-DD'),
        totalRecords: 0
      }))

      setChartData(
        chartDates
          .map((date) => {
            const found = data.find((d) => d.date === date.date)
            return found || date
          })
          .reverse()
      )
    }
  }, [data])

  if (!user) return null

  const plan = user.userPlan.plan
  const used = user.userPlan.used?.generation

  const progress = (used / plan.generation) * 100

  return (
    <div className="px-2 py-4 md:p-8">
      <div className="mb-2 flex items-center gap-2 md:mb-4">
        <div className="h-7 w-7">
          <IconDashboard />
        </div>
        <span className="text-lg">{t('Menus.Dashboard')}</span>
      </div>

      <div className="rounded-xl border border-muted bg-card shadow-sm">
        <div className="border-b border-b-muted p-4 md:p-6 md:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-semibold text-lg">{t('Dashboard.Stats.UsagePercentage')}</p>
              <p className={clsx(locale === 'fa' && YekanBakhNumFont.className, 'mt-1 text-gray-400 text-sm')}>
                {t('Dashboard.Stats.Quota', {
                  from: dayjs(user.userPlan?.createdAt)
                    .locale(locale as string)
                    .subtract(1, 'day')
                    .format('DD MMMM YYYY'),
                  to: dayjs()
                    .locale(locale as string)
                    .calendar(locale === 'fa' ? 'jalali' : 'gregory')
                    .format('DD MMMM YYYY')
                })}
              </p>
            </div>

            <p className={clsx(locale === 'fa' && YekanBakhNumFont.className, 'text-sm md:text-base')}>
              {t('Dashboard.Stats.GenerationReset', {
                date: `${
                  dayjs(user.userPlan?.createdAt)
                    .locale(locale as string)
                    .calendar(locale === 'fa' ? 'jalali' : 'gregory')
                    .date() - 1
                }${locale === 'fa' ? 'ام' : 'th'}`
              })}
            </p>
          </div>

          <div className="mt-4 rounded-full bg-gray-200 md:mt-8 dark:bg-neutral-700">
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

        <div className="flex w-full flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <p className="font-semibold text-lg">{t('Dashboard.Stats.Usage30Days')}</p>
            <p className={clsx(locale === 'fa' && YekanBakhNumFont.className, 'mt-1 text-gray-400 text-sm')}>
              {t('Dashboard.Stats.Quota', {
                from: dayjs()
                  .calendar(locale === 'fa' ? 'jalali' : 'gregory')
                  .subtract(1, 'month')
                  .format('DD MMMM YY'),
                to: dayjs()
                  .locale(locale as string)
                  .format('DD MMMM YY')
              })}
            </p>
          </div>

          <div className="flex items-center text-lg">
            <p>{t('Dashboard.Stats.Generations')}:&nbsp;</p>
            <h2 className={clsx(locale === 'fa' && YekanBakhNumFont.className)}>
              {plan?.generation} / {used}
            </h2>
          </div>
        </div>

        <MonthlyAreaChart data={chartData} />

        <div className="mt-4 flex items-center justify-between border-t border-t-muted p-4 text-xl md:p-8">
          <p>{t('Dashboard.Stats.Plan')}:</p>
          <h2 className={clsx(locale === 'fa' && YekanBakhNumFont.className)}>{plan?.name}</h2>
        </div>
      </div>
    </div>
  )
}

export default MonthlyChartContainer
