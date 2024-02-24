'use client'

import * as React from 'react'
import { SWRConfig } from 'swr'

import { useToast } from '@/components/ui/use-toast'

import axios from '@/lib/axios'

export function SWRProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast()

  return (
    <SWRConfig
      value={{
        fetcher: url => axios.get(url).then(res => res.data),
        onError: (err: { error: string; status: number; messages: string[] }) => {
          if (err.messages && err.messages.length > 0) {
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
