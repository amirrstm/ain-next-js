'use client'

import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { createContext, type ReactElement, useEffect, useState } from 'react'

import Loader from '@/components/ui/loader'

import { RESUME_ENUM_TABS } from '../constants/resume.enum'
import useResume from '../hooks/useResume'

import type React from 'react'
import type { IResumeContext } from '../interface'
import type { IResume } from '../interface/resume'

export const ResumeContext = createContext<IResumeContext>({} as IResumeContext)

type Props = { children: React.ReactNode }
export default function ResumeProvider({ children }: Props): ReactElement {
  const { resumeId } = useParams()
  const t = useTranslations('Resume')
  const { data, isLoading, mutate } = useResume(resumeId as string)

  const [resume, setResume] = useState<IResume>()
  const [initLoading, setInitLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<RESUME_ENUM_TABS>(RESUME_ENUM_TABS.Basic)

  useEffect(() => {
    if (data) {
      setResume(data)
      setInitLoading(false)
    }
  }, [data])

  if (initLoading || isLoading || !resume) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="h-20 w-20">
          <Loader />
        </div>

        <div className="text-center">
          <p>{t('GetLoading')}</p>
        </div>
      </div>
    )
  }

  return <ResumeContext.Provider value={{ activeTab, mutate, resume, setActiveTab }}>{children}</ResumeContext.Provider>
}
