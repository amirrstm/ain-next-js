'use client'

import Image from 'next/image'

import { IconPlayerPlayFilled } from '@tabler/icons-react'
import clsx from 'clsx'

import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import { Link } from '@/components/ui/navigation'

import { LAYOUT_IMAGE } from '@/constants'

import Contents from '../../components/Contents'
import HeroHeader from '../../components/Hero'

const HomeContainer: React.FC = () => {
  return (
    <main>
      <Header />

      <section className={clsx('bg-[url("/images/hero-screen.svg")]', 'bg-secondary bg-no-repeat bg-cover bg-center')}>
        <HeroHeader />
      </section>

      <div className="bg-secondary">
        <div className="max-w-6xl mx-auto py-8 px-6 bg-secondary">
          <div className="relative w-full sm:h-auto rounded-2xl shadow-xl overflow-hidden">
            <Image
              alt="open-ai"
              width={1000}
              height={1000}
              src={LAYOUT_IMAGE}
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
              <Link
                href="/app"
                className="bg-primary w-20 h-20 rounded-full flex items-center justify-center text-white relative z-10 cursor-pointer"
              >
                <IconPlayerPlayFilled className="w-10 h-10" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Contents />

      <Footer />
    </main>
  )
}

export default HomeContainer
