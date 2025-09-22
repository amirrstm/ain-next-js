import { IconBooks } from '@tabler/icons-react'

import { SUB_CATEGORY_ICONS } from '@/modules/copywriting/utils'

import type React from 'react'
import type { AppCategory } from '@/interface/Category.model'

const ContentHeader: React.FC<{ category: AppCategory }> = ({ category }) => {
  return (
    <div className="flex items-center justify-between border-b border-b-muted p-4">
      <div className="flex gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary text-white">
          {SUB_CATEGORY_ICONS[category.slug] || <IconBooks className="h-6 w-6" />}
        </div>
        <div className="flex-1">
          <h2 className="font-bold text-lg">{category.name}</h2>
          <p className="mt-2 hidden text-gray-600 text-xs md:block">{category.description}</p>
        </div>
      </div>
    </div>
  )
}

export default ContentHeader
