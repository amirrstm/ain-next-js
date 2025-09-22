import { javascript } from '@codemirror/lang-javascript'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import { IconClipboard, IconUser } from '@tabler/icons-react'
import { atomone } from '@uiw/codemirror-theme-atomone'
import CodeMirror from '@uiw/react-codemirror'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import 'dayjs/locale/fa'
import relativeTime from 'dayjs/plugin/relativeTime'
import jalaliday from 'jalaliday'
import { useEffect, useRef, useState } from 'react'

import IconLogoSmall from '@/icons/logos/logo-small'
import { YekanBakhNumFont } from '@/styles/fonts'

import type React from 'react'
import type { ChatMessage } from '../../interface'

dayjs.extend(jalaliday)
dayjs.extend(relativeTime)

type BlockType = { type: string; language?: string; content: string }

interface Props {
  loading?: boolean
  messages: ChatMessage[]
}

const ChatMessages: React.FC<Props> = ({ messages, loading }) => {
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

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

      <div ref={endRef} style={{ clear: 'both', float: 'left' }} />
    </div>
  )
}

export default ChatMessages

const System: React.FC<{ message?: string; time?: string; loading?: boolean }> = ({ message, time, loading }) => {
  const { locale } = useParams()
  const t = useTranslations('Chat')
  const [systemMessage, setSystemMessage] = useState<BlockType[]>([])

  useEffect(() => {
    if (message) {
      setSystemMessage(separateCodeAndText(message))
    }
  }, [message])

  const onCopy = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="flex items-start gap-2.5">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black p-1 md:h-10 md:w-10">
        <IconLogoSmall bg="hsl(var(--background))" fill="hsl(var(--foreground))" />
      </div>

      {loading ? (
        <div className="mt-1 mr-2 flex items-center md:mt-2">
          <p className="text-gray-500 text-xs md:text-base">{t('Writing')}</p>
        </div>
      ) : (
        <div
          className={clsx(
            'flex min-w-[200px] flex-1 flex-col rounded-e-xl rounded-es-xl border-gray-200 bg-neutral-200 p-4 leading-1.5 dark:bg-neutral-800',
            {
              'max-w-[90%] md:max-w-[60%]': systemMessage.length === 0,
              'max-w-[90%] md:max-w-[80%]': systemMessage.length > 0
            }
          )}
        >
          <div className="flex items-center justify-between space-x-2 space-x-reverse">
            <span className="font-semibold text-gray-900 text-xs dark:text-white">{t('Us')}</span>
            {time && (
              <span
                className={clsx(
                  locale === 'fa' && YekanBakhNumFont.className,
                  'font-normal text-gray-500 text-xs dark:text-gray-400'
                )}
              >
                {dayjs(time)
                  .locale(locale as string)
                  .fromNow()}
              </span>
            )}
          </div>

          {systemMessage?.map((block, index) =>
            block.type === 'code' ? (
              <div className="relative overflow-hidden rounded-lg" dir="ltr" key={`code-${index}`} spellCheck={false}>
                <CodeMirror
                  editable={false}
                  extensions={
                    block.language !== 'bash'
                      ? [javascript({ jsx: true, typescript: true })]
                      : [markdown({ base: markdownLanguage, codeLanguages: languages })]
                  }
                  theme={atomone}
                  value={block.content.endsWith('\n') ? block.content.replace(/\n$/, '') : block.content}
                />

                <div className="absolute right-1 bottom-1">
                  <IconClipboard className={clsx('h-5 w-5 cursor-pointer text-gray-400')} onClick={() => onCopy(block.content)} />
                </div>
              </div>
            ) : (
              <div
                className="py-2.5 text-justify font-normal text-gray-900 text-xs leading-[1.75] md:text-sm dark:text-white"
                dangerouslySetInnerHTML={{
                  __html: block.content
                    .replace(/\n/g, '<br>')
                    .replace(/`([^`]+)`/g, '<code dir="ltr" class="bg-gray-300 rounded-sm px-1 text-primary">$1</code>')
                }}
                key={`block-${index}`}
              />
            )
          )}
        </div>
      )}
    </div>
  )
}

const User: React.FC<{ message: string; time?: string }> = ({ message, time }) => {
  const { locale } = useParams()
  const t = useTranslations('Chat')

  return (
    <div className="flex items-start gap-2.5">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black md:h-10 md:w-10">
        <IconUser className="h-4 w-4 md:h-6 md:w-6 dark:text-white" />
      </div>
      <div className="flex min-w-[200px] max-w-[90%] flex-1 flex-col rounded-e-xl rounded-es-xl border-gray-200 bg-gray-100 p-4 leading-1.5 md:max-w-[60%] dark:bg-neutral-700">
        <div className="flex items-center justify-between space-x-2 space-x-reverse">
          <span className="font-semibold text-gray-900 text-xs dark:text-white">{t('User')}</span>
          {time && (
            <span
              className={clsx(
                locale === 'fa' && YekanBakhNumFont.className,
                'font-normal text-gray-500 text-xs dark:text-gray-400'
              )}
            >
              {dayjs(time)
                .locale(locale as string)
                .fromNow()}
            </span>
          )}
        </div>
        <p className="py-2.5 font-normal text-gray-900 text-xs leading-[1.75] md:text-sm dark:text-white">{message}</p>
      </div>
    </div>
  )
}

const separateCodeAndText = (text: string): BlockType[] => {
  // Regular expression to match code blocks delimited by triple backticks
  const parts = []
  let lastIndex = 0
  const regex = /```([a-zA-Z]+)\n([\s\S]*?)```/g

  let match: RegExpExecArray | null = null
  match = regex.exec(text)
  while (match !== null) {
    parts.push({ content: text.substring(lastIndex, match.index), type: 'text' })
    parts.push({ content: match[2], language: match[1], type: 'code' })

    lastIndex = match.index + match[0].length
    match = regex.exec(text)
  }

  if (lastIndex < text.length) {
    parts.push({ content: text.substring(lastIndex), type: 'text' })
  }

  return parts
}
