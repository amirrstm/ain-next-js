import { useTheme } from 'next-themes'

import BeforeAfter from './BeforeAfter'
import Faq from './Faq'
import Features from './Features'
import Resume from './Resume'

const Contents: React.FC = () => {
  const { resolvedTheme } = useTheme()

  return (
    <section className="relative py-10 md:py-0">
      <div
        className="-bottom-10 -z-10 absolute right-0 left-0 h-full rotate-180 bg-background bg-contain bg-top bg-no-repeat"
        style={{
          backgroundImage:
            resolvedTheme === 'light'
              ? 'url("/images/bg-content.svg")'
              : 'linear-gradient(rgba(15,15,15,0.7), rgba(15,15,15,0.7)),url("/images/bg-content.svg")'
        }}
      />

      <div
        className="-z-[2] absolute top-0 right-0 left-0 h-1/2 bg-background bg-contain bg-top bg-no-repeat"
        style={{
          backgroundImage:
            resolvedTheme === 'light'
              ? 'url("/images/bg-content.svg")'
              : 'linear-gradient(rgba(15,15,15,0.7), rgba(15,15,15,0.7)),url("/images/bg-content.svg")'
        }}
      />

      <div className="-top-0 -z-[1] absolute h-64 w-full bg-gradient-to-b from-background to-transparent dark:h-32 dark:from-background" />

      <Resume />

      <BeforeAfter />

      <Features />

      <Faq />
    </section>
  )
}

export default Contents
