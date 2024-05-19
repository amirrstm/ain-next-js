'use client'

import { useEffect } from 'react'

import ErrorImage from '@/components/ui/error'

import { YekanBakhNumFont } from '@/styles/fonts'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className={YekanBakhNumFont.className}>
      <div className="p-4">
        <div
          style={{
            maxWidth: 600,
            margin: '0 auto',
            width: '100%',
            display: 'flex',
            height: '100vh',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div className="w-[500px] h-[450px]">
            <ErrorImage />
          </div>

          <h1 className="text-3xl text-center">خط‌ـــایی رخ داده اســــت، لطفاً دوباره تلاش کنید</h1>
          <p className="text-center text-gray-500 mt-2">اگر مشکل برطرف نشد، با پشتیبانی تماس بگیرید.</p>

          <div className="flex">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-full mt-4"
              onClick={reset}
            >
              تلاش مجدد
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
