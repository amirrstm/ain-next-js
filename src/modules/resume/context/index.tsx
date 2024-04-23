'use client'

import React, { createContext, ReactElement, useState } from 'react'

import { RESUME_ENUM_TABS } from '../constants/resume.enum'
import { IResumeContext } from '../interface'

export const ResumeContext = createContext<IResumeContext>({} as IResumeContext)

type Props = { children: React.ReactNode }
export default function ResumeProvider({ children }: Props): ReactElement {
  const [activeTab, setActiveTab] = useState<RESUME_ENUM_TABS>(RESUME_ENUM_TABS.Basic)

  return <ResumeContext.Provider value={{ activeTab, setActiveTab }}>{children}</ResumeContext.Provider>
}
