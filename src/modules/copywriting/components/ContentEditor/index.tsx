import { IconBolt, IconClipboard, IconClipboardCheck } from '@tabler/icons-react'
import clsx from 'clsx'
import edjsHTML from 'editorjs-html'
import { convert } from 'html-to-text'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import Loader from '@/components/ui/loader'
import { Link } from '@/components/ui/navigation'
import { createReactEditorJS } from '@/components/ui/text-editor'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { YekanBakhNumFont } from '@/styles/fonts'

import Feedback from './Feedback'

import type { API, EditorConfig } from '@editorjs/editorjs'
import type React from 'react'
import type { AppCategory } from '@/interface/Category.model'

const edjs = edjsHTML()
const ReactEditorJS = createReactEditorJS()

interface Props {
  id: string
  content?: string
  loading: boolean
  appCategory?: AppCategory
}

const ContentEditor: React.FC<Props> = ({ id, content, appCategory, loading }) => {
  const { locale } = useParams()
  const t = useTranslations('Copywriting')
  const isMobile = useMediaQuery({ maxWidth: 768 })

  const [text, setText] = useState<string>('')
  const [copied, setCopied] = useState<boolean>(false)
  const [editorData, setEditorData] = useState<EditorConfig['data']>()

  useEffect(() => {
    if (content && editorData) {
      prepareText(content)
    } else {
      setEditorData(undefined)
    }
  }, [content, editorData])

  const onReady = () => {
    if (content && !editorData) {
      prepareText(content)
    }
  }

  const prepareText = (content: string) => {
    const blocks = JSON.parse(content)

    const raw = edjs.parse(blocks).join('')
    const normalText = convert(raw, {
      selectors: [
        {
          options: {
            itemPrefix: '-'
          },
          selector: 'ul'
        }
      ],
      wordwrap: 130
    })

    setText(normalText)
    setEditorData({ blocks: blocks.blocks, time: Date.now() })
  }

  const onChange = (data: API) => {
    data.saver.save().then((outputData) => {
      console.log(outputData)
      const raw = edjs.parse(outputData).join('')
      const normalText = convert(raw, {
        selectors: [
          {
            options: {
              itemPrefix: '-'
            },
            selector: 'ul'
          }
        ],
        wordwrap: 130
      })

      setText(normalText)
    })
  }

  const onCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!appCategory) return null

  return (
    <div className="mb-16 h-full rounded-xl border border-muted bg-card shadow-md md:mb-0">
      <div className="flex items-center justify-between border-b border-b-muted p-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <h2 className="font-bold text-lg">{appCategory.name}</h2>
            <p className="mt-2 text-gray-600 text-xs">{appCategory.description}</p>
          </div>
        </div>
      </div>

      {content && (
        <div className="flex items-center justify-between gap-4 border-b px-4 py-2">
          <p className="hidden md:block">{t('Content.Success')}:</p>

          <div className="flex flex-1 items-center justify-between gap-6 md:flex-none">
            <div className="flex items-center gap-4 text-sm">
              <div className={clsx(locale === 'fa' && YekanBakhNumFont.className, 'text-gray-400')}>
                <p>{t('Content.Words')}</p>
                <p>{text.split(' ').length}</p>
              </div>

              <div className={clsx(locale === 'fa' && YekanBakhNumFont.className, 'text-gray-400')}>
                <p>{t('Content.Characters')}</p>
                <p>{text.length}</p>
              </div>
            </div>

            <div className="flex gap-4">
              {copied ? (
                <IconClipboardCheck className={clsx('h-7 w-7 cursor-pointer text-primary')} />
              ) : (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <IconClipboard className={clsx('h-7 w-7 cursor-pointer text-gray-400')} onClick={onCopy} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t('Content.Copy')}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
        </div>
      )}

      {!content ? (
        <div className="flex h-[calc(100%-100px)] flex-col items-center justify-center py-6 md:py-0">
          {loading ? (
            <div className="flex flex-col items-center gap-3 p-4 text-center">
              <div className="h-20 w-20">
                <Loader />
              </div>
              <span className="flex-1 leading-normal">{t('Content.Loading')}</span>
            </div>
          ) : (
            <div className="p-2 text-center">
              <div className="max-w-sm rounded-lg border border-muted p-4 text-center shadow-md">
                <p className="flex text-gray-500">
                  <IconBolt className="text-primary" />
                  <span className="flex-1 leading-normal">{t('Content.Empty')}</span>
                </p>
              </div>

              <Link className="mt-3 block text-center text-gray-400 text-xs hover:text-primary" href="/app/history">
                {t('Content.Tip')}
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="h-full w-full">
          <div className="p-4">
            <div className="grid grid-cols-12 gap-4 md:min-h-[calc(100vh-310px)]">
              <div className="col-span-12" spellCheck={false}>
                <ReactEditorJS
                  locale={locale as string}
                  onChange={onChange}
                  onReady={onReady}
                  readOnly={isMobile}
                  value={editorData}
                />
              </div>
            </div>
          </div>

          <Feedback id={id} />
        </div>
      )}
    </div>
  )
}

export default ContentEditor
