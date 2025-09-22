import { useTranslations } from 'next-intl'

import { ProfileAvatar } from './Avatar'
import BasicForm from './BasicForm'
import ContactForm from './ContactForm'
import SocialForm from './SocialForm'
import SummaryForm from './SummaryForm'

const BasicTab: React.FC = () => {
  const t = useTranslations('Resume.Basic')

  return (
    <>
      <div className="rounded-lg border border-muted bg-card">
        <div className="flex items-center justify-between border-b border-b-muted p-3 sm:p-4">
          <div>
            <h2 className="font-semibold text-md sm:text-lg">{t('Title')}</h2>
            <p className="text-gray-400 text-xs sm:text-sm">{t('Description')}</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-8 px-4 py-6 sm:gap-6 lg:flex-row lg:gap-3">
          <div className="px-8">
            <ProfileAvatar />
          </div>

          <div className="flex-1">
            <BasicForm />
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-muted bg-card">
        <div className="border-b border-b-muted p-3 sm:p-4">
          <h2 className="font-semibold text-md sm:text-lg">{t('ContactTitle')}</h2>
          <p className="text-gray-400 text-xs sm:text-sm">{t('ContactDescription')}</p>
        </div>

        <div className="px-4 py-6">
          <ContactForm />
        </div>
      </div>

      <SummaryForm />

      <SocialForm />
    </>
  )
}

export default BasicTab
