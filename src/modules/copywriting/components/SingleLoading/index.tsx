import React from 'react'

import { Skeleton } from '@/components/ui/skeleton'

const SingleCategoryLoading: React.FC = () => {
  return (
    <div className="p-4 xl:p-6">
      <div className="grid grid-cols-12 gap-4 lg:gap-5 xl:gap-6">
        <div className="hidden md:block col-span-6 lg:col-span-4">
          <div className="border border-muted rounded-xl bg-background shadow-md block sticky top-8 h-full">
            <div className="p-4 border-b border-b-muted">
              <Skeleton className="w-full h-8" />
            </div>

            <div className="p-4 space-y-4">
              <div className="flex gap-3">
                <div className="flex-1">
                  <Skeleton className="w-full h-8" />
                </div>
                <div className="flex-1">
                  <Skeleton className="w-full h-8" />
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-1">
                  <Skeleton className="w-full h-20" />
                </div>
              </div>

              <div className="flex gap-3 pt-24">
                <div className="flex-1">
                  <Skeleton className="w-full h-8" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-8 h-full">
          <div className="border border-muted rounded-xl bg-background shadow-md h-full">
            <div className="p-4 border-b border-b-muted">
              <Skeleton className="w-full h-8" />
            </div>

            <div className="p-4">
              <div className="grid grid-cols-12 gap-4">
                {Array.from({ length: 8 }, (_, i) => i).map(idx => (
                  <div key={idx} className="col-span-12">
                    <Skeleton className="h-5 flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleCategoryLoading
