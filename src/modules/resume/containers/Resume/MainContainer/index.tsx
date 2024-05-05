import { zodResolver } from '@hookform/resolvers/zod'
import React, { ReactNode, useContext, useEffect } from 'react'
import { FormProvider, useForm, useFormState } from 'react-hook-form'

import useUserStore from '@/lib/store/auth'
import { resumeDefaultValues } from '@/modules/resume/constants/resume.default'
import { ResumeFormType } from '@/modules/resume/interface'
import { IResumeEducation } from '@/modules/resume/interface/resume/resume.education'
import { IResumeInterest } from '@/modules/resume/interface/resume/resume.interest'
import { IResumeProject } from '@/modules/resume/interface/resume/resume.project'
import { IResumeVolunteer } from '@/modules/resume/interface/resume/resume.volunteer'
import { IResumeWork } from '@/modules/resume/interface/resume/resume.work'
import { resumeSchema } from '@/modules/resume/validations'

import {
  BasicTab,
  EducationTab,
  OtherTab,
  ProjectTab,
  PublicationTab,
  SkillTab,
  WorkTab,
} from '../../../components/Tabs'
import { RESUME_ENUM_TABS } from '../../../constants/resume.enum'
import { ResumeContext } from '../../../context'
import {
  useAward,
  useBasic,
  useCertificate,
  useEducation,
  useInterest,
  useInvention,
  useLanguage,
  useProfile,
  useProject,
  usePublication,
  useReference,
  useSkill,
  useSpeech,
  useTeaching,
  useVolunteer,
  useWork,
} from '../../../hooks/mutations'

const Tabs: Record<RESUME_ENUM_TABS, ReactNode> = {
  [RESUME_ENUM_TABS.Basic]: <BasicTab />,
  [RESUME_ENUM_TABS.Education]: <EducationTab />,
  [RESUME_ENUM_TABS.Experience]: <WorkTab />,
  [RESUME_ENUM_TABS.Skills]: <SkillTab />,
  [RESUME_ENUM_TABS.Projects]: <ProjectTab />,
  [RESUME_ENUM_TABS.Publications]: <PublicationTab />,
  [RESUME_ENUM_TABS.Others]: <OtherTab />,
}

const ResumeMainContainer: React.FC = () => {
  const { user } = useUserStore()
  const { activeTab, resume } = useContext(ResumeContext)

  const { trigger: triggerWork } = useWork()
  const { trigger: triggerSkill } = useSkill()
  const { trigger: triggerBasic } = useBasic()
  const { trigger: triggerAward } = useAward()
  const { trigger: triggerSpeech } = useSpeech()
  const { trigger: triggerProject } = useProject()
  const { trigger: triggerProfile } = useProfile()
  const { trigger: triggerTeaching } = useTeaching()
  const { trigger: triggerLanguage } = useLanguage()
  const { trigger: triggerInterest } = useInterest()
  const { trigger: triggerEducation } = useEducation()
  const { trigger: triggerReference } = useReference()
  const { trigger: triggerVolunteer } = useVolunteer()
  const { trigger: triggerInvention } = useInvention()
  const { trigger: triggerCertificate } = useCertificate()
  const { trigger: triggerPublication } = usePublication()

  const form = useForm<ResumeFormType>({
    resolver: zodResolver(resumeSchema),
    defaultValues: resumeDefaultValues,
  })
  const { dirtyFields } = useFormState({ control: form.control })

  useEffect(() => {
    if (activeTab) {
      if (dirtyFields.basic) {
        const finalValues = form.getValues().basic
        triggerBasic(finalValues)
        form.reset({}, { keepValues: true })
      }

      if (dirtyFields.educations) {
        const educations = form.getValues().educations
        triggerEducation({
          educations: educations.map(e => ({
            ...e,
            highlights: (e.highlights || []).filter(({ value }) => !!value).map(({ value }) => value),
          })) as IResumeEducation[],
        })
        form.reset({}, { keepValues: true })
      }

      if (dirtyFields.works) {
        const works = form.getValues().works

        triggerWork({
          works: works.map(w => ({
            ...w,
            highlights: (w.highlights || []).filter(({ value }) => !!value).map(({ value }) => value),
          })) as IResumeWork[],
        })
        form.reset({}, { keepValues: true })
      }

      if (dirtyFields.projects) {
        const projects = form.getValues().projects

        triggerProject({
          projects: projects.map(w => ({
            ...w,
            highlights: (w.highlights || []).filter(({ value }) => !!value).map(({ value }) => value),
          })) as IResumeProject[],
        })
        form.reset({}, { keepValues: true })
      }

      if (dirtyFields.skills) {
        const skills = form.getValues().skills
        triggerSkill({ skills })
        form.reset({}, { keepValues: true })
      }

      if (dirtyFields.languages) {
        const languages = form.getValues().languages
        triggerLanguage({ languages })
        form.reset({}, { keepValues: true })
      }

      if (dirtyFields.certificates) {
        const certificates = form.getValues().certificates
        triggerCertificate({ certificates })
        form.reset({}, { keepValues: true })
      }

      if (dirtyFields.profiles) {
        const profiles = form.getValues().profiles
        triggerProfile({ profiles })
        form.reset({}, { keepValues: true })
      }

      if (dirtyFields.publications) {
        const publications = form.getValues().publications
        triggerPublication({ publications })
        form.reset({}, { keepValues: true })
      }

      if (dirtyFields.awards) {
        const awards = form.getValues().awards
        triggerAward({ awards })
        form.reset({}, { keepValues: true })
      }

      if (dirtyFields.speeches) {
        const speeches = form.getValues().speeches
        triggerSpeech({ speeches })
        form.reset({}, { keepValues: true })
      }

      if (dirtyFields.teachings) {
        const teachings = form.getValues().teachings
        triggerTeaching({ teachings })
        form.reset({}, { keepValues: true })
      }

      if (dirtyFields.interests) {
        const interests = form.getValues().interests
        triggerInterest({
          interests: interests.map(w => ({
            ...w,
            keywords: (w.keywords || []).filter(({ value }) => !!value).map(({ value }) => value),
          })) as IResumeInterest[],
        })
        form.reset({}, { keepValues: true })
      }

      if (dirtyFields.references) {
        const references = form.getValues().references
        triggerReference({ references })
        form.reset({}, { keepValues: true })
      }

      if (dirtyFields.volunteers) {
        const volunteers = form.getValues().volunteers
        triggerVolunteer({
          volunteers: volunteers.map(w => ({
            ...w,
            highlights: (w.highlights || []).filter(({ value }) => !!value).map(({ value }) => value),
          })) as IResumeVolunteer[],
        })
        form.reset({}, { keepValues: true })
      }

      if (dirtyFields.inventions) {
        const inventions = form.getValues().inventions
        triggerInvention({ inventions })
        form.reset({}, { keepValues: true })
      }
    }
  }, [activeTab])

  useEffect(() => {
    if (resume && user) {
      if (resume?.basic?.firstName) {
        form.setValue('basic.firstName', resume.basic.firstName)
        form.setValue('basic.lastName', resume.basic.lastName)
      } else {
        form.setValue('basic.firstName', user?.firstName)
        form.setValue('basic.lastName', user?.lastName)
      }

      if (resume?.basic?.email === '') {
        form.setValue('basic.email', user?.email)
      } else {
        form.setValue('basic.email', resume?.basic?.email)
      }

      if (!resume?.basic?.phone || resume?.basic?.phone?.text === '') {
        form.setValue('basic.phone', { countryCode: '+98', text: user?.mobileNumber?.slice(1) })
      } else {
        form.setValue('basic.phone', resume?.basic?.phone)
      }

      if (resume.basic) {
        form.setValue('basic.url', resume.basic.url)
        form.setValue('basic.label', resume.basic.label)
        form.setValue('basic.summary', resume.basic.summary)
        form.setValue('basic.gender', resume.basic.gender)
        form.setValue('basic.marriage', resume.basic.marriage)
        form.setValue('basic.military', resume.basic.military)
        form.setValue('basic.location', resume.basic.location)
        form.setValue('basic.birthDate', !resume.basic.birthDate ? new Date() : new Date(resume.basic.birthDate))
      }

      if (resume.profiles && resume.profiles.length > 0) {
        form.setValue('profiles', resume.profiles)
      }

      if (resume.education && resume.education.length > 0) {
        form.setValue(
          'educations',
          resume.education.map(w => ({
            ...w,
            highlights: (w.highlights && w.highlights.length > 0 ? w.highlights : ['']).map(h => ({ value: h })),
          })) as any,
        )
      }

      if (resume.work && resume.work.length > 0) {
        form.setValue(
          'works',
          resume.work.map(w => ({
            ...w,
            highlights: (w.highlights && w.highlights.length > 0 ? w.highlights : ['']).map(h => ({ value: h })),
          })) as any,
        )
      }

      if (resume.projects && resume.projects.length > 0) {
        form.setValue(
          'projects',
          resume.projects.map(w => ({
            ...w,
            highlights: (w.highlights && w.highlights.length > 0 ? w.highlights : ['']).map(h => ({ value: h })),
          })) as any,
        )
      }

      if (resume.skills && resume.skills.length > 0) {
        form.setValue('skills', resume.skills)
      }

      if (resume.languages && resume.languages.length > 0) {
        form.setValue('languages', resume.languages)
      }

      if (resume.certificates && resume.certificates.length > 0) {
        form.setValue('certificates', resume.certificates)
      }

      if (resume.publications && resume.publications.length > 0) {
        form.setValue('publications', resume.publications)
      }

      if (resume.awards && resume.awards.length > 0) {
        form.setValue('awards', resume.awards)
      }

      if (resume.speeches && resume.speeches.length > 0) {
        form.setValue('speeches', resume.speeches)
      }

      if (resume.teachings && resume.teachings.length > 0) {
        form.setValue('teachings', resume.teachings)
      }

      if (resume.interests && resume.interests.length > 0) {
        form.setValue(
          'interests',
          resume.interests.map(w => ({ ...w, keywords: (w.keywords || []).map(h => ({ value: h, label: h })) })) as any,
        )
      }

      if (resume.references && resume.references.length > 0) {
        form.setValue('references', resume.references)
      }

      if (resume.volunteers && resume.volunteers.length > 0) {
        form.setValue(
          'volunteers',
          resume.volunteers.map(w => ({
            ...w,
            highlights: (w.highlights && w.highlights.length > 0 ? w.highlights : ['']).map(h => ({ value: h })),
          })) as any,
        )
      }

      if (resume.inventions && resume.inventions.length > 0) {
        form.setValue('inventions', resume.inventions)
      }
    }
  }, [user])

  return (
    <FormProvider {...form}>
      <form className="space-y-3 sm:space-y-3">{Tabs[activeTab]}</form>
    </FormProvider>
  )
}

export default ResumeMainContainer
