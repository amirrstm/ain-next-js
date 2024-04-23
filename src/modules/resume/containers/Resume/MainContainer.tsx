import React, { ReactNode, useContext } from 'react'

import BasicTab from '../../components/Tabs/1_Basic'
import { RESUME_ENUM_TABS } from '../../constants/resume.enum'
import { ResumeContext } from '../../context'

const ResumeMainContainer: React.FC = () => {
  const { activeTab } = useContext(ResumeContext)

  const Tabs: Record<RESUME_ENUM_TABS, ReactNode> = {
    [RESUME_ENUM_TABS.Basic]: <BasicTab />,
    [RESUME_ENUM_TABS.Education]: <div>EducationTab</div>,
    [RESUME_ENUM_TABS.Experience]: <div>ExperienceTab</div>,
    [RESUME_ENUM_TABS.Skills]: <div>SkillsTab</div>,
    [RESUME_ENUM_TABS.Projects]: <div>ProjectsTab</div>,
    [RESUME_ENUM_TABS.Publications]: <div>PublicationsTab</div>,
    [RESUME_ENUM_TABS.Others]: <div>OthersTab</div>,
  }

  return activeTab in Tabs ? Tabs[activeTab] : null
}

export default ResumeMainContainer
