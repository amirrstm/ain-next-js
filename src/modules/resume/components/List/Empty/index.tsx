import { useTranslations } from 'next-intl'

import { IconOctagonPlus } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'

import Icon from './Icon'

const ResumeEmpty: React.FC<{ onCreate: () => void; loading: boolean }> = ({ loading, onCreate }) => {
  const t = useTranslations('Resume')

  return (
    <div className="w-full max-w-sm mx-auto p-4 py-10 text-center z-[1] flex gap-4 flex-col justify-center items-center">
      <div className="w-[500px] h-full">
        <Icon />
      </div>
      <Button loading={loading} className="flex gap-2 items-center" onClick={onCreate}>
        <IconOctagonPlus className="w-5 h-5" />
        {t('Create')}
      </Button>
      <span className="flex-1 leading-relaxed text-gray-500">{t('Empty')}</span>
    </div>
  )
}

export default ResumeEmpty
