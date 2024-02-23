export const defaultNS = 'Main'
export const fallbackLng = 'fa'
export const cookieName = 'i18next'
export const languages = [fallbackLng, 'en']

export function getOptions(lng = fallbackLng, ns: string | string[] = defaultNS) {
  return {
    ns,
    lng,
    defaultNS,
    fallbackLng,
    fallbackNS: defaultNS,
    supportedLngs: languages,
  }
}
