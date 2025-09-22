'use client'

import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useId } from 'react'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useI18nZodErrors } from '@/lib/zodValidation'

const AppSettings: React.FC = () => {
  useI18nZodErrors('auth')
  const { locale } = useParams()

  const t = useTranslations('User')
  const { theme, setTheme } = useTheme()
  const darkId = useId()
  const lightId = useId()
  const systemId = useId()

  const onChangeTheme = (value: string) => {
    setTheme(value)
  }

  return (
    <div className="rounded-xl border border-muted bg-card">
      <div className="border-b border-b-muted p-4">
        <span className="text-lg">{t('Settings.AppSettings')}</span>
      </div>

      <div className="grid grid-cols-12 gap-6 p-4">
        <div className="col-span-12 md:col-span-6">
          <p className="mb-2 text-gray-400">{t('Settings.Theme')}</p>
          <RadioGroup
            className="flex gap-6"
            defaultValue={theme}
            dir={locale === 'fa' ? 'rtl' : 'ltr'}
            onValueChange={onChangeTheme}
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem id={darkId} value="dark" />
              <Label htmlFor={darkId}>{t('Settings.DarkMode')}</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem id={lightId} value="light" />
              <Label htmlFor={lightId}>{t('Settings.LightMode')}</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem id={systemId} value="system" />
              <Label htmlFor={systemId}>{t('Settings.SystemMode')}</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  )
}

export default AppSettings
