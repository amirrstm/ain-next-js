import Image from 'next/image'

import { IconUser } from '@tabler/icons-react'
import clsx from 'clsx'
import dayjs from 'dayjs'
import 'dayjs/locale/fa'
import relativeTime from 'dayjs/plugin/relativeTime'
import jalaliday from 'jalaliday'

import { YekanBakhNumFont } from '@/styles/fonts'

dayjs.locale('fa')
dayjs.extend(relativeTime)
dayjs.extend(jalaliday)

const systemMessage =
  'لورم ایپسوم متن سیستمی است که برای تست ایجاد شده است. این پیام از سیستم ارسال شده است. لورم ایپسوم متن سیستمی است که برای تست ایجاد شده است. این پیام از سیستم ارسال شده است. لورم ایپسوم متن سیستمی است که برای تست ایجاد شده است. این پیام از سیستم ارسال شده است. لورم ایپسوم متن سیستمی است که برای تست ایجاد شده است. این پیام از سیستم ارسال شده است. لورم ایپسوم متن سیستمی است که برای تست ایران ایجاد شده است. این پیام از سیستم ارسال شده است.'

const ChatMessages = () => {
  return (
    <div className="space-y-2 md:space-y-6">
      <User
        time={dayjs().subtract(2, 'hour').toISOString()}
        message="یک متن با استفاده از مدل های هوش مصنوعی برای تاریخ معاصر ایران ایجاد کن"
      />

      <System time={dayjs().subtract(1, 'hour').toISOString()} message={systemMessage} />

      <User
        time={dayjs().subtract(2, 'hour').toISOString()}
        message="یک متن با استفاده از مدل های هوش مصنوعی برای تاریخ معاصر ایران ایجاد کن"
      />

      <System time={dayjs().subtract(1, 'hour').toISOString()} message={systemMessage} />

      <div className="pt-4">
        <System loading />
      </div>
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
            <span className={clsx(YekanBakhNumFont.className, 'text-xs font-normal text-gray-500 dark:text-gray-400')}>
              {dayjs(time).fromNow()}
            </span>
          </div>

          <p className="text-xs md:text-sm font-normal py-2.5 text-gray-900 dark:text-white leading-[1.75]">
            {message}
          </p>
        </div>
      )}
    </div>
  )
}

const User: React.FC<{ message: string; time: string }> = ({ message, time }) => {
  return (
    <div className="flex items-start gap-2.5">
      <div className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-secondary flex items-center justify-center">
        <IconUser className="w-4 h-4 md:w-6 md:h-6 text-white" />
      </div>
      <div className="flex flex-col min-w-[200px] flex-1 max-w-[90%] md:max-w-[60%] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
        <div className="flex items-center space-x-2 space-x-reverse justify-between">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">کاربر</span>
          <span className={clsx(YekanBakhNumFont.className, 'text-xs font-normal text-gray-500 dark:text-gray-400')}>
            {dayjs(time).fromNow()}
          </span>
        </div>
        <p className="text-xs md:text-sm font-normal py-2.5 text-gray-900 dark:text-white leading-[1.75]">{message}</p>
      </div>
    </div>
  )
}
