'use client'

import { useParams } from 'next/navigation'

import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'

import { EN_LAYOUT_IMAGE, LAYOUT_IMAGE } from '@/constants'

import Contents from '../../components/Contents'
import { MainScreen } from '../../components/Main'

const HomeContainer: React.FC = () => {
  const { locale } = useParams()

  return (
    <main>
      <Header />

      <MainScreen src={locale === 'fa' ? LAYOUT_IMAGE : EN_LAYOUT_IMAGE} />

      <Contents />

      <Footer />
    </main>
  )
}

export default HomeContainer
