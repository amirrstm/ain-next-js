export const enIsRequired = (value: string) => `${value} is required`
export const faIsRequired = (value: string) => `لطفا ${value} را خالی نگذارید`

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
    Name: faIsRequired('نام'),
  },
}

const translations: Record<string, Translations> = { en, fa }

const lang = 'fa'
export default translations[lang]
