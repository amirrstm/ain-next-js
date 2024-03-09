import Image from 'next/image'

import { IconX } from '@tabler/icons-react'
import clsx from 'clsx'
import { AnimatePresence, motion as m } from 'framer-motion'

import DashboardMenu from '@/components/ui/dashboard-menu'

import UserProfile from '../AppSideBar/UserProfile'

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
          exit="unmount"
          initial="unmount"
          animate={{ opacity: open ? 1 : 0 }}
          className={clsx('fixed inset-0 z-[100] h-full bg-background/30 backdrop-blur-sm')}
          variants={{ unmount: { opacity: 0, transition: { delay: 0.2 } }, mount: { opacity: 1 } }}
        >
          <div className="absolute w-full h-full inset-0" onClick={onClose} />
          <m.div
            className="w-[300px] h-screen bg-background shadow-lg overflow-y-auto"
            animate={{ transform: open ? 'translateX(0)' : 'translateX(100%)' }}
            variants={{
              unmount: { transform: 'translateX(100%)' },
              mount: { opacity: 'translateX(0)', transition: { delay: 0.3 } },
            }}
          >
            <div className="flex justify-between items-center gap-3 pt-4 px-5">
              <div className="relative h-7 sm:h-8">
                <Image
                  alt="logo"
                  width={200}
                  height={200}
                  src="/images/logo-black.png"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="cursor-pointer" onClick={onClose}>
                <IconX className="w-7 h-7" />
              </div>
            </div>

            <div className="my-4 space-y-4">
              {menus.map((menu, index) => (
                <div key={index} onClick={onClose}>
                  <DashboardMenu
                    link={menu.link}
                    icon={menu.icon}
                    title={<span className="text-sm">{menu.title}</span>}
                  />
                </div>
              ))}
            </div>

            <div className="px-5">
              <UserProfile />
            </div>
          </m.div>
        </m.aside>
      )}
    </AnimatePresence>
  )
}

export default MenuDrawer
