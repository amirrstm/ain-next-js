import Image from 'next/image'

import { IconUser } from '@tabler/icons-react'
import clsx from 'clsx'
import dayjs from 'dayjs'
import 'dayjs/locale/fa'
import relativeTime from 'dayjs/plugin/relativeTime'
import jalaliday from 'jalaliday'
import React, { useEffect, useRef } from 'react'

import { YekanBakhNumFont } from '@/styles/fonts'

import { ChatMessage } from '../../interface'

dayjs.locale('fa')
dayjs.extend(relativeTime)
dayjs.extend(jalaliday)

interface Props {
  loading?: boolean
  messages: ChatMessage[]
}

const ChatMessages: React.FC<Props> = ({ messages, loading }) => {
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [loading, messages])

  return (
    <div className="space-y-2 md:space-y-6">
      {messages.map((message, index) => {
        if (message.role === 'user') {
          return <User key={index} message={message.content} time={message.time} />
        } else {
          return <System key={index} message={message.content} time={message.time} />
        }
      })}

      {loading && (
        <div className="pt-4">
          <System loading />
        </div>
      )}

      <div style={{ float: 'left', clear: 'both' }} ref={endRef} />
    </div>
  )
}

export default ChatMessages

const System: React.FC<{ message?: string; time?: string; loading?: boolean }> = ({ message, time, loading }) => {
  return (
    <div className="flex items-start gap-2.5">
      <div className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-secondary flex items-center justify-center p-1">
        <Image alt="logo" src="/images/logo-small.png" width={32} height={32} className="rounded-full object-contain" />
      </div>

      {loading ? (
        <div className="flex items-center mt-1 md:mt-2 mr-2">
          <p className="text-gray-500 text-xs md:text-base">در حال تولید متن</p>
          <div className="pr-8">
            <div className="loader" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col min-w-[200px] flex-1 max-w-[90%] md:max-w-[60%] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
          <div className="flex items-center space-x-2 space-x-reverse justify-between">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">آی نویس</span>
            {time && (
              <span
                className={clsx(YekanBakhNumFont.className, 'text-xs font-normal text-gray-500 dark:text-gray-400')}
              >
                {dayjs(time).fromNow()}
              </span>
            )}
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: String(message).replace(/(?:\r\n|\r|\n)/g, '<br>') }}
            className="text-xs md:text-sm font-normal py-2.5 text-gray-900 dark:text-white leading-[1.75]"
          />
        </div>
      )}
    </div>
  )
}

const User: React.FC<{ message: string; time?: string }> = ({ message, time }) => {
  return (
    <div className="flex items-start gap-2.5">
      <div className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-secondary flex items-center justify-center">
        <IconUser className="w-4 h-4 md:w-6 md:h-6 text-white" />
      </div>
      <div className="flex flex-col min-w-[200px] flex-1 max-w-[90%] md:max-w-[60%] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
        <div className="flex items-center space-x-2 space-x-reverse justify-between">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">کاربر</span>
          {time && (
            <span className={clsx(YekanBakhNumFont.className, 'text-xs font-normal text-gray-500 dark:text-gray-400')}>
              {dayjs(time).fromNow()}
            </span>
          )}
        </div>
        <p className="text-xs md:text-sm font-normal py-2.5 text-gray-900 dark:text-white leading-[1.75]">{message}</p>
      </div>
    </div>
  )
}
