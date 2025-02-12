import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
const skeleton = () => {
  return (

    <div className="p-[20px] flex flex-col gap-[16px]">
      <Skeleton className="sm:w-full h-[246px] " />

      <div className="flex justify-between w-full">
        <div className="gap-[4px] flex flex-col">
          <Skeleton className="w-[101px] h-[18px] rounded-[8px]" />
          <Skeleton className="w-[101px] h-[30px] rounded-[8px]" />
        </div>
        <Skeleton className="w-[101px] h-[30px]" />
      </div>

      <div className="flex flex-col gap-[4px]">
        <Skeleton className="w-full h-[20px] rounded-[8px]" />
        <Skeleton className="w-full h-[20px] rounded-[8px]" />
        <Skeleton className="w-[80%] h-[20px] rounded-[8px]" />
        <Skeleton className="w-[60%] h-[20px] rounded-[8px]" />
      </div>

      <div className="flex w-full h-full flex-row flex-wrap gap-[20px] ">
        {Array.from({ length: 30 }).map((_, index) => (
          <Skeleton
            key={index}
            className="w-[157px] h-[309px] rounded-[8px]"
          />
        ))}
      </div>
    </div>

  )
}

export default skeleton
