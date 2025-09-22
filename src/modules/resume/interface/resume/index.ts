import type { IResumeAward } from './resume.award'
import type { IResumeBasic } from './resume.basic'
import type { IResumeCertificate } from './resume.certificate'
import type { IResumeEducation } from './resume.education'
import type { IResumeInterest } from './resume.interest'
import type { IResumeInvention } from './resume.invention'
import type { IResumeLanguage } from './resume.language'
import type { IResumeProfile } from './resume.profile'
import type { IResumeProject } from './resume.project'
import type { IResumePublication } from './resume.publication'
import type { IResumeReference } from './resume.reference'
import type { IResumeSkill } from './resume.skill'
import type { IResumeSpeech } from './resume.speech'
import type { IResumeTeaching } from './resume.teaching'
import type { IResumeVolunteer } from './resume.volunteer'
import type { IResumeWork } from './resume.work'

export interface ResumeFile {
  mime: string
  path: string
  size: number
  baseUrl: string
  filename: string
  completedUrl: string
  pathWithFilename: string
}

export interface IResume {
  image: ResumeFile
  basic: IResumeBasic
  work: IResumeWork[]
  skills: IResumeSkill[]
  projects: IResumeProject[]
  profiles: IResumeProfile[]
  education: IResumeEducation[]
  languages: IResumeLanguage[]
  publications: IResumePublication[]
  certificates: IResumeCertificate[]
  volunteers: IResumeVolunteer[]
  awards: IResumeAward[]
  interests: IResumeInterest[]
  references: IResumeReference[]
  speeches: IResumeSpeech[]
  teachings: IResumeTeaching[]
  inventions: IResumeInvention[]
}
export interface IResumeResponse extends IResume {
  _id: string
  title: string
  file: ResumeFile
  template: string
  createdAt: string
  updatedAt: string
  templateSettings: IResumeTemplateSettings
}

export interface IResumeTemplate {
  _id: string
  image: string
  lang: string
  name: string
  path: string
  type: string
  createdAt: string
  isActive: boolean
  updatedAt: string
  description: string
  defaultSettings: IResumeTemplateSettings
}

export interface IResumeTemplateSettings {
  nameColor?: string
  jobTitleColor?: string
  sectionTitleColor?: string
  placesColor?: string
  defaultFont?: string
  roundedProfilePicture?: boolean
  skillBarColor?: string
  hideInformationIcon?: boolean
  blockMargins?: string
  extra?: Record<string, unknown>
}
