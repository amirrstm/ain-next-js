import clsx from 'clsx'
import React from 'react'

const Benefits: React.FC = () => {
  return (
    <section className="min-h-screen relative">
      <div
        className={clsx(
          'absolute top-0 left-0 right-0 h-1/2 bg-white bg-no-repeat bg-contain bg-top -z-10',
          'bg-[url("https://res.cloudinary.com/dwwcd5u9v/image/upload/v1708678667/images/banner.svg")]',
        )}
      />
      Hello
    </section>
  )
}

export default Benefits
