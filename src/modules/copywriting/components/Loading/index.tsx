import { Skeleton } from '@/components/ui/skeleton'

import type React from 'react'

const CategoryLoading: React.FC = () => {
  return (
    <div className="p-4 xl:p-6">
      <div className="grid grid-cols-12 gap-4 lg:gap-5 xl:gap-6">
        <div className="col-span-6 hidden md:block lg:col-span-5 xl:col-span-3 2xl:col-span-3">
          <div className="sticky top-8 block rounded-xl border border-muted bg-background shadow-md">
            <div className="border-b border-b-muted p-4">
              <Skeleton className="h-8 w-full" />
            </div>

            <div className="space-y-4 p-4">
              {Array.from({ length: 6 }, (_, i) => i).map((idx) => (
                <div className="flex items-center gap-4" key={idx}>
                  <Skeleton className="h-10 w-10" />
                  <Skeleton className="h-5 flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-12 h-full md:col-span-6 lg:col-span-7 xl:col-span-9 2xl:col-span-9">
          <div className="h-full rounded-xl border border-muted bg-background shadow-md">
            <div className="border-b border-b-muted p-4">
              <Skeleton className="h-8 w-full" />
            </div>

            <div className="p-4">
              <div className="grid grid-cols-12 gap-4">
                {Array.from({ length: 15 }, (_, i) => i).map((idx) => (
                  <div className="col-span-12 rounded-md border border-muted p-4 xl:col-span-4" key={idx}>
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-10 w-10" />
                      <Skeleton className="h-5 flex-1" />
                    </div>

                    <div className="mt-2 space-y-2">
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
