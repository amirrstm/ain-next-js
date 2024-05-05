import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'

import { IconOctagonPlus } from '@tabler/icons-react'
import React from 'react'

import { Button } from '@/components/ui/button'

const ResumeEmpty: React.FC<{ onCreate: () => void; loading: boolean }> = ({ loading, onCreate }) => {
  const t = useTranslations('Resume')

  return (
    <div className="flex flex-col items-center gap-6 py-40 h-full">
      <Button loading={loading} className="flex gap-2 items-center" onClick={onCreate}>
        <IconOctagonPlus className="w-5 h-5" />
        {t('Create')}
      </Button>
      <span className="flex-1 leading-relaxed">{t('Empty')}</span>
    </div>
  )
}

export default ResumeEmpty
