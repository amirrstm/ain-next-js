import { IconBooks } from '@tabler/icons-react'
import React from 'react'

import { AppCategory } from '@/interface/Category.model'

import { SUB_CATEGORY_ICONS } from '@/modules/copywriting/utils'

const ContentHeader: React.FC<{ category: AppCategory }> = ({ category }) => {
  return (
    <div className="p-4 flex items-center justify-between border-b">
      <div className="flex gap-2">
        <div className="bg-secondary w-8 h-8 rounded-md text-white flex justify-center items-center">
          {SUB_CATEGORY_ICONS[category.slug] || <IconBooks className="w-6 h-6" />}
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold">{category.name}</h2>
          <p className="hidden md:block text-xs text-gray-600 mt-2">{category.description}</p>
        </div>
      </div>
    </div>
  )
}

export default ContentHeader
