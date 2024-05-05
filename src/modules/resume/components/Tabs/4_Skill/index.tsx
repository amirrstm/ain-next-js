import React from 'react'

import CertificateForm from './CertificateForm'
import LanguageForm from './LanguageForm'
import SkillForm from './SkillForm'

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
