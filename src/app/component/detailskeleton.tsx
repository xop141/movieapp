import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const detailskeleton = () => {
  return (
    <div className="px-[20px]">
    <div className="w-full h-fit flex items-center justify-between py-[32px]">
        <div className="gap-[4px] flex flex-col">
            <Skeleton className="sm:w-[144px] sm:h-[30px] lg:w-[210px] lg:h-[40px] rounded-full" />
            <Skeleton className="w-[181px] h-[18px] rounded-full" />
        </div>
        <Skeleton className="w-[83px] h-[20px] rounded-full" />
    </div>

    <Skeleton className="w-full h-[211px]" />
    <div className="w-full h-fit flex justify-between py-[32px]">
        <Skeleton className="w-[100px] h-[148px]" />
        <div className="flex gap-[12px] w-fit">
            <div className="flex flex-col gap-[15px] w-min">
                <div className="flex flex-row flex-wrap gap-[12px]">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            className="w-[60px] h-[20px] rounded-md"
                        />
                    ))}
                </div>
                <div className="flex flex-col gap-[4px]">
                    <Skeleton className="w-[201px] h-[20px]" />
                    <Skeleton className="w-[201px] h-[20px]" />
                    <Skeleton className="w-[201px] h-[20px]" />
                    <Skeleton className="w-[201px] h-[20px]" />
                </div>
            </div>
        </div>
    </div>
    <div className="flex justify-between">
        <Skeleton className="w-[157px] h-[309px]" />
        <Skeleton className="w-[157px] h-[309px]" />
    </div>
</div>
  )
}

export default detailskeleton
