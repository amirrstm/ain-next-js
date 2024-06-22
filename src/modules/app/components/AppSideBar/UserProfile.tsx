import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useParams } from 'next/navigation'

import { IconLock, IconLogout, IconMoon, IconSettings, IconSun, IconUser } from '@tabler/icons-react'
import clsx from 'clsx'
import React from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Progress } from '@/components/ui/progress'

import useUserStore from '@/lib/store/auth'
import { YekanBakhNumFont } from '@/styles/fonts'

interface Props {
  isOpen: boolean
}

const UserProfile: React.FC<Props> = ({ isOpen }) => {
  const { locale } = useParams()
  const t = useTranslations('User')
  const { user, reset } = useUserStore()
  const { resolvedTheme, setTheme } = useTheme()

  const used = user?.userPlan?.used?.generation || 0
  const plan = user?.userPlan?.plan?.generation || 0

  const progress = (used / plan) * 100

  const onLogout = () => {
    reset()
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user-storage')

    window.location.href = '/login'
  }

  if (!user) return null

  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex items-center text-start gap-3">
          <div className="w-12 h-12 bg-primary dark:bg-background rounded-full flex items-center justify-center">
            <IconUser className="w-6 h-6 text-white" />
          </div>

          {isOpen && (
            <div>
              <p className="text-sm">{user?.firstName ? `${user.firstName} ${user.lastName || ''}` : t('User')}</p>
              <p className={clsx(locale === 'fa' && YekanBakhNumFont.className, 'text-xs text-neutral-500 mt-1')}>
                {user?.mobileNumber ? `${t('Mobile')}: ${user?.mobileNumber}` : `${t('Email')}: ${user?.email}`}
              </p>
            </div>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-auto bg-card" align="start">
        <div className="w-[250px]">
          <div className="p-3">
            <p className="text-sm">{user?.firstName ? `${user.firstName} ${user.lastName || ''}` : t('User')}</p>
            <p className={clsx(locale === 'fa' && YekanBakhNumFont.className, 'text-xs text-neutral-500 mt-2')}>
              {user?.mobileNumber ? `${t('Mobile')}: ${user?.mobileNumber}` : `${t('Email')}: ${user?.email}`}
            </p>
          </div>

          <div className="border-t border-t-muted py-2 space-y-2">
            <div
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="flex items-center justify-between text-neutral-500 px-3 py-2 cursor-pointer hover:bg-white/5"
            >
              <p className="text-xs m-0">{resolvedTheme === 'light' ? t('DarkMode') : t('LightMode')}</p>
              {resolvedTheme === 'light' ? <IconMoon className="w-5 h-5" /> : <IconSun className="w-5 h-5" />}
            </div>

            <div
              onClick={onLogout}
              className="flex items-center justify-between text-destructive px-3 py-2 cursor-pointer hover:bg-white/5"
            >
              <p className="text-xs m-0">{t('Logout')}</p>
              <IconLogout className="w-5 h-5" />
            </div>
          </div>

          <div className="border-t border-t-muted pt-6 p-3">
            <p className={clsx(locale === 'fa' && YekanBakhNumFont.className, 'text-xs')}>
              {t('Generations')}: {used} {t('Of')} {user?.userPlan?.plan?.generation}
            </p>

            <div className="mt-4 bg-gray-100 dark:bg-neutral-700 rounded-full">
              <div className="relative" style={{ width: `${progress}%` }}>
                <Progress value={progress} className="h-2" />
              </div>
            </div>

            <div className="border-t border-t-muted my-4" />

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" className="w-full gap-2">
                  <IconLock className="w-4 h-4" />
                  {t('Upgrade')}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t('UpgradeAlert.Title')}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t.rich('UpgradeAlert.Description', {
                      upgrade: chunks => (
                        <a href="mailto:info@ainevis.com" className="text-blue-400">
                          {chunks}
                        </a>
                      ),
                    })}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction>{t('UpgradeAlert.Action')}</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default UserProfile
