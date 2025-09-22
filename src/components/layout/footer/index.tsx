'use client'

import { IconArrowLeft } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Link } from '@/components/ui/navigation'

import type React from 'react'

const Footer: React.FC = () => {
  const t = useTranslations('Layout')

  return (
    <footer className="pt-10">
      <section className="relative min-h-[150px] bg-background md:min-h-[200px]">
        <div className="-top-[125px] absolute w-full px-4 md:p-0">
          <div className="mx-auto max-w-6xl rounded-2xl bg-background p-6 shadow-xl md:p-10">
            <h1 className="font-bold text-xl md:text-4xl">{t('Footer.Title')}</h1>
            <p className="mt-4 text-xs md:text-base">{t('Footer.Description')}</p>

            <div className="pt-8">
              <Link href="/login">
                <Button className="items-center gap-2 rounded-full px-6">
                  {t('Home.GetStarted')}
                  <IconArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="container flex items-center justify-center gap-4 py-8 text-gray-300">
            <Link className="text-xs hover:text-blue-300" href="/privacy">
              {t('Footer.Menus.Privacy')}
            </Link>

            <Link className="text-xs hover:text-blue-300" href="/privacy">
              {t('Footer.Menus.Terms')}
            </Link>

            <div className="text-sm" dir="ltr">
              © {new Date().getFullYear()} AINEVIS
            </div>
          </div>

          <div className="flex justify-center bg-background py-2">
            <div
              className="h-[100px]"
              dangerouslySetInnerHTML={{
                __html:
                  "<a referrerpolicy='origin' target='_blank' href='https://trustseal.enamad.ir/?id=469401&Code=QgbUDh4McXTFoUBfMLYQVpjy9sOSdJd6'><img referrerpolicy='origin' src='https://trustseal.enamad.ir/logo.aspx?id=469401&Code=QgbUDh4McXTFoUBfMLYQVpjy9sOSdJd6' alt='' style='cursor:pointer' Code='QgbUDh4McXTFoUBfMLYQVpjy9sOSdJd6'></a>"
              }}
            />
          </div>
        </div>
      </section>
    </footer>
  )
}

export default Footer
