'use client'

import NextError from 'next/error'

import { useEffect } from 'react'

import { YekanBakhNumFont } from '@/styles/fonts'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className={YekanBakhNumFont.className}>
      <NextError statusCode={500} title="خطایی رخ داده است" />
    </div>
  )
}
