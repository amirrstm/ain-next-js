'use client'

import clsx from 'clsx'
import React from 'react'

import { useTranslation } from '@/app/i18n/client'

type Props = { lng: string }
const Footer: React.FC<Props> = ({ lng }) => {
  const { t } = useTranslation(lng, 'Layout')

  return (
    <>
      <footer className={clsx('bg-secondary mt-6')}></footer>

      {/* <div className="container flex justify-center py-4">
        <div className="text-sm">© {new Date().getFullYear()} INevesht</div>
      </div> */}
    </>
  )
}

export default Footer
