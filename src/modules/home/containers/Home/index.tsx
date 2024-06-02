'use client'

import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'

import { LAYOUT_IMAGE } from '@/constants'

import Contents from '../../components/Contents'
import { MacBookScroll } from '../../components/Video'

const HomeContainer: React.FC = () => {
  return (
    <main>
      <Header />

      <div dir="ltr">
        <MacBookScroll src={LAYOUT_IMAGE} />
      </div>

      <Contents />

      <Footer />
    </main>
  )
}

export default HomeContainer
