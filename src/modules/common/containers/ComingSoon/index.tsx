import { IconLogoSmall } from '@/icons/logos'
import { Boxes } from '@/modules/home/components/Main/Boxes'

import type React from 'react'

const ComingSoonPage: React.FC = () => {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden" dir="ltr">
      <Boxes className="z-[1]" />

      <div className="relative z-[2] flex flex-col items-center justify-center gap-6 text-center">
        <div className="h-20 w-20">
          <IconLogoSmall />
        </div>

        <h1 className="text-5xl">We'll be back soon!</h1>
      </div>
    </div>
  )
}

export default ComingSoonPage
