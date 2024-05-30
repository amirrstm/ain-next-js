import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'

import clsx from 'clsx'

import Benefits from './Benefits'
import Faq from './Faq'
import Features from './Features'
import Resume from './Resume'

const Contents: React.FC = () => {
  const t = useTranslations('Layout.Home')
  const { resolvedTheme } = useTheme()

  return (
    <section className="relative pb-32">
      <div
        className="absolute -bottom-10 left-0 right-0 h-1/2 bg-background bg-no-repeat bg-contain bg-top -z-10 rotate-180"
        style={{
          backgroundImage:
            resolvedTheme === 'light'
              ? 'url("/images/bg-content.svg")'
              : 'linear-gradient(rgba(15,15,15,0.7), rgba(15,15,15,0.7)),url("/images/bg-content.svg")',
        }}
      />

      <div
        className="absolute -top-10 left-0 right-0 h-1/2 bg-background  bg-no-repeat bg-contain bg-top -z-[1]"
        style={{
          backgroundImage:
            resolvedTheme === 'light'
              ? 'url("/images/bg-content.svg")'
              : 'linear-gradient(rgba(15,15,15,0.7), rgba(15,15,15,0.7)),url("/images/bg-content.svg")',
        }}
      />

      <Resume />

      <Benefits />

      <Features />

      <Faq />
    </section>
  )
}

export default Contents
