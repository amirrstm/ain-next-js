import { Skeleton } from '@/components/ui/skeleton'

import type React from 'react'

const SingleCategoryLoading: React.FC = () => {
  return (
    <div className="p-4 xl:p-6">
      <div className="grid grid-cols-12 gap-4 lg:gap-5 xl:gap-6">
        <div className="col-span-6 hidden md:block lg:col-span-4">
          <div className="sticky top-8 block h-full rounded-xl border border-muted bg-background shadow-md">
            <div className="border-b border-b-muted p-4">
              <Skeleton className="h-8 w-full" />
            </div>

            <div className="space-y-4 p-4">
              <div className="flex gap-3">
                <div className="flex-1">
                  <Skeleton className="h-8 w-full" />
                </div>
                <div className="flex-1">
                  <Skeleton className="h-8 w-full" />
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-1">
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>

              <div className="flex gap-3 pt-24">
                <div className="flex-1">
                  <Skeleton className="h-8 w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 h-full md:col-span-6 lg:col-span-8">
          <div className="h-full rounded-xl border border-muted bg-background shadow-md">
            <div className="border-b border-b-muted p-4">
              <Skeleton className="h-8 w-full" />
            </div>

            <div className="p-4">
              <div className="grid grid-cols-12 gap-4">
                {Array.from({ length: 8 }, (_, i) => i).map((idx) => (
                  <div className="col-span-12" key={idx}>
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
