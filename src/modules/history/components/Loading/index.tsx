import React from 'react'

import { Skeleton } from '@/components/ui/skeleton'

const HistoryLoading: React.FC = () => {
  return (
    <div className="col-span-4 bg-white h-full rounded-xl border shadow-md divide-y overflow-auto">
      {Array.from({ length: 4 }, (_, i) => i).map(idx => (
        <div key={idx} className="p-4">
          <div className="flex gap-4 items-center">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-5 flex-1" />
          </div>

          <div className="mt-4 space-y-4">
            <Skeleton className="h-5 flex-1" />
            <Skeleton className="h-5 flex-1" />
            <Skeleton className="h-5 flex-1" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default HistoryLoading
