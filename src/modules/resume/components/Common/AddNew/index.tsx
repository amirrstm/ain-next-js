import { IconPlus } from '@tabler/icons-react'
import React from 'react'

const AddNew: React.FC<{ title: string; onClick: () => void }> = ({ title, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-primary py-2 gap-2 flex justify-center items-center rounded-xl cursor-pointer transition-all duration-200 ease-in-out hover:bg-primary/80"
    >
      <IconPlus className="w-5 h-5" />

      <span className="text-sm ">{title}</span>
    </div>
  )
}

export default AddNew
