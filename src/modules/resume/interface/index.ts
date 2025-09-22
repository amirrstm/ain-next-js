import type * as z from 'zod'
import type { RESUME_ENUM_TABS } from '../constants/resume.enum'
import type { resumeSchema } from '../validations'
import type { IResume } from './resume'

export interface IResumeContext {
  activeTab: RESUME_ENUM_TABS
  setActiveTab: (tab: RESUME_ENUM_TABS) => void

  resume?: IResume
  mutate: () => void
}

export type ResumeFormType = z.infer<typeof resumeSchema>
