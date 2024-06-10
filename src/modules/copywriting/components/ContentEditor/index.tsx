import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

import { API, EditorConfig } from '@editorjs/editorjs'
import { IconBolt, IconBooks, IconClipboard, IconClipboardCheck } from '@tabler/icons-react'
import clsx from 'clsx'
import edjsHTML from 'editorjs-html'
import { convert } from 'html-to-text'
import React, { useEffect, useState } from 'react'

import { AppCategory } from '@/interface/Category.model'

import Loader from '@/components/ui/loader'
import { Link } from '@/components/ui/navigation'
import { createReactEditorJS } from '@/components/ui/text-editor'

import { displayEquation } from '@/lib/utils'
import { YekanBakhNumFont } from '@/styles/fonts'

import { SUB_CATEGORY_ICONS } from '../../utils'
import Feedback from './Feedback'

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
  const [copied, setCopied] = useState<boolean>(false)

  const [text, setText] = useState<string>('')
  const [editorData, setEditorData] = useState<EditorConfig['data']>()

  useEffect(() => {
    if (content && editorData) {
      prepareText(content)
    } else {
      setEditorData(undefined)
    }
  }, [content])

  const onReady = () => {
    if (content && !editorData) {
      prepareText(content)
    }
  }

  const prepareText = (content: string) => {
    const blocks: any = JSON.parse(content)

    setText(content.trim())
    setEditorData({ blocks: blocks.blocks, time: new Date().getTime() })
  }

  const onChange = (data: API) => {
    data.saver.save().then(outputData => {
      const raw = edjs.parse(outputData).join('')
      const normalText = convert(raw, {
        wordwrap: 130,

        selectors: [
          {
            selector: 'ul',
            options: {
              itemPrefix: '-',
            },
          },
          {
            selector: 'h2',
            format: 'inlineSurround',
            options: {
              prefix: '**',
              suffix: '**',
            },
          },
        ],
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
    <div className="border border-muted rounded-xl bg-card shadow-md h-full mb-16 md:mb-0">
      <div className="p-4 flex items-center justify-between border-b border-b-muted">
        <div className="flex gap-2">
          <div className="bg-foreground w-8 h-8 rounded-md text-background flex justify-center items-center">
            {SUB_CATEGORY_ICONS[appCategory.slug] || <IconBooks className="w-6 h-6" />}
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold">{appCategory.name}</h2>
            <p className="text-xs text-gray-600 mt-2">{appCategory.description}</p>
          </div>
        </div>
      </div>

      {content && (
        <div className="px-4 py-2 gap-4 border-b flex items-center justify-between">
          <p className="hidden md:block">{t('Content.Success')}:</p>

          <div className="flex items-center gap-6 justify-between flex-1 md:flex-none">
            <div className="flex gap-4 items-center text-sm">
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
                <IconClipboardCheck className={clsx('w-7 h-7 text-primary cursor-pointer')} />
              ) : (
                <IconClipboard onClick={onCopy} className={clsx('w-7 h-7 text-gray-400 cursor-pointer')} />
              )}
            </div>
          </div>
        </div>
      )}

      {!content ? (
        <div className="py-6 md:py-0 flex flex-col items-center justify-center h-[calc(100%-100px)]">
          {loading ? (
            <div className="flex flex-col items-center text-center gap-3 p-4">
              <div className="w-20 h-20">
                <Loader />
              </div>
              <span className="flex-1 leading-normal">{t('Content.Loading')}</span>
            </div>
          ) : (
            <div className="p-2 text-center">
              <div className="border border-muted shadow-md rounded-lg max-w-sm p-4 text-center">
                <p className="text-gray-500 flex">
                  <IconBolt className="text-primary" />
                  <span className="flex-1 leading-normal">{t('Content.Empty')}</span>
                </p>
              </div>

              <Link href="/app/history" className="text-xs text-center text-gray-400 hover:text-primary mt-3 block">
                {t('Content.Tip')}
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full">
          <div className="p-4">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12" spellCheck={false}>
                <ReactEditorJS locale={locale as string} onReady={onReady} value={editorData} onChange={onChange} />
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
