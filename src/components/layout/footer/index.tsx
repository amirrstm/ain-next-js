'use client'

import { useTranslations } from 'next-intl'

import { IconArrowLeft } from '@tabler/icons-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Link } from '@/components/ui/navigation'

const Footer: React.FC = () => {
  const t = useTranslations('Layout')

  return (
    <footer>
      <section className="bg-secondary relative min-h-[150px] md:min-h-[200px]">
        <div className="-top-[125px] w-full absolute px-4 md:p-0">
          <div className="max-w-6xl mx-auto p-6 md:p-10 bg-background shadow-xl rounded-2xl">
            <h1 className="text-xl md:text-4xl font-bold">قدرت هوش مصنوعی در دستان شما</h1>
            <p className="mt-4 text-xs md:text-base">
              همین الان روی دکمه زیر کلیک کنید و کاملا رایگان یک حساب کاربری بسازید و شروع به تولید محتوا کنید
            </p>

            <div className="pt-8">
              <Link href="/login">
                <Button className="rounded-full gap-2 items-center px-6">
                  {t('Home.GetStarted')}
                  <IconArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="container flex py-8 justify-center items-center text-gray-300 gap-4">
            <Link href="/privacy" className="text-xs hover:text-blue-300">
              قوانین و مقررات
            </Link>

            <Link href="/privacy" className="text-xs hover:text-blue-300">
              حریم خصوصی
            </Link>

            <div dir="ltr" className="text-sm">
              © {new Date().getFullYear()} AINEVIS
            </div>
          </div>

          <div className="flex justify-center py-2">
            <div
              className="h-[100px]"
              dangerouslySetInnerHTML={{
                __html:
                  "<a referrerpolicy='origin' target='_blank' href='https://trustseal.enamad.ir/?id=469401&Code=QgbUDh4McXTFoUBfMLYQVpjy9sOSdJd6'><img referrerpolicy='origin' src='https://trustseal.enamad.ir/logo.aspx?id=469401&Code=QgbUDh4McXTFoUBfMLYQVpjy9sOSdJd6' alt='' style='cursor:pointer' Code='QgbUDh4McXTFoUBfMLYQVpjy9sOSdJd6'></a>",
              }}
            />
          </div>
        </div>
      </section>
    </footer>
  )
}

export default Footer
