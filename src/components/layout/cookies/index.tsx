'use client'

import { Cookie } from 'lucide-react'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'

import Preferences from './Preferences'

type Props = { showCookies: boolean; setShowCookies: (showCookies: boolean) => void }
const Cookies: React.FC<Props> = ({ showCookies, setShowCookies }) => {
  const [open, setOpen] = useState(false)

  const onAllowAll = () => {
    if (open) {
      setOpen(false)
    }

    setShowCookies(false)
    localStorage.setItem('seen-cookies', 'true')
  }

  return (
    <>
      {!showCookies ? (
        <div className="fixed bottom-2 left-2 md:bottom-6 md:left-6 z-10 cursor-pointer group">
          <div
            onClick={() => setOpen(true)}
            className="w-16 h-16 bg-primary rounded-full p-1 group:hover:bg-opacity-60"
          >
            <div className="w-full h-full rounded-full border flex items-center justify-center">
              <Cookie className="w-10 h-10 text-white" strokeWidth={1} />
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-[100]">
          <div className="absolute bottom-2 left-2 md:bottom-6 md:left-6 z-10">
            <div className="w-16 h-16 bg-primary rounded-full p-1">
              <div className="w-full h-full rounded-full border flex items-center justify-center">
                <Cookie className="w-10 h-10 text-white" strokeWidth={1} />
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 bg-white p-1 w-full max-w-[330px] md:max-w-[1200px] rounded-md">
            <div className="border border-primary rounded-md p-8 flex flex-col md:flex-row gap-6">
              <div className="text-center md:text-left">
                <h1 className="text-lg font-bold">Why we use cookies and other tracking technologies?</h1>

                <p className="text-sm mt-2 opacity-80">
                  Our site enables script (e.g. cookies) that is able to read, store, and write information on your
                  browser and in your device. The information processed by this script includes data relating to you
                  which may include personal identifiers (e.g. IP address and session details) and browsing activity. We
                  use this information for various purposes - e.g. to deliver content, maintain security, enable user
                  choice, improve our sites, and for marketing purposes. You can reject all non-essential processing by
                  choosing to accept only necessary cookies. To personalize your choice and learn more click here to
                  adjust your preferences Cookie Notice
                </p>
              </div>

              <div className="flex flex-col gap-3 min-w-[170px]">
                <Button className="rounded-2xl" onClick={onAllowAll}>
                  Allow All
                </Button>
                <Button className="rounded-2xl">Accept only necessary</Button>
                <Button className="rounded-2xl" onClick={() => setOpen(true)}>
                  Adjust my preferences
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Preferences open={open} setOpen={setOpen} onSave={onAllowAll} />
    </>
  )
}

export default Cookies
