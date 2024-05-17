'use client'

import * as React from 'react'
import { SWRConfig } from 'swr'

import { usePathname, useRouter } from '@/components/ui/navigation'
import { useToast } from '@/components/ui/use-toast'

import axios from '@/lib/axios'

export function SWRProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { toast } = useToast()
  const pathname = usePathname()

  return (
    <SWRConfig
      value={{
        fetcher: url => axios.get(url).then(res => res.data),
        onError: (err: { error: string; status: number; messages: string[] }) => {
          if (err.status === 5000) {
            toast({ title: err.error, variant: 'destructive' })
            router.push(`/login?returnUrl=${pathname}`)
          } else if (err.messages && err.messages.length > 0) {
            err.messages.forEach(message => {
              toast({
                title: message,
                variant: 'destructive',
              })
            })
          } else {
            toast({ title: err.error, variant: 'destructive' })
          }
        },
      }}
    >
      {children}
    </SWRConfig>
  )
}
