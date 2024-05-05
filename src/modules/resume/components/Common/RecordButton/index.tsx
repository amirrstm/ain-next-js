import { IconMicrophone, IconPlayerStopFilled } from '@tabler/icons-react'
import clsx from 'clsx'
import React from 'react'

interface Props {
  isRecording: boolean
  onClick: () => void
}

const RecordButton: React.FC<Props> = ({ isRecording, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'w-10 h-10 border border-muted bg-muted rounded-full flex items-center justify-center cursor-pointer',
        { 'border-primary': isRecording },
      )}
    >
      {isRecording ? <IconPlayerStopFilled /> : <IconMicrophone />}
    </div>
  )
}

export default RecordButton
