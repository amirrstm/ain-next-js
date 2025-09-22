import clsx from 'clsx'

import type React from 'react'

type Props = { children: React.ReactNode; direction?: 'left' | 'right' | 'center' }
const LineDivider: React.FC<Props> = ({ children, direction = 'center' }) => {
  return (
    <div
      className={clsx(
        'flex w-full whitespace-nowrap py-4 text-center',
        (direction === 'right' || direction === 'center') &&
          'after:relative after:top-1/2 after:w-full after:translate-y-1/2 after:border-t',
        (direction === 'left' || direction === 'center') &&
          'before:relative before:top-1/2 before:w-full before:translate-y-1/2 before:border-t'
      )}
    >
      <span className="inline-block px-4">{children}</span>
    </div>
  )
}

export default LineDivider
