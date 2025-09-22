'use client'

import { IconChevronRight } from '@tabler/icons-react'
import { useParams, usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'
import { toast } from 'sonner'

import { Link, useRouter } from '@/components/ui/navigation'
import useUserStore from '@/lib/store/auth'

import ContentEditor from '../../components/ContentEditor'
import ContentForm from '../../components/ContentForm'
import useCategory from '../../hooks/useCategory'
import { getPromptResponse } from '../../services'

import type React from 'react'
import type { AppCategory } from '@/interface/Category.model'

const SingleCategoryContainer: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { categoryId } = useParams()
  const t = useTranslations('Copywriting')
  const { user, setUser } = useUserStore()
  const contentRef = useRef<HTMLDivElement>(null)
  const { data: category } = useCategory(categoryId as string)

  const [content, setContent] = useState<string>()
  const [historyId, setHistoryId] = useState<string>()

  const [loading, setLoading] = useState<boolean>(false)
  const [appCategory, setAppCategory] = useState<AppCategory>()

  const onSubmit = (data: Record<string, string>) => {
    if (!user) {
      router.push(`/login?returnUrl=${pathname}`)
      return
    }

    if (!category) return

    if (contentRef?.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    const { temperature, tone, ...inputs } = data

    setLoading(true)
    setContent(undefined)
    getPromptResponse({
      category: category._id,
      inputs,
      temperature: Number(temperature._id),
      tone: String(tone._id)
    })
      .then((data) => {
        setLoading(false)

        setHistoryId(data._id)
        setContent(data.content)

        if (user) {
          setUser({
            ...user,
            userPlan: {
              ...user.userPlan,
              used: { ...user.userPlan.used, generation: user.userPlan.used.generation + 1 }
            }
          })
        }
      })
      .catch((e) => {
        setLoading(false)

        if (e.status === 5215) {
          toast.error(t('PlanError'))
        } else {
          toast.error(t('Content.Error'))
        }
      })
  }

  if (!category) return null

  return (
    <div className="p-2 xl:p-6">
      <div className="grid min-h-[calc(100vh-40px)] grid-cols-12 gap-4 lg:gap-5 xl:min-h-[calc(100vh-72px)] xl:gap-6">
        <div className="col-span-12 md:col-span-6 lg:col-span-5 xl:col-span-4">
          <div className="flex h-full flex-col rounded-xl border border-muted bg-card shadow-md">
            <Link className="flex items-center gap-2 border-b border-b-muted p-4" href="/app/copywriting">
              <div className="rotate-180 rounded-full border border-muted p-1 rtl:rotate-0">
                <IconChevronRight />
              </div>
              <h1 className="font-bold text-lg">{t('Category.BackToCategories')}</h1>
            </Link>

            <div className="flex-1">
              <ContentForm
                appCategory={appCategory}
                category={category}
                loading={loading}
                onSubmit={onSubmit}
                setAppCategory={setAppCategory}
              />
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-7 xl:col-span-8" ref={contentRef}>
          <ContentEditor appCategory={appCategory} content={content} id={historyId as string} loading={loading} />
        </div>
      </div>
    </div>
  )
}

export default SingleCategoryContainer
