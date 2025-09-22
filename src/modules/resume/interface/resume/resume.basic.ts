export interface IResumeBasic {
  url?: string
  label?: string
  email?: string
  birthDate?: Date
  firstName?: string
  lastName?: string
  summary?: string
  marriage?: string
  military?: string
  gender?: string
  phone: { countryCode?: string; text?: string }
  location: {
    city?: string
    state?: string
    country?: string
    address?: string
  }
}
