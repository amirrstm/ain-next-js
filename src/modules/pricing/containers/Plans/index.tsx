'use client'

import { useParams } from 'next/navigation'

import clsx from 'clsx'
import React from 'react'

import Header from '@/components/layout/header'

import { useTranslation } from '@/app/i18n/client'

import SinglePlan from '../../components/SinglePlan'

const PlansContainer: React.FC = () => {
  const { lng } = useParams()
  const { t } = useTranslation(lng as string, 'Pricing')

  return (
    <main>
      <Header />

      <section
        className={clsx(
          'bg-secondary bg-no-repeat  bg-cover bg-center min-h-screen',
          'bg-[url("https://res.cloudinary.com/dwwcd5u9v/image/upload/v1708678667/images/hero-screen.svg")]',
        )}
      >
        <div className="pt-24 md:pt-40 flex flex-col items-center justify-center">
          <div
            className="text-3xl md:text-4xl text-white font-bold text-center [&_span]:text-primary"
            dangerouslySetInnerHTML={{ __html: t('Title') }}
          />

          <p className="mt-4 md:text-lg text-center font-light leading-8 text-gray-300">{t('Description')}</p>
        </div>

        <div className="max-w-6xl mx-auto py-5 md:py-10 px-6 md:px-2">
          <div className="grid grid-cols-12 gap-4 md:gap-8">
            <SinglePlan />
            <SinglePlan />
            <SinglePlan isPopular />
            <SinglePlan />
          </div>
        </div>
      </section>
    </main>
  )
}

export default PlansContainer
