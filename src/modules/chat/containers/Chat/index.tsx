'use client'

import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

import { IconBolt, IconLoader, IconMessage2Bolt, IconSend2, IconTrash } from '@tabler/icons-react'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import useSWRMutation from 'swr/mutation'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import Loader from '@/components/ui/loader'
import { useToast } from '@/components/ui/use-toast'

import API from '@/lib/api'
import useUserStore from '@/lib/store/auth'

import ChatMessages from '../../components/Messages'
import useMessages from '../../hooks/useMessages'
import { ChatMessage } from '../../interface'
import { deleteChat, sendMessage } from '../../service'

const ChatContainer: React.FC = () => {
  const router = useRouter()
  const { toast } = useToast()
  const t = useTranslations('Chat')
  const { user, setUser } = useUserStore()
  const endRef = useRef<HTMLDivElement>(null)
  const { data, isLoading } = useMessages(!!user)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { trigger: send, isMutating } = useSWRMutation(API.CHAT.MESSAGE, sendMessage)

  const [value, setValue] = useState<string>('')
  const [messages, setMessages] = useState<ChatMessage[]>([])

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    if (data) {
      setMessages(data.messages)
    }
  }, [data])

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

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onGenerate()
    }
  }

  const onGenerate = () => {
    if (!user) {
      router.push('/login?returnUrl=/app/chat')
      return
    } else if (value) {
      setValue('')
      setMessages(prev => [
        ...prev,
        { role: 'user', content: value, _id: Math.random().toString(), time: new Date().toISOString() },
      ])
      send({ role: 'user', content: value })
        .then(data => {
          setMessages(data.messages)
          if (user) {
            setUser({ ...user, userPlan: { ...user.userPlan, used: user.userPlan.used + 1 } })
          }
        })
        .catch(e => {
          setMessages(prev => prev.slice(0, prev.length - 1))

          if (e.status === 5215) {
            toast({ title: `${e.error}، لطفا حساب خود را ارتقا دهید.`, variant: 'destructive' })
          }
        })
    }
  }

  const onDelete = () => {
    deleteChat()
    setMessages([])
  }

  return (
    <div className="md:p-8 h-[calc(100vh-80px)] md:h-[calc(100vh-40px)] min-h-[200px]">
      <div className="md:border md:border-muted md:rounded-2xl bg-background h-full flex flex-col justify-between">
        <div className="p-4 w-full border-b border-b-muted">
          <div className="flex gap-2 items-center justify-between">
            <div className="flex flex-1 gap-2">
              <div className="bg-secondary w-8 h-8 rounded-md text-white flex justify-center items-center">
                <IconMessage2Bolt />
              </div>
              <div className="flex-1">
                <h1 className="md:text-xl font-bold">{t('Title')}</h1>
                <h2 className="text-gray-500 hidden md:block">{t('Description')}</h2>
              </div>
            </div>

            {messages.length > 0 && (
              <AlertDialog>
                <AlertDialogTrigger>
                  <div className="border rounded-full p-1 md:p-3 cursor-pointer flex justify-center items-center text-gray-400 hover:text-red-500 hover:border-red-500">
                    <IconTrash className="w-5 md:w-7 h-5 md:h-7 " />
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>آیا از پاک کردن تاریخچه چت اطمینان دارید؟</AlertDialogTitle>
                    <AlertDialogDescription>
                      این عمل برگشت پذیر نیست، و تمام تاریخچه چت شما برای همیشه پاک خواهد شد
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="ml-2">انصراف</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-500" onClick={onDelete}>
                      پاک کن
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div>
              {isLoading ? (
                <div className="flex flex-col items-center text-center gap-3 p-4">
                  <div className="w-10 h-10">
                    <Loader />
                  </div>
                  <span className="flex-1 leading-normal">{t('Loading')}</span>
                </div>
              ) : (
                <div className="p-6 text-center flex justify-center">
                  <div className="border shadow-md rounded-lg max-w-sm p-4 text-center">
                    <p className="text-gray-500 flex">
                      <IconBolt className="text-primary" />
                      <span className="flex-1 leading-normal">{t('Empty')}</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <ChatMessages loading={isMutating} messages={messages} />
          )}
        </div>

        <div className="px-2 py-1 md:p-4 border-t border-t-muted border-b md:border-b-transparent">
          <div className="flex items-center">
            <textarea
              rows={1}
              autoFocus
              value={value}
              ref={inputRef}
              onChange={onChange}
              disabled={isLoading}
              onKeyDown={onKeyDown}
              placeholder={t('InputPlaceholder')}
              className="flex-1 border-none md:p-2 max-h-[100px] resize-none outline-none text-xs md:text-base"
            />

            <div
              onClick={onGenerate}
              className={clsx('w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-secondary rounded-full', {
                'cursor-pointer': !isMutating,
                'pointer-events-none': isMutating || isLoading || !value,
              })}
            >
              {isMutating ? (
                <IconLoader className="h-5 w-5 animate-spin text-white" />
              ) : (
                <IconSend2 className="w-6 h-6 rotate-180 text-white" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div ref={endRef} className="text-center pt-1">
        <p className="text-[10px] md:text-xs text-gray-400">چت بات ممکن است اشتباه کند، نکات مهم را در نظر بگیرید.</p>
      </div>
    </div>
  )
}

export default ChatContainer
