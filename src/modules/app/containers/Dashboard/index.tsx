'use client'

import { IconMessage2Bolt, IconPencil } from '@tabler/icons-react'
import clsx from 'clsx'
import React from 'react'

import { Link } from '@/components/ui/navigation'

import DashboardHeader from '../../components/DashboardHeader'
import DashboardStat from '../../components/DashboardStat'
import QuickAccess from '../../components/QuickAccess'

const DashboardContainer: React.FC = () => {
  return (
    <div className="p-2 md:p-6">
      <DashboardHeader />

      <DashboardStat />

      <div className="hidden md:block">
        <QuickAccess />
      </div>

      <div className="block md:hidden mt-6 space-y-6">
        <Link
          href="/app/copywriting"
          className={clsx(
            'cursor-pointer group transition-all ease-in-out duration-200',
            'border rounded-xl bg-gray-50 shadow-sm hover:shadow-primary p-4 flex gap-4 items-center',
          )}
        >
          <span className="group-hover:text-primary px-4 h-14 flex items-center justify-center rounded-lg bg-secondary">
            <IconPencil className="w-6 h-6 text-white" />
          </span>

          <div className="flex flex-1 flex-col items-start transition-all ease-in-out duration-200 group-hover:scale-[1.01]">
            <h3 className="font-semibold">تولید محتوا</h3>
            <p className="text-xs text-gray-500 mt-1 leading-5 line-clamp-2">
              متن های شگفت انگیز و جذاب، با استفاده از دسته‌بندی های متنوع بسازید.
            </p>
          </div>
        </Link>

        <Link
          href="/app/chat"
          className={clsx(
            'cursor-pointer group transition-all ease-in-out duration-200',
            'border rounded-xl bg-gray-50 shadow-sm hover:shadow-primary p-4 flex gap-4 items-center',
          )}
        >
          <span className="group-hover:text-primary px-4 h-14 flex items-center justify-center rounded-lg bg-secondary">
            <IconMessage2Bolt className="w-6 h-6 text-white" />
          </span>

          <div className="flex flex-1 flex-col items-start transition-all ease-in-out duration-200 group-hover:scale-[1.01]">
            <h3 className="font-semibold">گفت و گو با هوش مصنوعی</h3>
            <p className="text-xs text-gray-500 mt-1 leading-5 line-clamp-2">
              هر سوالی دارید از هوش مصنوعی آی نویس بپرسید و به گفت‌و‌گو بپردازید.
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default DashboardContainer
