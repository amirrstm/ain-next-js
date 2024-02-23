import clsx from 'clsx'
import React from 'react'

type Props = { children: React.ReactNode }
const LineDivider: React.FC<Props> = ({ children }) => {
  return (
    <div
      className={clsx(
        'py-6 flex w-full whitespace-nowrap text-center',
        'after:relative after:w-full after:border-t after:top-1/2 after:translate-y-1/2',
        'before:relative before:w-full before:border-t before:top-1/2 before:translate-y-1/2',
      )}
    >
      <span className="inline-block px-4">{children}</span>
    </div>
  )
}

export default LineDivider
