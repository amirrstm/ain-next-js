'use client'

import { useTranslations } from 'next-intl'

import { IconGridDots, IconHistory, IconMessage2Bolt, IconPencil } from '@tabler/icons-react'
import React from 'react'

import { Link } from '@/components/ui/navigation'

const QuickAccess: React.FC = () => {
  const t = useTranslations('Layout')

  return (
    <div className="mt-4 md:mt-10">
      <p className="flex items-center gap-2">
        <IconGridDots className="w-4 h-4 md:w-7 md:h-7 text-primary" />
        <span className="text-base md:text-xl">{t('Dashboard.Access.QuickAccess')}</span>
      </p>

      <div className="grid grid-cols-12 gap-4 mt-6">
        <Link
          href="/app/copywriting"
          className="col-span-5 rounded-xl border border-muted bg-card group hover:scale-105 transition-all duration-200 ease-in-out"
        >
          <div className="p-4">
            <div className="border border-muted w-12 h-12 rounded-lg flex justify-center items-center group-hover:border-primary transition-all duration-200 ease-in-out">
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                <IconPencil className="text-white w-5 h-5" />
              </div>
            </div>

            <div className="mt-4">
              <p className="text-lg font-semibold">{t('Menus.Copywriting')}</p>
              <p className="text-xs text-gray-600 mt-1">با استفاده از الگوهای نوشتاری، متن های خلاقانه تولید کنید</p>
            </div>
          </div>
        </Link>

        <Link
          href="/app/history"
          className="col-span-3 rounded-xl border border-muted bg-card group hover:scale-105 transition-all duration-200 ease-in-out"
        >
          <div className="p-4">
            <div className="border border-muted w-12 h-12 rounded-lg flex justify-center items-center group-hover:border-primary transition-all duration-200 ease-in-out">
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                <IconHistory className="text-white w-5 h-5" />
              </div>
            </div>

            <div className="mt-4">
              <p className="text-lg font-semibold">{t('Menus.History')}</p>
              <p className="text-xs text-gray-600 mt-1">تاریخچه محتواهای تولید شده را ببینید</p>
            </div>
          </div>
        </Link>

        <Link
          href="/app/chat"
          className="col-span-4 rounded-xl border border-muted bg-card group hover:scale-105 transition-all duration-200 ease-in-out"
        >
          <div className="p-4">
            <div className="border border-muted w-12 h-12 rounded-lg flex justify-center items-center group-hover:border-primary transition-all duration-200 ease-in-out">
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                <IconMessage2Bolt className="text-white w-5 h-5" />
              </div>
            </div>

            <div className="mt-4">
              <p className="text-lg font-semibold">{t('Menus.Chat')}</p>
              <p className="text-xs text-gray-600 mt-1">هر سوالی دارید از هوش مصنوعی بپرسید</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default QuickAccess
