import { useParams, useRouter } from 'next/navigation'

import clsx from 'clsx'
import { Lock } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import Link from '@/components/ui/link'
import { Progress } from '@/components/ui/progress'

import { useTranslation } from '@/app/i18n/client'
import useUserStore from '@/lib/store/auth'
import { YekanBakhNumFont } from '@/styles/fonts'

const UserProfile: React.FC = () => {
  const router = useRouter()
  const { lng } = useParams()
  const { user, reset } = useUserStore()
  const { t } = useTranslation(lng as string, 'User')

  const used = user?.userPlan?.used || 0
  const plan = user?.userPlan?.plan?.generation || 0

  const progress = (used / plan) * 100

  const onLogout = () => {
    reset()
    router.push(`/${lng}/login`)
    window.location.reload()
  }

  return (
    <div className="border rounded-xl">
      <div className="p-3">
        <p className="text-sm">{user?.firstName ? `${user.firstName} ${user.lastName || ''}` : t('User')}</p>
        <p className={clsx(YekanBakhNumFont.className, 'text-xs mt-2')}>
          {t('Mobile')}: {user?.mobileNumber}
        </p>

        <Button className="w-full mt-2" variant="secondary" onClick={onLogout}>
          {t('Logout')}
        </Button>
      </div>

      <div className="border-t p-4 bg-blue-50">
        <p className={clsx(YekanBakhNumFont.className, 'text-xs')}>
          {t('Generations')}: {user?.userPlan?.plan?.generation} / {used}
        </p>

        <div className="mt-4 bg-gray-200 rounded-full">
          <div className="relative" style={{ width: `${progress}%` }}>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <Link lng="fa" href="/pricing">
          <Button className="w-full mt-4 gap-2">
            <Lock className="w-4 h-4" />
            {t('Upgrade')}
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default UserProfile
