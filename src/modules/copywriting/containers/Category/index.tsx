'use client'

import { IconBooks } from '@tabler/icons-react'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import DashboardMenu from '@/components/ui/dashboard-menu'
import { Link } from '@/components/ui/navigation'
import useUserStore from '@/lib/store/auth'

import CategoryLoading from '../../components/Loading'
import RequestTemplate from '../../components/RequestTemplate'
import useCategories from '../../hooks/useCategories'
import { CATEGORY_ICONS, SUB_CATEGORY_ICONS } from '../../utils'

import type React from 'react'
import type { Category } from '@/interface/Category.model'

const CategoryContainer: React.FC<{ inner?: boolean }> = ({ inner }) => {
  const { user } = useUserStore()
  const t = useTranslations('Copywriting')
  const { data, isLoading } = useCategories()

  const [subMenus, setSubMenus] = useState<Category[]>([])
  const [selectedMenu, setSelectedMenu] = useState<Category>()

  useEffect(() => {
    if (data) {
      setSelectedMenu(data[0])

      const result: Category[] = []
      data[0].children.forEach((obj) => {
        obj.children.forEach((obj2) => {
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
      data[0].children.forEach((obj) => {
        obj.children.forEach((obj2) => {
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
    <div className={!inner ? 'p-2 xl:p-4' : ''}>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6 hidden md:block lg:col-span-5 xl:col-span-3 2xl:col-span-3">
          <div className="sticky top-4 block rounded-xl border border-muted bg-card shadow-md">
            <div className="border-b border-b-muted p-4">
              <h1 className="font-bold text-xl">{t('Category.Title')}</h1>
            </div>

            {data && (
              <div className="space-y-4 p-4">
                <DashboardMenu
                  active={selectedMenu?.slug === 'copywriting'}
                  icon={CATEGORY_ICONS['copywriting']}
                  onClick={() => onSelectParent('copywriting')}
                  title={<span className="text-sm">{t('Category.AllCategories')}</span>}
                />

                {data[0].children.map((menu, index) => (
                  <DashboardMenu
                    active={selectedMenu?.slug === menu.slug}
                    icon={CATEGORY_ICONS[menu.slug]}
                    key={index}
                    onClick={() => onSelectParent(menu)}
                    title={<span className="text-sm">{menu.name}</span>}
                  />
                ))}
              </div>
            )}

            {user && (
              <div className="border-t border-t-muted p-4">
                <RequestTemplate />
              </div>
            )}
          </div>
        </div>

        <div className="col-span-12 h-full md:col-span-6 lg:col-span-7 xl:col-span-9 2xl:col-span-9">
          <div className="h-full rounded-xl border border-muted bg-card shadow-md">
            <div className="flex items-center justify-between border-b border-b-muted p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-foreground text-background">
                  {selectedMenu && CATEGORY_ICONS[selectedMenu.slug]}
                </div>
                <h2 className="font-bold md:text-xl">
                  {selectedMenu?.slug === 'copywriting' ? t('Category.AllCategories') : selectedMenu?.name}
                </h2>
              </div>
            </div>

            {data && (
              <div className="flex w-full overflow-x-auto px-1 py-4 md:hidden">
                {data[0].children.map((menu, index) => (
                  <DashboardMenu
                    className="flex-shrink-0 bg-card"
                    icon={CATEGORY_ICONS[menu.slug]}
                    key={index}
                    onClick={() => onSelectParent(menu)}
                    title={<span className="text-sm">{menu.name}</span>}
                  />
                ))}
              </div>
            )}

            <div className="w-full p-4">
              <div className="grid grid-cols-12 gap-4">
                {subMenus.map((menu, index) => (
                  <div className="col-span-12 xl:col-span-4" key={index}>
                    <Link
                      className={clsx(
                        'group cursor-pointer transition-all duration-200 ease-in-out',
                        'flex min-h-[100px] items-center gap-6 rounded-xl border border-muted bg-neutral-100 p-3 shadow-sm hover:shadow-primary md:flex-col md:gap-4 dark:bg-neutral-800/80 dark:backdrop-blur-xl'
                      )}
                      href={`/app/copywriting/${menu.slug}`}
                    >
                      <span className="group-hover:text-primary">
                        {SUB_CATEGORY_ICONS[menu.slug] || <IconBooks className="h-12 w-12" />}
                      </span>

                      <div className="flex flex-1 flex-col transition-all duration-200 ease-in-out group-hover:scale-[1.01] md:items-center md:text-center">
                        <h3 className="font-semibold">{menu.name}</h3>
                        <p className="flex min-h-[40px] items-center pt-1 text-gray-500 text-xs leading-5">
                          <span className="line-clamp-2">{menu.description}</span>
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
