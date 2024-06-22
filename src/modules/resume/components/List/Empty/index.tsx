import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

import { IconOctagonPlus } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'

import Icon from './Icon'

const ResumeEmpty: React.FC<{ onCreate: () => void }> = ({ onCreate }) => {
  const { locale } = useParams()
  const t = useTranslations('Resume')

  return (
    <div className="w-full max-w-sm mx-auto p-4 py-10 text-center z-[1] flex gap-4 flex-col justify-center items-center">
      <div className="w-[500px] h-full">
        <Icon />
      </div>
      <Button className="flex gap-2 items-center" onClick={onCreate}>
        <IconOctagonPlus className="w-5 h-5" />
        {t('Create.Title')}
      </Button>
      <span className="flex-1 leading-relaxed text-gray-500">
        {t('Empty', { number: locale === 'fa' ? '۳' : '3' })}
      </span>
    </div>
  )
}

export default ResumeEmpty
