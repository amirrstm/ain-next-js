import { useTranslations } from 'next-intl'
import { z } from 'zod'

import { makeZodI18nMap } from './zorErrorMap'

export const useI18nZodErrors = (formKey?: string) => {
  const t = useTranslations('zod')
  const tForm = useTranslations(`form.${formKey || 'default'}`)

  z.setErrorMap(makeZodI18nMap({ t, tForm }))
}
