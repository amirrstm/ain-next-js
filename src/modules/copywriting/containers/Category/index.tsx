'use client'

import { useParams } from 'next/navigation'

import clsx from 'clsx'
import { Globe, Laptop, LibraryBig, Megaphone, Paperclip, Plus, Slack } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import DashboardMenu from '@/components/ui/dashboard-menu'
import Link from '@/components/ui/link'

import { useTranslation } from '@/app/i18n/client'

const CategoryContainer: React.FC = () => {
  const { lng } = useParams()
  const { t } = useTranslation(lng as string, 'Copywriting')

  const menus = [
    { title: 'همه‌ی دسته‌بندی ها', icon: <LibraryBig className="w-5 h-5" /> },
    { title: 'برند سازی و تبلیغات', icon: <Megaphone className="w-5 h-5" /> },
    { title: 'محتوای وب‌سایت', icon: <Laptop className="w-5 h-5" /> },
    { title: 'شبکه‌های مجازی', icon: <Slack className="w-5 h-5" /> },
    { title: 'ویرایستاری', icon: <Paperclip className="w-5 h-5" /> },
    { title: 'دیگر', icon: <Globe className="w-5 h-5" /> },
  ]

  return (
    <div className="p-4 xl:p-6">
      <div className="grid grid-cols-12 gap-4 lg:gap-5 xl:gap-6">
        <div className="hidden md:block col-span-6 lg:col-span-5 xl:col-span-3 2xl:col-span-3">
          <div className="border rounded-xl bg-white shadow-md block sticky top-8">
            <div className="p-4 border-b">
              <h1 className="text-xl font-bold">{t('Category.Title')}</h1>
            </div>

            <div className="p-4 space-y-4">
              {menus.map((menu, index) => (
                <DashboardMenu
                  key={index}
                  lng={lng as string}
                  icon={menu.icon}
                  title={<span className="text-sm">{menu.title}</span>}
                />
              ))}
            </div>

            <div className="p-4 border-t">
              <Button className="w-full gap-2" variant="secondary">
                <Plus className="w-5 h-5" />
                <span>{t('Category.RequestTemplate')}</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-7 xl:col-span-9 2xl:col-span-9">
          <div className="border rounded-xl bg-white shadow-md">
            <div className="p-4 flex items-center justify-between border-b">
              <div className="flex gap-2 items-center">
                <div className="bg-secondary w-8 h-8 rounded-md text-white flex justify-center items-center">
                  <LibraryBig className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold">{'همه‌ی دسته‌بندی ها'}</h2>
              </div>
            </div>

            <div className="p-4 w-full">
              <div className="grid grid-cols-12 gap-4">
                {Array.from({ length: 40 }).map((_, index) => (
                  <div className="col-span-12 xl:col-span-4" key={index}>
                    <Link
                      lng={lng as string}
                      href="/app/copywriting/1"
                      className={clsx(
                        'cursor-pointer group transition-all ease-in-out duration-200',
                        'border rounded-xl bg-gray-50 shadow-sm hover:shadow-primary p-3 min-h-[100px] flex gap-4 items-center',
                      )}
                    >
                      <LibraryBig className="w-6 h-6 group-hover:text-primary" />

                      <div className="flex flex-1 flex-col items-start transition-all ease-in-out duration-200 group-hover:scale-[1.01]">
                        <h3 className="font-semibold">{'برند سازی و تبلیغات'}</h3>
                        <p className="text-xs text-gray-500 mt-1 leading-5 line-clamp-2">
                          {'برند سازی و تبلیغات برای شرکتا و محصولات رای شرکت‌ها و محصولات برند س'}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryContainer
