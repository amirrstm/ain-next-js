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
      <div className="bg-background rounded-lg border border-muted">
        <div className="p-3 sm:p-4 border-b border-b-muted flex justify-between items-center">
          <div>
            <h2 className="text-md sm:text-lg font-semibold">{t('Title')}</h2>
            <p className="text-xs sm:text-sm text-gray-400">{t('Description')}</p>
          </div>
        </div>

        <div className="py-6 px-4 flex flex-col lg:flex-row items-center gap-8 sm:gap-6 lg:gap-3">
          <div className="px-8">
            <ProfileAvatar />
          </div>

          <div className="flex-1">
            <BasicForm />
          </div>
        </div>
      </div>

      <div className="bg-background rounded-lg border border-muted">
        <div className="p-3 sm:p-4 border-b border-b-muted">
          <h2 className="text-md sm:text-lg font-semibold">{t('ContactTitle')}</h2>
          <p className="text-xs sm:text-sm text-gray-400">{t('ContactDescription')}</p>
        </div>

        <div className="py-6 px-4">
          <ContactForm />
        </div>
      </div>

      <SummaryForm />

      <SocialForm />
    </>
  )
}

export default BasicTab
