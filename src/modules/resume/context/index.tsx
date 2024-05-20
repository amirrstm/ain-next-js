'use client'

import { useParams } from 'next/navigation'

import React, { createContext, ReactElement, useEffect, useState } from 'react'

import Loader from '@/components/ui/loader'

import { RESUME_ENUM_TABS } from '../constants/resume.enum'
import useResume from '../hooks/useResume'
import { IResumeContext } from '../interface'
import { IResume } from '../interface/resume'

export const ResumeContext = createContext<IResumeContext>({} as IResumeContext)

type Props = { children: React.ReactNode }
export default function ResumeProvider({ children }: Props): ReactElement {
  const { resumeId } = useParams()
  const { data, isLoading } = useResume(resumeId as string)

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
        <div className="w-20 h-20">
          <Loader />
        </div>

        <div className="text-center">
          <p>در حال دریافت اطلاعات رزومه، لطفا کمی صبر کنید ...</p>
        </div>
      </div>
    )
  }

  return <ResumeContext.Provider value={{ resume, activeTab, setActiveTab }}>{children}</ResumeContext.Provider>
}
