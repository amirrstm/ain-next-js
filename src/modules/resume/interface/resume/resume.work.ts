export interface IResumeWork {
  name?: string
  position?: string
  url?: string
  startDate?: string
  endDate?: string
  summary?: string
  highlights?: string[]
  stillWorking?: boolean
  location: {
    city?: string
    state?: string
    country?: string
  }
}
