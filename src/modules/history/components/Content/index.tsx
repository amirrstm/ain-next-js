import { IconClipboard, IconClipboardCheck } from '@tabler/icons-react'
import clsx from 'clsx'
import edjsHTML from 'editorjs-html'
import { convert } from 'html-to-text'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { createReactEditorJS } from '@/components/ui/text-editor'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { YekanBakhNumFont } from '@/styles/fonts'

import ContentHeader from './Header'

import type { EditorConfig } from '@editorjs/editorjs'
import type React from 'react'
import type { AppCategory } from '@/interface/Category.model'
import type { HistoryInput } from '../../interface'

const edjs = edjsHTML()
const ReactEditorJS = createReactEditorJS()

interface Props {
  content?: string
  inputs: HistoryInput[]
  appCategory?: AppCategory
}

const HistoryContent: React.FC<Props> = ({ content, inputs, appCategory }) => {
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

  const onCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!appCategory) return null

  return (
    <div className="h-full rounded-xl bg-background shadow-md">
      <ContentHeader category={appCategory} />

      <div className="space-y-6 p-6">
        <div className="overflow-hidden rounded-lg border border-muted">
          <div className="flex items-center justify-between border-b border-b-muted bg-neutral-200 px-4 py-2 dark:bg-neutral-800">
            <p>{t('Inputs')}</p>
          </div>

          <div className="space-y-4 p-4">
            {inputs.map((item, idx) => (
              <div key={`input-${idx}`}>
                <p className="text-xs">{item.input.title}</p>

                <div className="mt-2 rounded-md border border-muted bg-neutral-200 p-2 dark:bg-neutral-800">
                  <p>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-muted">
          {content && (
            <div className="flex items-center justify-between border-b border-b-muted bg-neutral-200 px-4 py-2 dark:bg-neutral-800">
              <p>{t('Generated')}</p>

              <div className="flex items-center justify-between gap-6">
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

          {content && (
            <div className="w-full p-4">
              <div className="grid grid-cols-12 gap-4">
                <div className={clsx(locale === 'fa' && YekanBakhNumFont.className, 'col-span-12')} spellCheck={false}>
                  <ReactEditorJS onReady={onReady} readOnly value={editorData} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HistoryContent
