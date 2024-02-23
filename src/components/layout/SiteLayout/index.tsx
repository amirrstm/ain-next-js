'use client'

import Footer from '../footer'
import Header from '../header'

type Props = { children: React.ReactNode; lng: string }
const SiteLayout: React.FC<Props> = ({ children, lng }) => {
  return (
    <main>
      <Header lng={lng} />

      <div>{children}</div>

      <Footer lng={lng} />
    </main>
  )
}

export default SiteLayout
