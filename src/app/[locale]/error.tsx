'use client'

import { useEffect } from 'react'

import ErrorImage from '@/components/ui/error'
import { YekanBakhNumFont } from '@/styles/fonts'

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className={YekanBakhNumFont.className}>
      <div className="p-4">
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            justifyContent: 'center',
            margin: '0 auto',
            maxWidth: 600,
            width: '100%'
          }}
        >
          <div className="h-[450px] w-[500px]">
            <ErrorImage />
          </div>

          <h1 className="text-center text-3xl">خط‌ـــایی رخ داده اســــت، لطفاً دوباره تلاش کنید</h1>
          <p className="mt-2 text-center text-gray-500">اگر مشکل برطرف نشد، با پشتیبانی تماس بگیرید.</p>

          <div className="flex">
            <button
              className="mt-4 rounded-full bg-blue-500 px-8 py-2 font-bold text-white hover:bg-blue-700"
              onClick={reset}
              type="button"
            >
              تلاش مجدد
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
