import { useTheme } from 'next-themes'

import BeforeAfter from './BeforeAfter'
import Faq from './Faq'
import Features from './Features'
import Resume from './Resume'

const Contents: React.FC = () => {
  const { resolvedTheme } = useTheme()

  return (
    <section className="relative py-10 md:py-12">
      <div
        className="absolute -bottom-10 left-0 right-0 h-full bg-background bg-no-repeat bg-contain bg-top -z-10 rotate-180"
        style={{
          backgroundImage:
            resolvedTheme === 'light'
              ? 'url("/images/bg-content.svg")'
              : 'linear-gradient(rgba(15,15,15,0.7), rgba(15,15,15,0.7)),url("/images/bg-content.svg")',
        }}
      />

      <div
        className="absolute -top-10 left-0 right-0 h-1/2 bg-background bg-no-repeat bg-contain bg-top -z-[2]"
        style={{
          backgroundImage:
            resolvedTheme === 'light'
              ? 'url("/images/bg-content.svg")'
              : 'linear-gradient(rgba(15,15,15,0.7), rgba(15,15,15,0.7)),url("/images/bg-content.svg")',
        }}
      />

      <div className="absolute -top-5 w-full h-32 bg-gradient-to-b from-secondary to-transparent -z-[1]" />

      <Resume />

      <BeforeAfter />

      <Features />

      <Faq />
    </section>
  )
}

export default Contents
