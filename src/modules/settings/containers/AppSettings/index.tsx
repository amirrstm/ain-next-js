'use client'

import { useTranslations } from 'next-intl'

import IconSettings from '@/icons/menus/settings'

import AppSettings from '../../components/AppSettings'
import UserSettings from '../../components/UserSettings'

const AppSettingsContainer: React.FC = () => {
  const t = useTranslations('User')

  return (
    <div className="p-2 md:py-3 md:px-8">
      <div className="md:mb-4 pt-2 pb-4 md:pb-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7">
            <IconSettings />
          </div>
          <span className="text-lg">{t('Settings.Title')}</span>
        </div>
      </div>

      <div className="space-y-3">
        <UserSettings />

        <AppSettings />
      </div>
    </div>
  )
}

export default AppSettingsContainer
