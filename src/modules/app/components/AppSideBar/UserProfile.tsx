import { IconLock, IconLogout, IconMoon, IconSun, IconUser } from '@tabler/icons-react'
import clsx from 'clsx'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Progress } from '@/components/ui/progress'
import useUserStore from '@/lib/store/auth'
import { YekanBakhNumFont } from '@/styles/fonts'

import type React from 'react'

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
        <div className="flex items-center gap-3 text-start">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary dark:bg-background">
            <IconUser className="h-6 w-6 text-white" />
          </div>

          {isOpen && (
            <div>
              <p className="text-sm">{user?.firstName ? `${user.firstName} ${user.lastName || ''}` : t('User')}</p>
              <p className={clsx(locale === 'fa' && YekanBakhNumFont.className, 'mt-1 text-neutral-500 text-xs')}>
                {user?.mobileNumber ? `${t('Mobile')}: ${user?.mobileNumber}` : user?.email}
              </p>
            </div>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto bg-card p-0">
        <div className="w-[250px]">
          <div className="p-3">
            <p className="text-sm">{user?.firstName ? `${user.firstName} ${user.lastName || ''}` : t('User')}</p>
            <p className={clsx(locale === 'fa' && YekanBakhNumFont.className, 'mt-2 text-neutral-500 text-xs')}>
              {user?.mobileNumber ? `${t('Mobile')}: ${user?.mobileNumber}` : user?.email}
            </p>
          </div>

          <div className="space-y-2 border-t border-t-muted py-2">
            <div
              className="flex cursor-pointer items-center justify-between px-3 py-2 text-neutral-500 hover:bg-white/5"
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            >
              <p className="m-0 text-xs">{resolvedTheme === 'light' ? t('DarkMode') : t('LightMode')}</p>
              {resolvedTheme === 'light' ? <IconMoon className="h-5 w-5" /> : <IconSun className="h-5 w-5" />}
            </div>

            <div
              className="flex cursor-pointer items-center justify-between px-3 py-2 text-destructive hover:bg-white/5"
              onClick={onLogout}
            >
              <p className="m-0 text-xs">{t('Logout')}</p>
              <IconLogout className="h-5 w-5" />
            </div>
          </div>

          <div className="border-t border-t-muted p-3 pt-6">
            <p className={clsx(locale === 'fa' && YekanBakhNumFont.className, 'text-xs')}>
              {t('Generations')}: {used} {t('Of')} {user?.userPlan?.plan?.generation}
            </p>

            <div className="mt-4 rounded-full bg-gray-100 dark:bg-neutral-700">
              <div className="relative" style={{ width: `${progress}%` }}>
                <Progress className="h-2" value={progress} />
              </div>
            </div>

            <div className="my-4 border-t border-t-muted" />

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="w-full gap-2" size="sm">
                  <IconLock className="h-4 w-4" />
                  {t('Upgrade')}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t('UpgradeAlert.Title')}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t.rich('UpgradeAlert.Description', {
                      upgrade: (chunks) => (
                        <a className="text-blue-400" href="mailto:info@ainevis.com">
                          {chunks}
                        </a>
                      )
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
