import { useTranslations } from 'next-intl'

import { IconLock } from '@tabler/icons-react'
import clsx from 'clsx'
import React from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

import useUserStore from '@/lib/store/auth'
import { YekanBakhNumFont } from '@/styles/fonts'

const UserProfile: React.FC = () => {
  const t = useTranslations('User')
  const { user, reset } = useUserStore()

  const used = user?.userPlan?.used || 0
  const plan = user?.userPlan?.plan?.generation || 0

  const progress = (used / plan) * 100

  const onLogout = () => {
    reset()
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user-storage')
    window.location.reload()
  }

  if (!user) return null

  return (
    <div className="border rounded-xl">
      <div className="p-3">
        <p className="text-sm">{user?.firstName ? `${user.firstName} ${user.lastName || ''}` : t('User')}</p>
        <p className={clsx(YekanBakhNumFont.className, 'text-xs mt-2')}>
          {user?.mobileNumber ? `${t('Mobile')}: ${user?.mobileNumber}` : `${t('Email')}: ${user?.email}`}
        </p>

        <Button className="w-full mt-2" variant="secondary" onClick={onLogout}>
          {t('Logout')}
        </Button>
      </div>

      <div className="border-t p-4 bg-blue-50">
        <p className={clsx(YekanBakhNumFont.className, 'text-xs')}>
          {t('Generations')}: {used} از {user?.userPlan?.plan?.generation}
        </p>

        <div className="mt-4 bg-gray-200 rounded-full">
          <div className="relative" style={{ width: `${progress}%` }}>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="w-full mt-4 gap-2">
              <IconLock className="w-4 h-4" />
              {t('Upgrade')}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>در نسخه بتا، امکان ارتقای حساب کاربری وجود ندارد.</AlertDialogTitle>
              <AlertDialogDescription>
                برای درخواست محتوای بیشتر، با ایمیل پشتیبانی{' '}
                <a href="mailto:info@ainevis.com" className="text-blue-400">
                  info@ainevis.com
                </a>{' '}
                در ارتباط باشید و یا از طریق پشتیبانی سایت اقدام نمایید.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>متوجه شدم </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

export default UserProfile
