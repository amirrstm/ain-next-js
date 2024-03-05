'use client'

import { useParams } from 'next/navigation'

import { ChevronRight } from 'lucide-react'
import React, { useState } from 'react'

import { AppCategory } from '@/interface/Category.model'

import Link from '@/components/ui/link'
import { useToast } from '@/components/ui/use-toast'

import { useTranslation } from '@/app/i18n/client'

import ContentEditor from '../../components/ContentEditor'
import ContentForm from '../../components/ContentForm'
import { getPromptResponse } from '../../services'

interface Props {
  category: { data: AppCategory }
}

const SingleCategoryContainer: React.FC<Props> = ({ category }) => {
  const { lng } = useParams()
  const { toast } = useToast()
  const { t } = useTranslation(lng as string, 'Copywriting')

  const [content, setContent] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)
  const [appCategory, setAppCategory] = useState<AppCategory>()

  const onSubmit = (data: Record<string, unknown>) => {
    setLoading(true)
    setContent(undefined)
    getPromptResponse({
      inputs: data,
      category: category.data._id,
    })
      .then(data => {
        setLoading(false)
        setContent(data.content)
      })
      .catch(e => {
        setLoading(false)
        toast({ title: t('Content.Error'), variant: 'destructive' })
      })
  }

  if (!category.data) return null

  return (
    <div className="p-4 xl:p-6">
      <div className="grid grid-cols-12 gap-4 lg:gap-5 xl:gap-6">
        <div className="col-span-12 md:col-span-6 lg:col-span-5 xl:col-span-4 2xl:col-span-3">
          <div className="border rounded-xl bg-white shadow-md block sticky top-8">
            <Link lng={lng as string} href="/app/copywriting" className="p-4 border-b flex gap-2 items-center">
              <div className="border rounded-full p-1">
                <ChevronRight />
              </div>
              <h1 className="text-lg font-bold">{t('Category.BackToCategories')}</h1>
            </Link>

            <ContentForm
              loading={loading}
              onSubmit={onSubmit}
              category={category.data}
              appCategory={appCategory}
              setAppCategory={setAppCategory}
            />
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-7 xl:col-span-8 2xl:col-span-9">
          <ContentEditor loading={loading} appCategory={appCategory} content={content} />
        </div>
      </div>
    </div>
  )
}

export default SingleCategoryContainer
