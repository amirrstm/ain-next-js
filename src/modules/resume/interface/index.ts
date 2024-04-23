import { RESUME_ENUM_TABS } from '../constants/resume.enum'

export interface IResumeContext {
  activeTab: RESUME_ENUM_TABS
  setActiveTab: (tab: RESUME_ENUM_TABS) => void
}
