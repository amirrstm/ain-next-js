import clsx from 'clsx'
import dayjs from 'dayjs'
import { useParams } from 'next/navigation'
import 'dayjs/locale/fa'
import jalaliday from 'jalaliday'
import { useMediaQuery } from 'react-responsive'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { YekanBakhNumFont } from '@/styles/fonts'

import type { DashboardStat } from '../../interface'

dayjs.extend(jalaliday)

interface Props {
  data: DashboardStat[]
}

const MonthlyAreaChart: React.FC<Props> = ({ data }) => {
  const { locale } = useParams()
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })

  return (
    <div className="h-[250px] w-full pt-4 pr-4 md:h-[350px] md:pt-8 md:pr-8 md:pb-3">
      <ResponsiveContainer
        className={clsx(locale === 'fa' && YekanBakhNumFont.className, 'w-full text-xs')}
        height="100%"
        width="100%"
      >
        <AreaChart
          data={data}
          height={400}
          margin={!isTabletOrMobile ? { left: 10, right: 20, top: 10 } : { left: -25, right: 10 }}
          width={1200}
        >
          <CartesianGrid strokeDasharray="1 1" />
          <YAxis
            className="text-[10px]"
            tickCount={isTabletOrMobile ? 6 : 8}
            tickLine={{ stroke: '#ccc' }}
            tickMargin={isTabletOrMobile ? 10 : 25}
          />
          <XAxis
            angle={-45}
            className="text-[10px]"
            dataKey="date"
            height={isTabletOrMobile ? 40 : 50}
            tickCount={isTabletOrMobile ? undefined : 8}
            tickFormatter={(value) =>
              dayjs(value)
                .locale(locale as string)
                .calendar(locale === 'fa' ? 'jalali' : 'gregory')
                .format('D-MMMM')
            }
            tickLine={false}
            tickMargin={isTabletOrMobile ? 15 : 15}
          />
          <Tooltip
            content={({ active, payload, label }) => (
              <CustomTooltip active={active} label={label} payload={payload as unknown as { value: number }[]} />
            )}
          />
          <Area
            dataKey="totalRecords"
            dot={isTabletOrMobile ? undefined : { r: 3, stroke: 'hsl(var(--primary))' }}
            fill="#b5b3d1"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            type="monotone"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MonthlyAreaChart

const CustomTooltip: React.FC<{ active?: boolean; payload?: { value: number }[]; label?: string }> = ({
  active,
  payload,
  label
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md bg-gray-700 p-1 px-3 text-center text-white text-xs shadow-lg">
        <p>{`${dayjs(label).calendar('jalali').format('DD MMMM YYYY')}`}</p>
        <p>{`تعداد: ${payload[0].value}`}</p>
      </div>
    )
  }

  return null
}
