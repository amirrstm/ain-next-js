import { IconLock, IconLogout, IconSettings, IconUser } from '@tabler/icons-react'
import clsx from 'clsx'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

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
import { Link } from '@/components/ui/navigation'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Progress } from '@/components/ui/progress'
import useUserStore from '@/lib/store/auth'
import { YekanBakhNumFont } from '@/styles/fonts'

const UserProfile = () => {
  const { locale } = useParams()
  const t = useTranslations('User')
  const { user, reset } = useUserStore()

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
    <div>
      <Popover>
        <PopoverTrigger>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground dark:bg-background">
            <IconUser className="h-6 w-6 text-white" />
          </div>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-auto p-0">
          <div className="w-[250px]">
            <div className="p-3">
              <p className="text-sm">{user?.firstName ? `${user.firstName} ${user.lastName || ''}` : t('User')}</p>
              <p className={clsx(locale === 'fa' && YekanBakhNumFont.className, 'mt-2 text-neutral-500 text-xs')}>
                {user?.mobileNumber ? `${t('Mobile')}: ${user?.mobileNumber}` : `${t('Email')}: ${user?.email}`}
              </p>
            </div>

            <div className="space-y-2 border-t border-t-muted py-2">
              <Link
                className="flex cursor-pointer items-center justify-between px-3 py-2 text-neutral-400 hover:bg-white/5"
                href="/app/settings"
              >
                <p className="m-0 text-xs">{t('Settings.Title')}</p>
                <IconSettings className="h-5 w-5" />
              </Link>

              <div
                className="flex cursor-pointer items-center justify-between px-3 py-2 text-neutral-400 hover:bg-white/5"
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
                    <AlertDialogTitle>در نسخه بتا، امکان ارتقای حساب کاربری وجود ندارد.</AlertDialogTitle>
                    <AlertDialogDescription>
                      برای درخواست محتوای بیشتر، با ایمیل پشتیبانی{' '}
                      <a className="text-blue-400" href="mailto:info@ainevis.com">
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
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default UserProfile
