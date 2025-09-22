import { Skeleton } from '@/components/ui/skeleton'

import type React from 'react'

const HistoryLoading: React.FC = () => {
  return (
    <div className="col-span-4 h-full divide-y overflow-auto rounded-xl border bg-white shadow-md">
      {Array.from({ length: 4 }, (_, i) => i).map((idx) => (
        <div className="p-4" key={idx}>
          <div className="flex items-center gap-4">
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
