import { IconPlus } from '@tabler/icons-react'
import React from 'react'

const AddNew: React.FC<{ title: string; onClick: () => void }> = ({ title, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="border border-dashed border-muted flex flex-col justify-center items-center rounded-xl cursor-pointer"
    >
      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white -translate-y-1/2">
        <IconPlus className="w-4 h-4" />
      </div>
      <span className="text-sm mb-3 -mt-3">{title}</span>
    </div>
  )
}

export default AddNew
