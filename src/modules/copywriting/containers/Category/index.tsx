'use client'

import { useTranslations } from 'next-intl'

import { IconBooks } from '@tabler/icons-react'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'

import { Category } from '@/interface/Category.model'

import DashboardMenu from '@/components/ui/dashboard-menu'
import { Link } from '@/components/ui/navigation'

import CategoryLoading from '../../components/Loading'
import RequestTemplate from '../../components/RequestTemplate'
import useCategories from '../../hooks/useCategories'
import { CATEGORY_ICONS, SUB_CATEGORY_ICONS } from '../../utils'

const CategoryContainer: React.FC<{ inner?: boolean }> = ({ inner }) => {
  const t = useTranslations('Copywriting')
  const { data, isLoading } = useCategories()

  const [subMenus, setSubMenus] = useState<Category[]>([])
  const [selectedMenu, setSelectedMenu] = useState<Category>()

  useEffect(() => {
    if (data) {
      setSelectedMenu(data[0])

      const result: Category[] = []
      data[0].children.forEach(obj => {
        obj.children.forEach(obj2 => {
          result.push(obj2)
        })
      })

      setSubMenus(result)
    }
  }, [data])

  const onSelectParent = (menu: Category | string) => {
    if (menu === 'copywriting' && data) {
      setSelectedMenu(data[0])

      const result: Category[] = []
      data[0].children.forEach(obj => {
        obj.children.forEach(obj2 => {
          result.push(obj2)
        })
      })

      setSubMenus(result)
    } else if (typeof menu !== 'string') {
      setSelectedMenu(menu)
      setSubMenus(menu.children)
    }
  }

  if (isLoading) return <CategoryLoading />

  return (
    <div className={!inner ? 'p-4 xl:p-6' : ''}>
      <div className="grid grid-cols-12 gap-4 lg:gap-5 xl:gap-6">
        <div className="hidden md:block col-span-6 lg:col-span-5 xl:col-span-3 2xl:col-span-3">
          <div className="border rounded-xl bg-white shadow-md block sticky top-8">
            <div className="p-4 border-b">
              <h1 className="text-xl font-bold">{t('Category.Title')}</h1>
            </div>

            {data && (
              <div className="p-4 space-y-4">
                <DashboardMenu
                  icon={CATEGORY_ICONS['copywriting']}
                  onClick={() => onSelectParent('copywriting')}
                  title={<span className="text-sm">{t('Category.AllCategories')}</span>}
                />

                {data[0].children.map((menu, index) => (
                  <DashboardMenu
                    key={index}
                    icon={CATEGORY_ICONS[menu.slug]}
                    onClick={() => onSelectParent(menu)}
                    title={<span className="text-sm">{menu.name}</span>}
                  />
                ))}
              </div>
            )}

            <div className="p-4 border-t">
              <RequestTemplate />
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-7 xl:col-span-9 2xl:col-span-9 h-full">
          <div className="border rounded-xl bg-white shadow-md h-full">
            <div className="p-4 flex items-center justify-between border-b">
              <div className="flex gap-2 items-center">
                <div className="bg-secondary w-8 h-8 rounded-md text-white flex justify-center items-center">
                  {selectedMenu && CATEGORY_ICONS[selectedMenu.slug]}
                </div>
                <h2 className="md:text-xl font-bold">
                  {selectedMenu?.slug === 'copywriting' ? t('Category.AllCategories') : selectedMenu?.name}
                </h2>
              </div>
            </div>

            {data && (
              <div className="p-4 flex w-full overflow-x-auto md:hidden gap-2">
                {data[0].children.map((menu, index) => (
                  <DashboardMenu
                    key={index}
                    icon={CATEGORY_ICONS[menu.slug]}
                    onClick={() => onSelectParent(menu)}
                    className="flex-shrink-0 bg-gray-100"
                    title={<span className="text-sm">{menu.name}</span>}
                  />
                ))}
              </div>
            )}

            <div className="p-4 w-full">
              <div className="grid grid-cols-12 gap-4">
                {subMenus.map((menu, index) => (
                  <div className="col-span-12 xl:col-span-4" key={index}>
                    <Link
                      href={`/app/copywriting/${menu.slug}`}
                      className={clsx(
                        'cursor-pointer group transition-all ease-in-out duration-200',
                        'border rounded-xl bg-gray-50 shadow-sm hover:shadow-primary p-3 min-h-[100px] flex gap-4 items-center',
                      )}
                    >
                      <span className="group-hover:text-primary">
                        {SUB_CATEGORY_ICONS[menu.slug] || <IconBooks className="w-6 h-6" />}
                      </span>

                      <div className="flex flex-1 flex-col items-start transition-all ease-in-out duration-200 group-hover:scale-[1.01]">
                        <h3 className="font-semibold">{menu.name}</h3>
                        <p className="text-xs text-gray-500 mt-1 leading-5 line-clamp-2">{menu.description}</p>
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
