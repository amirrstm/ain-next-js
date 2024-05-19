import { IResumeAward } from './resume.award'
import { IResumeBasic } from './resume.basic'
import { IResumeCertificate } from './resume.certificate'
import { IResumeEducation } from './resume.education'
import { IResumeInterest } from './resume.interest'
import { IResumeInvention } from './resume.invention'
import { IResumeLanguage } from './resume.language'
import { IResumeProfile } from './resume.profile'
import { IResumeProject } from './resume.project'
import { IResumePublication } from './resume.publication'
import { IResumeReference } from './resume.reference'
import { IResumeSkill } from './resume.skill'
import { IResumeSpeech } from './resume.speech'
import { IResumeTeaching } from './resume.teaching'
import { IResumeVolunteer } from './resume.volunteer'
import { IResumeWork } from './resume.work'

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
}
