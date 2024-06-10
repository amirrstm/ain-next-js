'use client'

import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'

import { LAYOUT_IMAGE } from '@/constants'

import Contents from '../../components/Contents'
import { MainScreen } from '../../components/Main'

const HomeContainer: React.FC = () => {
  return (
    <main>
      <Header />

      <MainScreen src={LAYOUT_IMAGE} />

      <Contents />

      <Footer />
    </main>
  )
}

export default HomeContainer
