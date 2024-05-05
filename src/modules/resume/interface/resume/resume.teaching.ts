export interface IResumeTeaching {
  date?: Date
  title?: string
  summary?: string
  institution?: string
  location?: {
    city?: string
    state?: string
    country?: string
  }
}
