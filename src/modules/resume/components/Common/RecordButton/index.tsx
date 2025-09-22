import { IconLoader, IconMicrophone, IconPlayerStopFilled } from '@tabler/icons-react'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'

import type React from 'react'

interface Props {
  isRecording: boolean
  onClick: () => void
  loading?: boolean
  className?: string
}

const RecordButton: React.FC<Props> = ({ isRecording, loading, className, onClick }) => {
  const radius = 32
  const circumference = 2 * Math.PI * radius

  const startTimeRef = useRef(Date.now())
  const [_seconds, setSeconds] = useState(30)
  const [strokeDashoffset, setStrokeDashoffset] = useState(circumference)

  useEffect(() => {
    if (isRecording) {
      const countdown = setInterval(() => {
        const elapsedTime = Date.now() - startTimeRef.current
        const remainingTime = 30 - elapsedTime / 1000
        setSeconds(Math.max(remainingTime, 0))
        setStrokeDashoffset(circumference - (remainingTime / 30) * circumference)
      }, 16)

      return () => clearInterval(countdown)
    } else {
      setSeconds(30)
      setStrokeDashoffset(circumference)
      startTimeRef.current = Date.now()
    }
  }, [isRecording, circumference])

  return (
    <div
      className={clsx(
        'relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-muted bg-muted',
        className,
        { 'pointer-events-none': loading, 'pulse-animation border-primary': isRecording }
      )}
      onClick={onClick}
    >
      {isRecording && (
        <div className="absolute start-[-7px] top-[-2px] h-[72px] w-[72px]">
          <svg className="h-full w-full rotate-270">
            <circle
              className="text-primary"
              cx="35"
              cy="35"
              fill="transparent"
              r={radius}
              stroke="currentColor"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              strokeWidth="4"
            />
          </svg>
        </div>
      )}
      {loading ? <IconLoader className="h-5 w-5 animate-spin" /> : isRecording ? <IconPlayerStopFilled /> : <IconMicrophone />}
    </div>
  )
}

export default RecordButton
