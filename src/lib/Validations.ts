import i18next from 'i18next'

const enIsRequired = (value: string) => `${value} is required`
const faIsRequired = (value: string) => `لطفا ${value} را خالی نگذارید`

type Translations = Record<string, Record<string, string>>
const en: Translations = {
  Login: {
    Mobile: enIsRequired('Mobile'),
  },
}

const fa: Translations = {
  Login: {
    Mobile: faIsRequired('شماره موبایل'),
    MobileLength: 'شماره موبایل باید ۱۱ رقم باشد',
    Code: faIsRequired('کد تایید'),
  },
}

const translations: Record<string, Translations> = { en, fa }

const lang = i18next.language ?? 'fa'
export default translations[lang]
