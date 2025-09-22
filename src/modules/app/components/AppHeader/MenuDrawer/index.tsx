import { IconX } from '@tabler/icons-react'
import clsx from 'clsx'
import { AnimatePresence, motion as m } from 'framer-motion'
import Image from 'next/image'

import DashboardMenu from '@/components/ui/dashboard-menu'
import { LOGO_URL } from '@/constants'

import UserProfile from '../../AppSideBar/UserProfile'

type Props = {
  open: boolean
  onClose: () => void
  menus: {
    title: string
    link: string
    icon: React.ReactNode
  }[]
}
const MenuDrawer: React.FC<Props> = ({ open, menus, onClose }) => {
  return (
    <AnimatePresence>
      {open && (
        <m.aside
          animate={{ opacity: open ? 1 : 0 }}
          className={clsx('fixed inset-0 z-[100] h-full bg-background/30 backdrop-blur-sm')}
          exit="unmount"
          initial="unmount"
          variants={{ mount: { opacity: 1 }, unmount: { opacity: 0, transition: { delay: 0.2 } } }}
        >
          <div className="absolute inset-0 h-full w-full" onClick={onClose} />
          <m.div
            animate={{ transform: open ? 'translateX(0)' : 'translateX(100%)' }}
            className="h-screen w-[300px] overflow-y-auto bg-background shadow-lg"
            variants={{
              mount: { opacity: 'translateX(0)', transition: { delay: 0.3 } },
              unmount: { transform: 'translateX(100%)' }
            }}
          >
            <div className="flex items-center justify-between gap-3 px-5 pt-4">
              <div className="relative h-7 sm:h-8">
                <Image
                  alt="logo"
                  className="h-full w-full object-contain dark:contrast-[1] dark:grayscale dark:hue-rotate-[180deg] dark:invert"
                  height={200}
                  src={LOGO_URL}
                  width={200}
                />
              </div>

              <div className="cursor-pointer" onClick={onClose}>
                <IconX className="h-7 w-7" />
              </div>
            </div>

            <div className="my-4 space-y-4">
              {menus.map((menu, index) => (
                <div key={index} onClick={onClose}>
                  <DashboardMenu icon={menu.icon} link={menu.link} title={<span className="text-sm">{menu.title}</span>} />
                </div>
              ))}
            </div>

            <div className="px-5">
              <UserProfile isOpen={false} />
            </div>
          </m.div>
        </m.aside>
      )}
    </AnimatePresence>
  )
}

export default MenuDrawer
