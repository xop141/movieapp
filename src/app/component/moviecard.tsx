import React, { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { useRouter } from "next/navigation";



const moviecard = ({ pages, title }) => {
  const router = useRouter()
  const url = "https://image.tmdb.org/t/p/original";
  const handleMovieClick = (id:number)=>{
    
    router.push(`/detail/${id}`);
  }
  return (
    
    <div className="flex w-full h-fit px-[20px] flex-row flex-wrap gap-[20px] lg:px-[80px] lg:gap-[32px] py-[20px]">
      <div className="w-full h-fit flex justify-between items-center">
        <p className="text-[24px]">{title}</p>
        <Button>See more
        <ArrowRight />

        </Button>

      </div>
      {pages.map((movie: any) => (
       <Card
       key={movie.id}
       className="w-[157.5px] h-fit cursor-pointer lg:w-[230px] "
       onClick={() => handleMovieClick(movie.id)}
     >
      <div className="w-full h-[233px] relative lg:w-[230px] lg:h-[440px]">
       <Image
         src={`${url}${movie.poster_path}`}
         alt={movie.title}
         layout="fill"
         className="object-cover rounded-[8px] w-full h-full"
       />
       <div className="w-full h-full bg-black absolute opacity-0 hover:opacity-[0.7] rounded-[8px]"></div>
       </div>
       <div className="p-[8px]">
       <div className="flex gap-[4px]">
       <Star /> {movie.vote_average}/10
       </div>
       <h2 className="text-sm font-medium mt-1 h-[40px] ">{movie.title}</h2>
       </div>
     </Card>
     
      ))}
    </div>
  );
};

export default moviecard;
