import { IconLoader } from '@tabler/icons-react'
import { IconMicrophone, IconPlayerStopFilled } from '@tabler/icons-react'
import clsx from 'clsx'
import React from 'react'

interface Props {
  isRecording: boolean
  onClick: () => void
  loading?: boolean
}

const RecordButton: React.FC<Props> = ({ isRecording, loading, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'w-10 h-10 border border-muted bg-muted rounded-full flex items-center justify-center cursor-pointer',
        { 'border-primary pulse-animation': isRecording, 'pointer-events-none': loading },
      )}
    >
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
