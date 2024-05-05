export interface IResumeEducation {
  institution?: string
  area?: string
  studyType?: string
  fieldOfStudy?: string
  startDate?: Date
  endDate?: Date
  score?: string
  highlights?: string[]
  stillStudying?: boolean
  location: {
    city?: string
    state?: string
    country?: string
  }
}
