import { useTranslations } from 'next-intl'

import { LANGUAGES, SOCIAL_NETWORKS } from '@/constants'

export function useConstants() {
  const t = useTranslations('constants')
  const genders = [
    { label: t('gender.male'), value: t('gender.male') },
    { label: t('gender.female'), value: t('gender.female') }
  ]

  const marriage = [
    { label: t('marriage.single'), value: t('marriage.single') },
    { label: t('marriage.married'), value: t('marriage.married') }
  ]

  const military = [
    { label: t('military.included'), value: t('military.included') },
    { label: t('military.doing'), value: t('military.doing') },
    { label: t('military.completed'), value: t('military.completed') },
    { label: t('military.exempt'), value: t('military.exempt') },
    { label: t('military.educationExempt'), value: t('military.educationExempt') },
    { label: t('military.noMedicalExempt'), value: t('military.noMedicalExempt') },
    { label: t('military.medicalExempt'), value: t('military.medicalExempt') }
  ]

  const grades = [
    { label: t('education.underDiploma'), value: t('education.underDiploma') },
    { label: t('education.diploma'), value: t('education.diploma') },
    { label: t('education.associate'), value: t('education.associate') },
    { label: t('education.bachelor'), value: t('education.bachelor') },
    { label: t('education.master'), value: t('education.master') },
    { label: t('education.phd'), value: t('education.phd') },
    { label: t('education.postPhd'), value: t('education.postPhd') }
  ]

  const fluencyTypes = [
    { key: 'describe', label: t('languageFluencyType.describe'), value: t('languageFluencyType.describe') },
    { key: 'a1-c2', label: t('languageFluencyType.a1-c2'), value: t('languageFluencyType.a1-c2') },
    { key: 'graphical', label: t('languageFluencyType.graphical'), value: t('languageFluencyType.graphical') }
  ]

  const numberLevels = [
    { label: 1, value: 1 },
    { label: 2, value: 2 },
    { label: 3, value: 3 },
    { label: 4, value: 4 },
    { label: 5, value: 5 }
  ]

  const stringLevels = [
    { label: 'A1', value: 'A1' },
    { label: 'A2', value: 'A2' },
    { label: 'B1', value: 'B1' },
    { label: 'B2', value: 'B2' },
    { label: 'C1', value: 'C1' },
    { label: 'C2', value: 'C2' }
  ]

  const describeLevels = [
    { label: t('describeFluency.beginner'), value: t('describeFluency.beginner') },
    { label: t('describeFluency.preIntermediate'), value: t('describeFluency.preIntermediate') },
    { label: t('describeFluency.elementary'), value: t('describeFluency.elementary') },
    { label: t('describeFluency.intermediate'), value: t('describeFluency.intermediate') },
    { label: t('describeFluency.advanced'), value: t('describeFluency.advanced') }
  ]

  const languages = LANGUAGES.map((l) => ({ ...l, label: l.fa, value: l.fa }))
  const socials = SOCIAL_NETWORKS.map((s) => ({ label: s.en, value: s.en }))

  return {
    describeLevels,
    fluencyTypes,
    genders,
    grades,
    languages,
    marriage,
    military,
    numberLevels,
    socials,
    stringLevels
  }
}
