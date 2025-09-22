import clsx from 'clsx'

import type React from 'react'

type Props = { size?: string; count?: number; onChange?: (e: number) => void; value?: number }
const Rating: React.FC<Props> = ({ size, count, value, onChange }) => {
  return (
    <div className="flex items-center space-x-1">
      <SingleStar fill={((count || value) as number) >= 1} onClick={onChange ? () => onChange(1) : undefined} size={size} />
      <SingleStar fill={((count || value) as number) >= 2} onClick={onChange ? () => onChange(2) : undefined} size={size} />
      <SingleStar fill={((count || value) as number) >= 3} onClick={onChange ? () => onChange(3) : undefined} size={size} />
      <SingleStar fill={((count || value) as number) >= 4} onClick={onChange ? () => onChange(4) : undefined} size={size} />
      <SingleStar fill={((count || value) as number) === 5} onClick={onChange ? () => onChange(5) : undefined} size={size} />
    </div>
  )
}

export default Rating

type SingleProps = { size?: string; fill?: boolean; onClick?: () => void }
const SingleStar: React.FC<SingleProps> = ({ size, fill, onClick }) => (
  <svg
    aria-hidden="true"
    className={clsx('text-gray-300 data-[fill=true]:text-yellow-300 dark:text-gray-500 dark:data-[fill=true]:text-yellow-300', {
      'cursor-pointer': !!onClick,
      'h-4 w-4': !size,
      'h-8 w-8': size === 'large'
    })}
    data-fill={fill}
    fill="currentColor"
    onClick={onClick}
    viewBox="0 0 22 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
  </svg>
)
