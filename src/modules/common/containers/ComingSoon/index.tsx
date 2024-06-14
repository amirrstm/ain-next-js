import React from 'react'

import { IconLogoSmall } from '@/icons/logos'
import { Boxes } from '@/modules/home/components/Main/Boxes'

const ComingSoonPage: React.FC = () => {
  return (
    <div dir="ltr" className="flex w-screen h-screen items-center justify-center relative overflow-hidden">
      <Boxes className="z-[1]" />

      <div className="flex flex-col gap-6 items-center justify-center relative z-[2] text-center">
        <div className="w-20 h-20">
          <IconLogoSmall />
        </div>

        <h1 className="text-5xl">We'll be back soon!</h1>
      </div>
    </div>
  )
}

export default ComingSoonPage
