'use client'

import { IconLoader, IconSend2, IconTrash } from '@tabler/icons-react'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
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
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import Loader from '@/components/ui/loader'
import IconChat from '@/icons/menus/chat'
import API from '@/lib/api'
import useUserStore from '@/lib/store/auth'

import ChatMessages from '../../components/Messages'
import useMessages from '../../hooks/useMessages'
import { deleteChat, sendMessage } from '../../service'

import type { ChatMessage } from '../../interface'

const ChatContainer: React.FC = () => {
  const router = useRouter()

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
      inputRef.current.style.height = `${scrollHeight}px`
    }
  }, [])

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
      setMessages((prev) => [
        ...prev,
        { _id: Math.random().toString(), content: value, role: 'user', time: new Date().toISOString() }
      ])
      send({ content: value, role: 'user' })
        .then((data) => {
          setMessages(data.messages)
          if (user) {
            setUser({
              ...user,
              userPlan: {
                ...user.userPlan,
                used: { ...user.userPlan.used, generation: user.userPlan.used.generation + 1 }
              }
            })
          }
        })
        .catch((e) => {
          setMessages((prev) => prev.slice(0, prev.length - 1))

          if (e.status === 5215) {
            toast.error(t('PlanError', { error: e.message }))
          }
        })
    }
  }

  const onDelete = () => {
    deleteChat()
    setMessages([])
  }

  return (
    <div className="h-[calc(100vh-80px)] min-h-[200px] md:h-[calc(100vh-24px)] md:p-8">
      <div className="flex h-full flex-col justify-between bg-background md:rounded-2xl md:border md:border-muted">
        <div className="w-full border-b border-b-muted p-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-1 items-center gap-2">
              <div className="h-12 w-12">
                <IconChat />
              </div>
              <div className="flex-1">
                <h1 className="font-bold md:text-xl">{t('Title')}</h1>
                <h2 className="hidden text-gray-500 md:block">{t('Description')}</h2>
              </div>
            </div>

            {messages.length > 0 && (
              <AlertDialog>
                <AlertDialogTrigger>
                  <div className="flex cursor-pointer items-center justify-center rounded-full border p-1 text-gray-400 hover:border-red-500 hover:text-red-500 md:p-3">
                    <IconTrash className="h-5 w-5 md:h-7 md:w-7" />
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{t('History.Title')}</AlertDialogTitle>
                    <AlertDialogDescription>{t('History.Description')}</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="ml-2">{t('History.Cancel')}</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-500" onClick={onDelete}>
                      {t('History.Delete')}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {messages.length === 0 ? (
            <div>
              {isLoading ? (
                <div className="flex flex-col items-center gap-3 p-4 text-center">
                  <div className="h-10 w-10">
                    <Loader />
                  </div>
                  <span className="flex-1 leading-normal">{t('Loading')}</span>
                </div>
              ) : (
                <div className="flex justify-center p-6 text-center">
                  <div className="max-w-sm rounded-lg border border-muted p-4 text-center shadow-md">
                    <p className="flex text-neutral-500">
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

        <div className="border-t border-t-muted border-b px-2 py-1 md:border-b-transparent md:p-4">
          <div className="flex items-center">
            <textarea
              className="max-h-[100px] flex-1 resize-none border-none bg-transparent text-xs outline-none md:p-2 md:text-base placeholder:dark:text-neutral-600"
              disabled={isLoading}
              onChange={onChange}
              onKeyDown={onKeyDown}
              placeholder={t('InputPlaceholder')}
              ref={inputRef}
              rows={1}
              value={value}
            />

            <div
              className={clsx('flex h-9 w-9 items-center justify-center rounded-full bg-primary md:h-10 md:w-10', {
                'cursor-pointer': !isMutating,
                'pointer-events-none': isMutating || isLoading || !value
              })}
              onClick={onGenerate}
            >
              {isMutating ? (
                <IconLoader className="h-5 w-5 animate-spin text-white" />
              ) : (
                <IconSend2 className="h-6 w-6 text-white rtl:rotate-180" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-1 text-center" ref={endRef}>
        <p className="text-[10px] text-neutral-600 md:text-xs">{t('Info')}</p>
      </div>
    </div>
  )
}

export default ChatContainer
