'use client'

import { IconArrowLeft, IconBooks } from '@tabler/icons-react'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import 'dayjs/locale/fa'
import relativeTime from 'dayjs/plugin/relativeTime'
import jalaliday from 'jalaliday'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import IconHistory from '@/icons/menus/history'
import { SUB_CATEGORY_ICONS } from '@/modules/copywriting/utils'
import { YekanBakhNumFont } from '@/styles/fonts'

import HistoryContent from '../../components/Content'
import HistoryEmpty from '../../components/Empty'
import HistoryLoading from '../../components/Loading'
import useHistory from '../../hooks/useHistory'

import type { IHistory } from '../../interface'

dayjs.extend(relativeTime)
dayjs.extend(jalaliday)

const UserHistoryContainer: React.FC = () => {
  const t = useTranslations()
  const { locale } = useParams()
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })

  const [selectedHistory, setSelectedHistory] = useState<IHistory>()

  const { isLoading, data, size, setSize } = useHistory()
  const items = (data || []).flatMap((page) => page.data)

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget
    if (scrollHeight - scrollTop === clientHeight) {
      setSize(size + 1)
    }
  }

  const onSelect = (item: IHistory) => {
    window.scrollTo(0, 0)
    setSelectedHistory(item)
  }

  return (
    <div className="p-2 md:px-8 md:py-3">
      <div className="flex items-center justify-between gap-2 border-b border-b-muted pt-2 pb-4 md:mb-4 md:border-none md:pb-0">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7">
            <IconHistory />
          </div>
          <span className="text-lg">{t('Layout.Menus.History')}</span>
        </div>

        {isTabletOrMobile && selectedHistory && (
          <div className="flex items-center gap-1 text-blue-500 text-sm" onClick={() => setSelectedHistory(undefined)}>
            <span>{t('Back')}</span>
            <IconArrowLeft className="h-4 w-4" />
          </div>
        )}
      </div>

      {!isLoading && items.length === 0 && (
        <div className="overflow-hidden rounded-xl border border-muted bg-background shadow-md">
          <HistoryEmpty title={t('History.EmptyList')} />
        </div>
      )}

      {isLoading ||
        (items.length > 0 && (
          <div className="grid h-full min-h-[calc(100vh-100px)] grid-cols-12 md:gap-8">
            {isLoading ? (
              <HistoryLoading />
            ) : isTabletOrMobile && selectedHistory ? (
              <div className="col-span-12 mt-4">
                <HistoryContent
                  appCategory={selectedHistory.category}
                  content={selectedHistory.content}
                  inputs={selectedHistory.inputValues}
                />
              </div>
            ) : (
              <div
                className="col-span-12 mt-2 h-full max-h-[calc(100vh-100px)] divide-y divide-muted overflow-auto rounded-xl bg-card md:col-span-6 md:mt-0 md:border md:border-muted md:shadow-md lg:col-span-4"
                onScroll={handleScroll}
              >
                {items?.map((item) => (
                  <div
                    className={clsx('cursor-pointer p-4 hover:bg-neutral-100 md:p-6 dark:hover:bg-neutral-800', {
                      'bg-neutral-100 dark:bg-neutral-800': item._id === selectedHistory?._id
                    })}
                    key={item._id}
                    onClick={() => onSelect(item)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8">
                        {SUB_CATEGORY_ICONS[item.category.slug] || <IconBooks className="h-6 w-6" />}
                      </div>
                      <h3 className="font-semibold">{item.category.name}</h3>
                    </div>

                    {item.inputValues && <p className="mt-3 line-clamp-3 text-gray-600 text-sm">{item.inputValues[0].value}</p>}

                    <p className={clsx(locale === 'fa' && YekanBakhNumFont.className, 'mt-3 text-gray-400 text-xs')}>
                      {dayjs(item.createdAt)
                        .locale(locale as string)
                        .calendar(locale === 'fa' ? 'jalali' : 'gregory')
                        .fromNow()}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="relative hidden h-full overflow-hidden rounded-xl border border-muted bg-background shadow-md md:col-span-6 md:block lg:col-span-8">
              {selectedHistory ? (
                <HistoryContent
                  appCategory={selectedHistory.category}
                  content={selectedHistory.content}
                  inputs={selectedHistory.inputValues}
                />
              ) : (
                <HistoryEmpty title={t('History.EmptyContent')} />
              )}
            </div>
          </div>
        ))}
    </div>
  )
}

export default UserHistoryContainer
