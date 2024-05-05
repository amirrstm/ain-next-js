import { z } from 'zod'
import { useTranslations } from 'next-intl'
import { makeZodI18nMap } from './zorErrorMap'

export const useI18nZodErrors = (formKey?: string) => {
  const t = useTranslations('zod')
  const tForm = useTranslations(`form.${formKey || 'default'}`)

  z.setErrorMap(makeZodI18nMap({ t, tForm }))
}
