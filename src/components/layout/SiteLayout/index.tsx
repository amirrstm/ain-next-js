'use client'

import Footer from '../footer'

type Props = { children: React.ReactNode; lng: string }
const SiteLayout: React.FC<Props> = ({ children, lng }) => {
  return (
    <main>
      <div>{children}</div>

      <Footer lng={lng} />
    </main>
  )
}

export default SiteLayout
