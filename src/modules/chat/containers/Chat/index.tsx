'use client'

import { useTranslations } from 'next-intl'

import { IconLoader, IconMessage2Bolt, IconSend2 } from '@tabler/icons-react'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'

import ChatMessages from '../../components/Messages'

const ChatContainer: React.FC = () => {
  const t = useTranslations('Chat')
  const [value, setValue] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = '0px'
      const scrollHeight = inputRef.current.scrollHeight
      inputRef.current.style.height = scrollHeight + 'px'
    }
  }, [value])

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length < 1000) {
      setValue(e.target.value)
    }
  }

  return (
    <div className="pb-8 md:p-8 h-[calc(100vh-80px)] md:h-[calc(100vh-40px)] min-h-[200px]">
      <div className="md:border md:rounded-2xl bg-white h-full flex flex-col justify-between">
        <div className="p-4 flex items-center justify-between border-b">
          <div className="flex gap-2">
            <div className="bg-secondary w-8 h-8 rounded-md text-white flex justify-center items-center">
              <IconMessage2Bolt />
            </div>
            <div className="flex-1">
              <h1 className="md:text-xl font-bold">{t('Title')}</h1>
              <h2 className="text-gray-500 hidden md:block">{t('Description')}</h2>
            </div>
          </div>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          <ChatMessages />
        </div>

        <div className="px-2 py-1 md:p-4 border-t border-b md:border-b-transparent">
          <div className="flex items-center">
            <textarea
              rows={1}
              autoFocus
              ref={inputRef}
              onChange={onChange}
              placeholder={t('InputPlaceholder')}
              className="flex-1 border-none md:p-2 max-h-[100px] resize-none outline-none text-xs md:text-base"
            />

            <div
              className={clsx('w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-secondary rounded-full', {
                'cursor-pointer': !loading,
                'pointer-events-none': loading,
              })}
            >
              {loading ? (
                <IconLoader className="h-5 w-5 animate-spin text-white" />
              ) : (
                <IconSend2 className="w-6 h-6 rotate-180 text-white" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center pt-1">
        <p className="text-[10px] md:text-xs text-gray-400">چت بات ممکن است اشتباه کند، نکات مهم را در نظر بگیرید.</p>
      </div>
    </div>
  )
}

export default ChatContainer
