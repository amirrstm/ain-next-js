'use client'

import { useTranslations } from 'next-intl'

import { IconArrowLeft } from '@tabler/icons-react'
import clsx from 'clsx'
import dayjs from 'dayjs'
import 'dayjs/locale/fa'
import relativeTime from 'dayjs/plugin/relativeTime'
import jalaliday from 'jalaliday'
import { History, LibraryBig } from 'lucide-react'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import { SUB_CATEGORY_ICONS } from '@/modules/copywriting/utils'
import { YekanBakhNumFont } from '@/styles/fonts'

import HistoryContent from '../../components/Content'
import HistoryEmpty from '../../components/Empty'
import HistoryLoading from '../../components/Loading'
import useHistory from '../../hooks/useHistory'
import { IHistory } from '../../interface'

dayjs.locale('fa')
dayjs.extend(relativeTime)
dayjs.extend(jalaliday)

const UserHistoryContainer: React.FC = () => {
  const t = useTranslations()
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })

  const [selectedHistory, setSelectedHistory] = useState<IHistory>()

  const { isLoading, data, size, setSize } = useHistory()
  const items = (data || []).flatMap(page => page.data)

  const handleScroll = (event: any) => {
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
    <div className="p-2 md:py-3 md:px-8">
      <div className="flex items-center justify-between gap-2 md:mb-4 pt-2 pb-4 md:pb-0 border-b md:border-none">
        <div className="flex items-center gap-2">
          <History className="w-6 h-6" />
          <span className="text-lg">{t('Layout.Menus.History')}</span>
        </div>

        {isTabletOrMobile && selectedHistory && (
          <div className="flex gap-1 items-center text-blue-500 text-sm" onClick={() => setSelectedHistory(undefined)}>
            <span>بازگشت</span>
            <IconArrowLeft className="w-4 h-4" />
          </div>
        )}
      </div>

      {!isLoading && items.length === 0 && (
        <div className="bg-white h-[500px] shadow-md border rounded-xl overflow-hidden p-4">
          <HistoryEmpty title={t('History.EmptyList')} />
        </div>
      )}

      {isLoading ||
        (items.length > 0 && (
          <div className="grid grid-cols-12 md:gap-8 h-full min-h-[calc(100vh-100px)]">
            {isLoading ? (
              <HistoryLoading />
            ) : isTabletOrMobile && selectedHistory ? (
              <div className="col-span-12 mt-4">
                <HistoryContent
                  content={selectedHistory.content}
                  inputs={selectedHistory.inputValues}
                  appCategory={selectedHistory.category}
                />
              </div>
            ) : (
              <div
                onScroll={handleScroll}
                className="col-span-12 md:col-span-6 lg:col-span-4 bg-white h-full max-h-[calc(100vh-100px)] md:rounded-xl md:border md:shadow-md divide-y overflow-auto"
              >
                {items?.map(item => (
                  <div
                    key={item._id}
                    onClick={() => onSelect(item)}
                    className={clsx('p-4 cursor-pointer md:p-6 hover:bg-gray-100', {
                      'bg-gray-100': item._id === selectedHistory?._id,
                    })}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-secondary !text-white rounded-md flex items-center justify-center">
                        {SUB_CATEGORY_ICONS[item.category.slug] || <LibraryBig className="w-6 h-6" />}
                      </div>
                      <h3 className="font-semibold">{item.category.name}</h3>
                    </div>

                    {item.inputValues && (
                      <p className="text-sm line-clamp-3 mt-3 text-gray-600">{item.inputValues[0].value}</p>
                    )}

                    <p className={clsx(YekanBakhNumFont.className, 'text-xs text-gray-400 mt-3')}>
                      {dayjs(item.createdAt).fromNow()}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="hidden md:block md:col-span-6 lg:col-span-8 h-full border rounded-xl shadow-md bg-white overflow-hidden">
              {selectedHistory ? (
                <HistoryContent
                  content={selectedHistory.content}
                  inputs={selectedHistory.inputValues}
                  appCategory={selectedHistory.category}
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
