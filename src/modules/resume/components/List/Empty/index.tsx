import { IconOctagonPlus } from '@tabler/icons-react'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'

import Icon from './Icon'

const ResumeEmpty: React.FC<{ onCreate: () => void }> = ({ onCreate }) => {
  const { locale } = useParams()
  const t = useTranslations('Resume')

  return (
    <div className="z-[1] mx-auto flex w-full max-w-sm flex-col items-center justify-center gap-4 p-4 py-10 text-center">
      <div className="h-full w-[500px]">
        <Icon />
      </div>
      <Button className="flex items-center gap-2" onClick={onCreate}>
        <IconOctagonPlus className="h-5 w-5" />
        {t('Create.Title')}
      </Button>
      <span className="flex-1 text-gray-500 leading-relaxed">{t('Empty', { number: locale === 'fa' ? '۳' : '3' })}</span>
    </div>
  )
}

export default ResumeEmpty
