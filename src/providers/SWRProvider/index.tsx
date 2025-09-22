'use client'

import { toast } from 'sonner'
import { SWRConfig } from 'swr'

import { usePathname, useRouter } from '@/components/ui/navigation'
import axios from '@/lib/axios'

import type * as React from 'react'

export function SWRProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const pathname = usePathname()

  return (
    <SWRConfig
      value={{
        fetcher: (url) => axios.get(url).then((res) => res.data),
        onError: (err: { error: string; status: number; messages: string[] }) => {
          if (err.status === 5000) {
            toast.error(err.error)
            router.push(`/login?returnUrl=${pathname}`)
          } else if (err.messages && err.messages.length > 0) {
            err.messages.forEach((message) => {
              toast.error(message)
            })
          } else {
            toast.error(err.error)
          }
        }
      }}
    >
      {children}
    </SWRConfig>
  )
}
