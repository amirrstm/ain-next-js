import { Skeleton } from '@/components/ui/skeleton'

import type React from 'react'

const ResumeSkelton: React.FC = () => {
  return (
    <div className="grid grid-cols-12 gap-4">
      {Array.from({ length: 4 }, (_, i) => i).map((idx) => (
        <div className="col-span-12 rounded-md border border-muted p-4 xl:col-span-6" key={idx}>
          <div className="flex gap-4">
            <Skeleton className="h-[250px] w-2/6" />

            <div className="flex-1 space-y-3">
              <Skeleton className="h-5 flex-1" />
              <Skeleton className="h-5 flex-1" />

              <div className="flex-1 space-y-6 pt-8">
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
