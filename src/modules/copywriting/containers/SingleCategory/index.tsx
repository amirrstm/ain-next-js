'use client'

import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'

import { IconChevronRight } from '@tabler/icons-react'
import React, { useRef, useState } from 'react'
import { toast } from 'sonner'

import { AppCategory } from '@/interface/Category.model'

import { Link } from '@/components/ui/navigation'

import useUserStore from '@/lib/store/auth'

import ContentEditor from '../../components/ContentEditor'
import ContentForm from '../../components/ContentForm'
import { getPromptResponse } from '../../services'

interface Props {
  category: { data: AppCategory }
}

const SingleCategoryContainer: React.FC<Props> = ({ category }) => {
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('Copywriting')
  const { user, setUser } = useUserStore()
  const contentRef = useRef<HTMLDivElement>(null)

  const [content, setContent] = useState<string>()
  const [historyId, setHistoryId] = useState<string>()

  const [loading, setLoading] = useState<boolean>(false)
  const [appCategory, setAppCategory] = useState<AppCategory>()

  const onSubmit = (data: Record<string, any>) => {
    if (!user) {
      router.push(`/login?returnUrl=${pathname}`)
      return
    }

    if (contentRef && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    const { temperature, variant, tone, ...inputs } = data

    setLoading(true)
    setContent(undefined)
    getPromptResponse({
      inputs,
      category: category.data._id,
      tone: String(tone._id),
      variant: Number(variant._id),
      temperature: Number(temperature._id),
    })
      .then(data => {
        setLoading(false)

        setHistoryId(data._id)
        setContent(data.content)

        if (user) {
          setUser({ ...user, userPlan: { ...user.userPlan, used: user.userPlan.used + 1 } })
        }
      })
      .catch(e => {
        setLoading(false)

        if (e.status === 5215) {
          toast.error(t('PlanError', { error: e.error }))
        } else {
          toast.error(t('Content.Error'))
        }
      })
  }

  if (!category.data) return null

  return (
    <div className="p-2 xl:p-6">
      <div className="grid grid-cols-12 gap-4 lg:gap-5 xl:gap-6 min-h-[calc(100vh-40px)] xl:min-h-[calc(100vh-72px)]">
        <div className="col-span-12 md:col-span-6 lg:col-span-5 xl:col-span-4">
          <div className="border border-muted rounded-xl bg-card shadow-md h-full flex flex-col">
            <Link href="/app/copywriting" className="p-4 border-b border-b-muted flex gap-2 items-center">
              <div className="border border-muted rounded-full p-1">
                <IconChevronRight />
              </div>
              <h1 className="text-lg font-bold">{t('Category.BackToCategories')}</h1>
            </Link>

            <div className="flex-1">
              <ContentForm
                loading={loading}
                onSubmit={onSubmit}
                category={category.data}
                appCategory={appCategory}
                setAppCategory={setAppCategory}
              />
            </div>
          </div>
        </div>

        <div ref={contentRef} className="col-span-12 md:col-span-6 lg:col-span-7 xl:col-span-8">
          <ContentEditor id={historyId as string} loading={loading} appCategory={appCategory} content={content} />
        </div>
      </div>
    </div>
  )
}

export default SingleCategoryContainer
