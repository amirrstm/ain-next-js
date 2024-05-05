import React from 'react'

import { Skeleton } from '@/components/ui/skeleton'

const CategoryLoading: React.FC = () => {
  return (
    <div className="p-4 xl:p-6">
      <div className="grid grid-cols-12 gap-4 lg:gap-5 xl:gap-6">
        <div className="hidden md:block col-span-6 lg:col-span-5 xl:col-span-3 2xl:col-span-3">
          <div className="border border-muted rounded-xl bg-background shadow-md block sticky top-8">
            <div className="p-4 border-b border-b-muted">
              <Skeleton className="w-full h-8" />
            </div>

            <div className="p-4 space-y-4">
              {Array.from({ length: 6 }, (_, i) => i).map(idx => (
                <div key={idx} className="flex gap-4 items-center">
                  <Skeleton className="h-10 w-10" />
                  <Skeleton className="h-5 flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-7 xl:col-span-9 2xl:col-span-9 h-full">
          <div className="border border-muted rounded-xl bg-background shadow-md h-full">
            <div className="p-4 border-b border-b-muted">
              <Skeleton className="w-full h-8" />
            </div>

            <div className="p-4">
              <div className="grid grid-cols-12 gap-4">
                {Array.from({ length: 15 }, (_, i) => i).map(idx => (
                  <div key={idx} className="col-span-12 xl:col-span-4 border border-muted p-4 rounded-md">
                    <div className="flex gap-4 items-center">
                      <Skeleton className="h-10 w-10" />
                      <Skeleton className="h-5 flex-1" />
                    </div>

                    <div className="space-y-2 mt-2">
                      <Skeleton className="h-5 flex-1" />
                      <Skeleton className="h-5 flex-1" />
                    </div>
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

export default CategoryLoading
