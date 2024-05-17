import React from 'react'

import { Skeleton } from '@/components/ui/skeleton'

const ResumeSkelton: React.FC = () => {
  return (
    <div className="grid grid-cols-12 gap-4">
      {Array.from({ length: 4 }, (_, i) => i).map(idx => (
        <div key={idx} className="col-span-12 xl:col-span-6 border border-muted p-4 rounded-md">
          <div className="flex gap-4 ">
            <Skeleton className="h-[250px] w-2/6" />

            <div className="space-y-3 flex-1">
              <Skeleton className="h-5 flex-1" />
              <Skeleton className="h-5 flex-1" />

              <div className="space-y-6 flex-1 pt-8">
                <Skeleton className="h-5 flex-1" />
                <Skeleton className="h-5 flex-1" />
                <Skeleton className="h-5 flex-1" />
                <Skeleton className="h-5 flex-1" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ResumeSkelton
