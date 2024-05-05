import { useTranslations } from 'next-intl'

import { LANGUAGES, SOCIAL_NETWORKS } from '@/constants'

export function useConstants() {
  const t = useTranslations('constants')
  const genders = [
    { value: t('gender.male'), label: t('gender.male') },
    { value: t('gender.female'), label: t('gender.female') },
  ]

  const marriage = [
    { value: t('marriage.single'), label: t('marriage.single') },
    { value: t('marriage.married'), label: t('marriage.married') },
  ]

  const military = [
    { value: t('military.included'), label: t('military.included') },
    { value: t('military.doing'), label: t('military.doing') },
    { value: t('military.completed'), label: t('military.completed') },
    { value: t('military.exempt'), label: t('military.exempt') },
    { value: t('military.educationExempt'), label: t('military.educationExempt') },
    { value: t('military.noMedicalExempt'), label: t('military.noMedicalExempt') },
    { value: t('military.medicalExempt'), label: t('military.medicalExempt') },
  ]

  const grades = [
    { value: t('education.underDiploma'), label: t('education.underDiploma') },
    { value: t('education.diploma'), label: t('education.diploma') },
    { value: t('education.associate'), label: t('education.associate') },
    { value: t('education.bachelor'), label: t('education.bachelor') },
    { value: t('education.master'), label: t('education.master') },
    { value: t('education.phd'), label: t('education.phd') },
    { value: t('education.postPhd'), label: t('education.postPhd') },
  ]

  const fluencyTypes = [
    { value: t('languageFluencyType.describe'), label: t('languageFluencyType.describe'), key: 'describe' },
    { value: t('languageFluencyType.a1-c2'), label: t('languageFluencyType.a1-c2'), key: 'a1-c2' },
    { value: t('languageFluencyType.graphical'), label: t('languageFluencyType.graphical'), key: 'graphical' },
  ]

  const numberLevels = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
  ]

  const stringLevels = [
    { value: 'A1', label: 'A1' },
    { value: 'A2', label: 'A2' },
    { value: 'B1', label: 'B1' },
    { value: 'B2', label: 'B2' },
    { value: 'C1', label: 'C1' },
    { value: 'C2', label: 'C2' },
  ]

  const describeLevels = [
    { value: t('describeFluency.beginner'), label: t('describeFluency.beginner') },
    { value: t('describeFluency.preIntermediate'), label: t('describeFluency.preIntermediate') },
    { value: t('describeFluency.elementary'), label: t('describeFluency.elementary') },
    { value: t('describeFluency.intermediate'), label: t('describeFluency.intermediate') },
    { value: t('describeFluency.advanced'), label: t('describeFluency.advanced') },
  ]

  const languages = LANGUAGES.map(l => ({ ...l, value: l.fa, label: l.fa }))
  const socials = SOCIAL_NETWORKS.map(s => ({ value: s.en, label: s.en }))

  return {
    grades,
    genders,
    marriage,
    military,
    languages,
    socials,
    fluencyTypes,
    numberLevels,
    stringLevels,
    describeLevels,
  }
}
