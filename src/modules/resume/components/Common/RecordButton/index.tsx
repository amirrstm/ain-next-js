import { IconLoader } from '@tabler/icons-react'
import { IconMicrophone, IconPlayerStopFilled } from '@tabler/icons-react'
import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'

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
  const [seconds, setSeconds] = useState(30)
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
  }, [isRecording, startTimeRef, circumference])

  return (
    <div
      onClick={onClick}
      className={clsx(
        'w-10 h-10 relative border border-muted bg-muted rounded-full flex items-center justify-center cursor-pointer',
        className,
        { 'border-primary pulse-animation': isRecording, 'pointer-events-none': loading },
      )}
    >
      {isRecording && (
        <div className="absolute start-[-7px] top-[-2px] w-[72px] h-[72px]">
          <svg className="rotate-270 w-full h-full">
            <circle
              className="text-primary"
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="35"
              cy="35"
            />
          </svg>
        </div>
      )}
      {loading ? (
        <IconLoader className="h-5 w-5 animate-spin" />
      ) : isRecording ? (
        <IconPlayerStopFilled />
      ) : (
        <IconMicrophone />
      )}
    </div>
  )
}

export default RecordButton
