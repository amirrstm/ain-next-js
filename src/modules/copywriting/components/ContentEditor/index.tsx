import { useTranslations } from 'next-intl'

import { API, EditorConfig } from '@editorjs/editorjs'
import { IconBolt, IconBooks } from '@tabler/icons-react'
import clsx from 'clsx'
import edjsHTML from 'editorjs-html'
import { convert } from 'html-to-text'
import React, { useState } from 'react'

import { AppCategory } from '@/interface/Category.model'

import Loader from '@/components/ui/loader'
import { Link } from '@/components/ui/navigation'
import { createReactEditorJS } from '@/components/ui/text-editor'

import { YekanBakhNumFont } from '@/styles/fonts'

import { SUB_CATEGORY_ICONS } from '../../utils'

const edjs = edjsHTML()
const ReactEditorJS = createReactEditorJS()

interface Props {
  content?: string
  loading: boolean
  appCategory?: AppCategory
}

const ContentEditor: React.FC<Props> = ({ content, appCategory, loading }) => {
  const t = useTranslations('Copywriting')

  const [text, setText] = useState<string>('')
  const [rawText, setRawText] = useState<string>('')
  const [editorData, setEditorData] = useState<EditorConfig['data']>()

  const onReady = async () => {
    if (content) {
      let convertedRaw = ''
      const splitTitles = content.split('\n').filter(Boolean)

      const blocks: any[] = []
      splitTitles.forEach(title => {
        const block = {
          type: title.includes('**') ? 'header' : 'paragraph',
          data: {
            level: title.includes('**') ? 2 : undefined,
            text: title.includes('**') ? title.replace(/\*\*/g, '') : title,
          },
        }
        convertedRaw += edjs.parseBlock(block)
        blocks.push(block)
      })

      setText(content.trim())
      setRawText(convertedRaw)
      setEditorData({ blocks, time: new Date().getTime() })
    }
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

      setRawText(raw)
      setText(normalText)
    })
  }

  if (!appCategory) return null

  return (
    <div className="border rounded-xl bg-white shadow-md h-full">
      <div className="p-4 flex items-center justify-between border-b">
        <div className="flex gap-2">
          <div className="bg-secondary w-8 h-8 rounded-md text-white flex justify-center items-center">
            {SUB_CATEGORY_ICONS[appCategory.slug] || <IconBooks className="w-6 h-6" />}
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold">{appCategory.name}</h2>
            <p className="text-xs text-gray-600 mt-2">{appCategory.description}</p>
          </div>
        </div>
      </div>

      {content && (
        <div className="px-4 py-2 border-b flex items-center justify-end">
          <div className="flex gap-4 text-sm">
            <div className={clsx(YekanBakhNumFont.className, 'text-gray-400')}>
              <p>{t('Content.Words')}</p>
              <p>{text.split(' ').length}</p>
            </div>

            <div className={clsx(YekanBakhNumFont.className, 'text-gray-400')}>
              <p>{t('Content.Characters')}</p>
              <p>{text.length}</p>
            </div>
          </div>
        </div>
      )}

      {!content ? (
        <div className="py-16 flex flex-col items-center justify-center">
          {loading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader width={100} height={100} />
              <span className="flex-1 leading-normal">{t('Content.Loading')}</span>
            </div>
          ) : (
            <div className="p-2 text-center">
              <div className="border shadow-md rounded-lg max-w-sm p-4 text-center">
                <p className="text-gray-500 flex">
                  <IconBolt className="text-primary" />
                  <span className="flex-1 leading-normal">{t('Content.Empty')}</span>
                </p>
              </div>

              <Link href="/app/history" className="text-xs text-center text-gray-400 hover:text-primary mt-3">
                {t('Content.Tip')}
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="p-4 w-full">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12" spellCheck={false}>
              <ReactEditorJS onReady={onReady} value={editorData} onChange={onChange} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ContentEditor
