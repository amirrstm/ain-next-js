import { useParams } from 'next/navigation'

import clsx from 'clsx'
import { Lock } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

import { useTranslation } from '@/app/i18n/client'
import { YekanBakhNumFont } from '@/styles/fonts'

const UserProfile: React.FC = () => {
  const { lng } = useParams()
  const { t } = useTranslation(lng as string, 'User')

  const progress = 60

  return (
    <div className="border rounded-xl">
      <div className="p-3">
        <p className="text-sm">{t('User')}</p>
        <p className={clsx(YekanBakhNumFont.className, 'text-xs mt-2')}>{t('Mobile')}: 09912821030</p>

        <Button className="w-full mt-2" variant="secondary">
          {t('Logout')}
        </Button>
      </div>

      <div className="border-t p-4 bg-blue-50">
        <p className={clsx(YekanBakhNumFont.className, 'text-xs')}>{t('Generations')}: 100 / 50</p>

        <div className="mt-4 bg-gray-200 rounded-full">
          <div className="relative" style={{ width: `${progress}%` }}>
            <Progress value={100} className="h-2" />
          </div>
        </div>

        <Button className="w-full mt-4 gap-2">
          <Lock className="w-4 h-4" />
          {t('Upgrade')}
        </Button>
      </div>
    </div>
  )
}

export default UserProfile
