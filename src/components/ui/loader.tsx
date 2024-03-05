import Image from 'next/image'

import React from 'react'

type Props = { width?: number; height?: number }
const Loader: React.FC<Props> = ({ width = 70, height = 70 }) => {
  return (
    <Image
      priority
      width={width}
      height={height}
      unoptimized
      alt="app-loader"
      src="/loader.svg"
      loader={() => '/loader.svg'}
    />
  )
}

export default Loader
