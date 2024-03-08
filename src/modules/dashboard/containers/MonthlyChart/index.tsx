'use client'

import { useParams } from 'next/navigation'

import clsx from 'clsx'
import dayjs from 'dayjs'
import 'dayjs/locale/fa'
import jalaliday from 'jalaliday'
import { LayoutDashboard } from 'lucide-react'
import React, { useEffect } from 'react'

import { Progress } from '@/components/ui/progress'

import { useTranslation } from '@/app/i18n/client'
import useUserStore from '@/lib/store/auth'
import { YekanBakhNumFont } from '@/styles/fonts'

import MonthlyAreaChart from '../../components/AreaChart'
import useDashboard from '../../hooks/useDashboard'
import { DashboardStat } from '../../interface'

dayjs.locale('fa')
dayjs.extend(jalaliday)

const MonthlyChartContainer: React.FC = () => {
  const { lng } = useParams()
  const { user } = useUserStore()
  const { data } = useDashboard(!!user)
  const { t } = useTranslation(lng as string, 'Layout')
  const [chartData, setChartData] = React.useState<DashboardStat[]>([])

  useEffect(() => {
    if (data) {
      const today = dayjs()

      const chartDates: DashboardStat[] = Array.from({ length: 31 }, (_, i) => i).map(idx => ({
        totalRecords: 0,
        date: dayjs(today).subtract(idx, 'day').format('YYYY-MM-DD'),
      }))

      setChartData(
        chartDates
          .map(date => {
            const found = data.find(d => d.date === date.date)
            return found || date
          })
          .reverse(),
      )
    }
  }, [data])

  if (!user) return null

  const used = user.userPlan.used
  const plan = user.userPlan.plan

  const progress = (used / plan.generation) * 100

  return (
    <div className="md:p-8 px-2 py-4">
      <div className="flex items-center gap-2 mb-2 md:mb-4 mr-3 md:mr-0">
        <LayoutDashboard className="w-6 h-6" />
        <span className="text-lg">{t('Menus.Dashboard')}</span>
      </div>

      <div className="bg-white md:border md:rounded-xl md:shadow-sm">
        <div className="p-4 md:p-6 md:px-8 border-b">
          <div className="flex gap-4 flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <p className="font-semibold text-lg">{t('Dashboard.Stats.UsagePercentage')}</p>
              <p className={clsx(YekanBakhNumFont.className, 'text-sm text-gray-400 mt-1')}>
                {t('Dashboard.Stats.Quota', {
                  to: dayjs().calendar('jalali').format('DD MMMM YYYY'),
                  from: dayjs().calendar('jalali').subtract(1, 'month').format('DD MMMM YYYY'),
                })}
              </p>
            </div>

            <p className={clsx(YekanBakhNumFont.className, 'text-sm md:text-base')}>
              {t('Dashboard.Stats.GenerationReset', { date: `${dayjs().calendar('jalali').month()} ام` })}
            </p>
          </div>

          <div className="mt-4 md:mt-8 bg-gray-200 rounded-full">
            <div className="relative" style={{ width: `${progress}%` }}>
              <div className="absolute top-1/2 left-1/2 z-[1] -translate-y-1/2 -translate-x-1/2">
                <span className={clsx(YekanBakhNumFont.className, 'text-xs text-white')}>{progress}%</span>
              </div>
              <Progress value={100} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center w-full p-4 md:p-8">
          <div>
            <p className="font-semibold text-lg">{t('Dashboard.Stats.Usage30Days')}</p>
            <p className={clsx(YekanBakhNumFont.className, 'text-sm text-gray-400 mt-1')}>
              {t('Dashboard.Stats.Quota', {
                to: dayjs().calendar('jalali').format('DD MMMM YY'),
                from: dayjs().calendar('jalali').subtract(1, 'month').format('DD MMMM YY'),
              })}
            </p>
          </div>

          <div className="flex items-center text-lg">
            <p>{t('Dashboard.Stats.Generations')}:&nbsp;</p>
            <h2 className={clsx(YekanBakhNumFont.className)}>
              {plan?.generation} / {used}
            </h2>
          </div>
        </div>

        <MonthlyAreaChart data={chartData} />

        <div className="mt-4 p-4 md:p-8 border-t flex justify-between items-center text-xl">
          <p>{t('Dashboard.Stats.Plan')}:</p>
          <h2 className={clsx(YekanBakhNumFont.className)}>{plan?.name}</h2>
        </div>
      </div>
    </div>
  )
}

export default MonthlyChartContainer
