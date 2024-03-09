'use client'

import Image from 'next/image'

import clsx from 'clsx'
import { PlayCircle } from 'lucide-react'

import Header from '@/components/layout/header'

import Benefits from '../../components/Benefits'
import HeroHeader from '../../components/Hero'

const videoUrl =
  'https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fe835b205df6c119d305b9b7f5a9ccf7c.cdn.bubble.io%2Ff1707176143454x733542022181023900%2Fwww.krater.ai-hp-appfeature.png?w=1536&h=844&auto=compress&dpr=1&fit=max'

const HomeContainer: React.FC = () => {
  return (
    <main>
      <Header />
      <section
        className={clsx(
          'bg-secondary bg-no-repeat  bg-cover bg-center',
          'bg-[url("https://res.cloudinary.com/dwwcd5u9v/image/upload/v1708678667/images/hero-screen.svg")]',
        )}
      >
        <HeroHeader />
      </section>

      <div className="bg-secondary">
        <div className="max-w-6xl mx-auto py-12 px-6 bg-secondary">
          <div className="relative w-full sm:h-auto rounded-2xl shadow-xl overflow-hidden">
            <Image
              alt="open-ai"
              width={1000}
              height={1000}
              src="/images/app-layout.png"
              className="w-full h-full object-contain"
            />

            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <div
                className="p-4 rounded-full absolute w-24 h-24"
                style={{
                  background: 'rgba(0,43,175,0.3)',
                  boxShadow: '0px 0px 150px 2px hsl(var(--primary))',
                }}
              />
              <div className="bg-primary w-20 h-20 rounded-full flex items-center justify-center text-white relative z-10 cursor-pointer">
                <PlayCircle className="w-10 h-10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Benefits />
    </main>
  )
}

export default HomeContainer
