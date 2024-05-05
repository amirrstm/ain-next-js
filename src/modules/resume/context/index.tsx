'use client'

import { useParams } from 'next/navigation'

import React, { createContext, ReactElement, useEffect, useState } from 'react'
import useSWR from 'swr'

import Loader from '@/components/ui/loader'

import API from '@/lib/api'

import { RESUME_ENUM_TABS } from '../constants/resume.enum'
import { IResumeContext } from '../interface'
import { IResume } from '../interface/resume'
import { getResume } from '../service'

export const ResumeContext = createContext<IResumeContext>({} as IResumeContext)

type Props = { children: React.ReactNode }
export default function ResumeProvider({ children }: Props): ReactElement {
  const { resumeId } = useParams()

  const [resume, setResume] = useState<IResume>()
  const [activeTab, setActiveTab] = useState<RESUME_ENUM_TABS>(RESUME_ENUM_TABS.Basic)
  const { data, isLoading } = useSWR(API.RESUME.GET_ONE(resumeId as string), getResume, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  })

  useEffect(() => {
    if (data) {
      setResume(data)
    }
  }, [data])

  return (
    <ResumeContext.Provider value={{ resume, activeTab, setActiveTab }}>
      {isLoading || !resume ? <Loader width={100} height={100} /> : children}
    </ResumeContext.Provider>
  )
}
