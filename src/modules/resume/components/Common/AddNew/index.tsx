import { IconPlus } from '@tabler/icons-react'

import type React from 'react'

const AddNew: React.FC<{ title: string; onClick: () => void }> = ({ title, onClick }) => {
  return (
    <div
      className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary py-2 transition-all duration-200 ease-in-out hover:bg-primary/80"
      onClick={onClick}
    >
      <IconPlus className="h-5 w-5" />

      <span className="text-sm">{title}</span>
    </div>
  )
}

export default AddNew
