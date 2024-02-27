'use client'

import { useParams } from 'next/navigation'

import EditorJS from '@editorjs/editorjs'
import edjsHTML from 'editorjs-html'
import { ChevronRight, Globe, Laptop, LibraryBig, Megaphone, Paperclip, Plus, Slack, Wand2 } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import DashboardMenu from '@/components/ui/dashboard-menu'
import { Input } from '@/components/ui/input'
import Link from '@/components/ui/link'
import { createReactEditorJS } from '@/components/ui/text-editor'
import { Textarea } from '@/components/ui/textarea'

import { useTranslation } from '@/app/i18n/client'

const ReactEditorJS = createReactEditorJS()

const SingleCategoryContainer: React.FC = () => {
  const { lng } = useParams()
  const { t } = useTranslation(lng as string, 'Copywriting')

  const menus = [
    { title: 'همه‌ی دسته‌بندی ها', icon: <LibraryBig className="w-5 h-5" /> },
    { title: 'برند سازی و تبلیغات', icon: <Megaphone className="w-5 h-5" /> },
    { title: 'محتوای وب‌سایت', icon: <Laptop className="w-5 h-5" /> },
    { title: 'شبکه‌های مجازی', icon: <Slack className="w-5 h-5" /> },
    { title: 'ویرایستاری', icon: <Paperclip className="w-5 h-5" /> },
    { title: 'دیگر', icon: <Globe className="w-5 h-5" /> },
  ]

  return (
    <div className="p-4 xl:p-6">
      <div className="grid grid-cols-12 gap-4 lg:gap-5 xl:gap-6">
        <div className="col-span-12 md:col-span-6 lg:col-span-5 xl:col-span-3 2xl:col-span-3">
          <div className="border rounded-xl bg-white shadow-md block sticky top-8">
            <Link lng={lng as string} href="/app/copywriting" className="p-4 border-b flex gap-2 items-center">
              <div className="border rounded-full p-1">
                <ChevronRight />
              </div>
              <h1 className="text-lg font-bold">{t('Category.BackToCategories')}</h1>
            </Link>

            <div className="p-4 space-y-6">
              <div>
                <p className="text-sm mb-1 font-light">متن تولید محتوا</p>
                <Input placeholder="متن تولید محتوا" />
              </div>

              <div>
                <p className="text-sm mb-1 font-light">متن تولید محتوا</p>
                <Textarea placeholder="متن تولید محتوا" />
              </div>
            </div>

            <div className="p-4">
              <Button className="w-full gap-2">
                <Wand2 className="w-5 h-5" />
                <span>{t('Category.Generate')}</span>
              </Button>

              <span className="text-xs text-gray-400 mt-2 block">{t('Category.GenerateCost')}</span>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-7 xl:col-span-9 2xl:col-span-9">
          <div className="border rounded-xl bg-white shadow-md">
            <div className="p-4 flex items-center justify-between border-b">
              <div className="flex gap-2 items-center">
                <div className="bg-secondary w-8 h-8 rounded-md text-white flex justify-center items-center">
                  <LibraryBig className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold">{'همه‌ی دسته‌بندی ها'}</h2>
              </div>
            </div>

            <div className="p-4 w-full">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12" spellCheck={false}>
                  <ReactEditorJS
                    onChange={(data, api) => {
                      data.saver.save().then(outputData => {
                        console.log(outputData)
                        const edjs = edjsHTML()
                        // console.log(edjs.parse(outputData))
                        console.log(edjs.parse(outputData))
                      })
                    }}
                    defaultValue={{
                      time: 1635603431943,
                      blocks: [
                        {
                          id: 'x_p-xddPzV',
                          type: 'paragraph',
                          data: {
                            text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.',
                          },
                        },
                      ],
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleCategoryContainer
