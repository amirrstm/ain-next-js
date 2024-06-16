import * as z from 'zod'

import { RESUME_ENUM_TABS } from '../constants/resume.enum'
import { resumeSchema } from '../validations'
import { IResume } from './resume'

export interface IResumeContext {
  activeTab: RESUME_ENUM_TABS
  setActiveTab: (tab: RESUME_ENUM_TABS) => void

  resume?: IResume
  mutate: () => void
}

export type ResumeFormType = z.infer<typeof resumeSchema>
