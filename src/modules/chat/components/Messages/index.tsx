import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

import { javascript } from '@codemirror/lang-javascript'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import { IconClipboard, IconUser } from '@tabler/icons-react'
import { atomone } from '@uiw/codemirror-theme-atomone'
import CodeMirror from '@uiw/react-codemirror'
import clsx from 'clsx'
import dayjs from 'dayjs'
import 'dayjs/locale/fa'
import relativeTime from 'dayjs/plugin/relativeTime'
import jalaliday from 'jalaliday'
import React, { useEffect, useRef, useState } from 'react'

import IconLogoSmall from '@/icons/logos/logo-small'
import { YekanBakhNumFont } from '@/styles/fonts'

import { ChatMessage } from '../../interface'

dayjs.extend(jalaliday)
dayjs.extend(relativeTime)

type BlockType = { type: string; language?: string; content: string }

interface Props {
  loading?: boolean
  messages: ChatMessage[]
}

const ChatMessages: React.FC<Props> = ({ messages, loading }) => {
  const { locale } = useParams()
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
      <div className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-black flex items-center justify-center p-1">
        <IconLogoSmall fill="hsl(var(--foreground))" bg="hsl(var(--background))" />
      </div>

      {loading ? (
        <div className="flex items-center mt-1 md:mt-2 mr-2">
          <p className="text-gray-500 text-xs md:text-base">{t('Writing')}</p>
        </div>
      ) : (
        <div
          className={clsx(
            'flex flex-col min-w-[200px] flex-1 leading-1.5 p-4 border-gray-200 bg-neutral-200 dark:bg-neutral-800 rounded-e-xl rounded-es-xl',
            {
              'max-w-[90%] md:max-w-[80%]': systemMessage.length > 0,
              'max-w-[90%] md:max-w-[60%]': systemMessage.length === 0,
            },
          )}
        >
          <div className="flex items-center space-x-2 space-x-reverse justify-between">
            <span className="text-xs font-semibold text-gray-900 dark:text-white">{t('Us')}</span>
            {time && (
              <span
                className={clsx(
                  locale === 'fa' && YekanBakhNumFont.className,
                  'text-xs font-normal text-gray-500 dark:text-gray-400',
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
              <div dir="ltr" spellCheck={false} key={`code-${index}`} className="rounded-lg overflow-hidden relative">
                <CodeMirror
                  editable={false}
                  theme={atomone}
                  extensions={
                    block.language !== 'bash'
                      ? [javascript({ jsx: true, typescript: true })]
                      : [markdown({ base: markdownLanguage, codeLanguages: languages })]
                  }
                  value={block.content.endsWith('\n') ? block.content.replace(/\n$/, '') : block.content}
                />

                <div className="absolute bottom-1 right-1">
                  <IconClipboard
                    onClick={() => onCopy(block.content)}
                    className={clsx('w-5 h-5 text-gray-400 cursor-pointer')}
                  />
                </div>
              </div>
            ) : (
              <div
                key={`block-${index}`}
                dangerouslySetInnerHTML={{
                  __html: block.content
                    .replace(/\n/g, '<br>')
                    .replace(
                      /`([^`]+)`/g,
                      '<code dir="ltr" class="bg-gray-300 rounded-sm px-1 text-primary">$1</code>',
                    ),
                }}
                className="text-xs md:text-sm text-justify font-normal py-2.5 text-gray-900 dark:text-white leading-[1.75]"
              />
            ),
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
      <div className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-black flex items-center justify-center">
        <IconUser className="w-4 h-4 md:w-6 md:h-6 dark:text-white" />
      </div>
      <div className="flex flex-col min-w-[200px] flex-1 max-w-[90%] md:max-w-[60%] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-neutral-700">
        <div className="flex items-center space-x-2 space-x-reverse justify-between">
          <span className="text-xs font-semibold text-gray-900 dark:text-white">{t('User')}</span>
          {time && (
            <span
              className={clsx(
                locale === 'fa' && YekanBakhNumFont.className,
                'text-xs font-normal text-gray-500 dark:text-gray-400',
              )}
            >
              {dayjs(time)
                .locale(locale as string)
                .fromNow()}
            </span>
          )}
        </div>
        <p className="text-xs md:text-sm font-normal py-2.5 text-gray-900 dark:text-white leading-[1.75]">{message}</p>
      </div>
    </div>
  )
}

const separateCodeAndText = (text: string): BlockType[] => {
  // Regular expression to match code blocks delimited by triple backticks
  const parts = []
  let lastIndex = 0
  let regex = /```([a-zA-Z]+)\n([\s\S]*?)```/g

  let match
  while ((match = regex.exec(text)) !== null) {
    parts.push({ type: 'text', content: text.substring(lastIndex, match.index) })
    parts.push({ type: 'code', language: match[1], content: match[2] })

    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.substring(lastIndex) })
  }

  return parts
}
