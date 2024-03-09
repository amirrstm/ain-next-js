import { useTranslations } from 'next-intl'

import clsx from 'clsx'

import Benefits from './Benefits'
import Faq from './Faq'
import Features from './Features'

const Contents: React.FC = () => {
  const t = useTranslations('Layout.Home')

  return (
    <section className="relative pb-32">
      <div
        className={clsx(
          'absolute -bottom-10 left-0 right-0 h-1/2 bg-white bg-no-repeat bg-contain bg-top -z-10 rotate-180',
          'bg-[url("https://res.cloudinary.com/dwwcd5u9v/image/upload/v1708678667/images/banner.svg")]',
        )}
      />

      <div
        className={clsx(
          'absolute -top-10 left-0 right-0 h-1/2 bg-white bg-no-repeat bg-contain bg-top -z-[1]',
          'bg-[url("https://res.cloudinary.com/dwwcd5u9v/image/upload/v1708678667/images/banner.svg")]',
        )}
      />

      <Benefits />

      <Features />

      <Faq />
    </section>
  )
}

export default Contents
