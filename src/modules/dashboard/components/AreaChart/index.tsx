import clsx from 'clsx'
import dayjs from 'dayjs'
import 'dayjs/locale/fa'
import jalaliday from 'jalaliday'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { YekanBakhNumFont } from '@/styles/fonts'

import { DashboardStat } from '../../interface'

dayjs.locale('fa')
dayjs.extend(jalaliday)

interface Props {
  data: DashboardStat[]
}

const MonthlyAreaChart: React.FC<Props> = ({ data }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })

  return (
    <div className="w-full h-[250px] md:h-[350px] pt-4 pr-4 md:pr-8 md:pt-8 md:pb-3">
      <ResponsiveContainer width="100%" height="100%" className={clsx(YekanBakhNumFont.className, 'text-xs w-full')}>
        <AreaChart
          data={data}
          width={1200}
          height={400}
          margin={!isTabletOrMobile ? { right: 20, top: 10, left: 10 } : { left: -25, right: 10 }}
        >
          <CartesianGrid strokeDasharray="1 1" />
          <YAxis
            tickMargin={isTabletOrMobile ? 10 : 25}
            className="text-[10px]"
            tickLine={{ stroke: '#ccc' }}
            tickCount={isTabletOrMobile ? 6 : 8}
          />
          <XAxis
            angle={-45}
            dataKey="date"
            tickLine={false}
            className="text-[10px]"
            height={isTabletOrMobile ? 40 : 50}
            tickMargin={isTabletOrMobile ? 15 : 15}
            tickCount={isTabletOrMobile ? undefined : 8}
            tickFormatter={value => dayjs(value).calendar('jalali').format('D-MMMM')}
          />
          <Tooltip
            content={({ active, payload, label }) => <CustomTooltip active={active} payload={payload} label={label} />}
          />
          <Area
            dataKey="totalRecords"
            type="monotone"
            fill="#b5b3d1"
            strokeWidth={2}
            stroke="hsl(var(--primary))"
            dot={isTabletOrMobile ? undefined : { stroke: 'hsl(var(--primary))', r: 3 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MonthlyAreaChart

const CustomTooltip: React.FC<{ active?: boolean; payload?: any[]; label?: any }> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-700 p-1 px-3 shadow-lg rounded-md text-xs text-white text-center">
        <p>{`${dayjs(label).calendar('jalali').format('DD MMMM YYYY')}`}</p>
        <p>{`تعداد: ${payload[0].value}`}</p>
      </div>
    )
  }

  return null
}
