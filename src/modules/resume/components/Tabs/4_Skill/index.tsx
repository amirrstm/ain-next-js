import CertificateForm from './CertificateForm'
import LanguageForm from './LanguageForm'
import SkillForm from './SkillForm'

import type React from 'react'

const SkillTab: React.FC = () => {
  return (
    <>
      <LanguageForm />

      <SkillForm />

      <CertificateForm />
    </>
  )
}

export default SkillTab
