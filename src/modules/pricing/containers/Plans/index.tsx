'use client'

import clsx from 'clsx'
import { useTranslations } from 'next-intl'

import Header from '@/components/layout/header'

import SinglePlan from '../../components/SinglePlan'

import type React from 'react'

const PlansContainer: React.FC = () => {
  const t = useTranslations('Pricing')

  return (
    <main>
      <Header />

      <section
        className={clsx(
          'min-h-screen bg-center bg-cover bg-secondary bg-no-repeat',
          'bg-[url("https://res.cloudinary.com/dwwcd5u9v/image/upload/v1708678667/images/hero-screen.svg")]'
        )}
      >
        <div className="flex flex-col items-center justify-center pt-24 md:pt-40">
          <h1 className="text-center font-bold text-3xl text-white md:text-4xl [&_span]:text-primary">
            {t.rich('Title', {
              span: (chunks) => <span>{chunks}</span>
            })}
          </h1>

          <p className="mt-4 text-center font-light text-gray-300 leading-8 md:text-lg">{t('Description')}</p>
        </div>

        <div className="mx-auto max-w-6xl px-6 py-5 md:px-2 md:py-10">
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
