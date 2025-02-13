import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const detailskeleton = () => {
    return (
        <div className="px-[20px]">
            <div className="w-full h-fit flex items-center justify-between py-[32px]">
                <div className="gap-[4px] flex flex-col">
                    <Skeleton className="w-[211px] h-[40px] sm:w-[181px] sm:h-[18px] rounded-full " />
                    <Skeleton className="sm:w-[144px] sm:h-[30px] lg:w-[210px] lg:h-[40px] rounded-full" />

                </div>
                <Skeleton className="w-[83px] h-[20px] rounded-full " />
            </div>
            <div className='w-full flex flex-row justify-between h-fit'>
                <Skeleton className="w-full sm:h-[211px] md:w-[60%] md:h-[428px]  " />
                <Skeleton className='lg:w-[35%] md:w-[30%] h-[428px] sm:hidden lg:flex md:flex' />
            </div>

            <div className="w-full h-fit flex flex-row justify-between py-[32px]  ">
                <Skeleton className="w-[100px] h-[148px] lg:hidden md:hidden" />
                <div className="flex gap-[12px] w-full justify-between">
               
                    <div className="flex flex-col gap-[15px] w-min   ">
                   
                        <div className="flex flex-row flex-wrap gap-[12px] ">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    className="w-[60px] h-[20px] rounded-md "
                                />
                            ))}
                        </div>
                        <div className="flex flex-col gap-[4px]">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    className="w-[201px] h-[20px] rounded-md "
                                />
                            ))}
                        </div>
                       
                    </div>
                    <Skeleton className='w-[60%] h-full hidden lg:flex ' />
                </div>
            </div>
            <div className="hidden lg:flex md:flex h-fit flex-row flex-wrap gap-[32px]">
                {Array.from({ length: 10 }).map((_, index) => (
                    <Skeleton
                        key={index}
                        className="w-[157px] h-[309px] rounded-md "
                    />
                ))}
            </div>
            <div className='flex flex-row justify-between md:hidden lg:hidden'>
                <Skeleton className="w-[157px] h-[309px] rounded-md " />
                <Skeleton className="w-[157px] h-[309px] rounded-md " />
            </div>

        </div>

    )
}

export default detailskeleton
