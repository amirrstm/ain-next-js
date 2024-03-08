import { useParams } from 'next/navigation'

import { EditorConfig } from '@editorjs/editorjs'
import clsx from 'clsx'
import edjsHTML from 'editorjs-html'
import React, { useEffect, useState } from 'react'

import { AppCategory } from '@/interface/Category.model'

import { createReactEditorJS } from '@/components/ui/text-editor'

import { useTranslation } from '@/app/i18n/client'
import { YekanBakhNumFont } from '@/styles/fonts'

import { HistoryInput } from '../../interface'
import ContentHeader from './Header'

const edjs = edjsHTML()
const ReactEditorJS = createReactEditorJS()

interface Props {
  content?: string
  inputs: HistoryInput[]
  appCategory?: AppCategory
}

const HistoryContent: React.FC<Props> = ({ content, inputs, appCategory }) => {
  const { lng } = useParams()
  const { t } = useTranslation(lng as string, 'Copywriting')

  const [text, setText] = useState<string>('')
  const [editorData, setEditorData] = useState<EditorConfig['data']>()

  useEffect(() => {
    if (content && editorData) {
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
      setEditorData({ blocks, time: new Date().getTime() })
    } else {
      setEditorData(undefined)
    }
  }, [content])

  const onReady = () => {
    if (content && !editorData) {
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
      setEditorData({ blocks, time: new Date().getTime() })
    }
  }

  if (!appCategory) return null

  return (
    <div className="border rounded-xl bg-white shadow-md h-full">
      <ContentHeader category={appCategory} />

      <div className="p-6 space-y-6">
        <div className="border rounded-lg overflow-hidden">
          <div className="px-4 py-2 border-b flex items-center justify-between bg-gray-50">
            <p>ورودی ها</p>
          </div>

          <div className="p-4 space-y-4">
            {inputs.map((item, idx) => (
              <div key={`input-${idx}`}>
                <p className="text-xs">{item.input.title}</p>

                <div className="border bg-gray-100 p-2 mt-2 rounded-md">
                  <p>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          {content && (
            <div className="px-4 py-2 border-b flex items-center justify-between bg-gray-50">
              <p>متن تولید شده</p>
              <div>
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
            </div>
          )}

          {content && (
            <div className="p-4 w-full">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12" spellCheck={false}>
                  <ReactEditorJS readOnly onReady={onReady} value={editorData} />
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
