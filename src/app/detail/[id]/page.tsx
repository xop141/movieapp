"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Star, Play } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Detailskeleton from "@/app/component/detailskeleton";
import MoreLike from "@/app/component/morelike";
import { useRouter } from "next/navigation";
import Trailer from "@/app/component/trailer";

const Page = () => {
  const params = useParams();
  const movieId = params.id;
  const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
  const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
  const url = "https://image.tmdb.org/t/p/";
  const [movie, setMovie] = useState<any>(null);
  const [crew, setCrew] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showTrailer, setShowTrailer] = useState<boolean>(false); // State to toggle trailer
  const router = useRouter();
  const jump = (genre: number) => {
    router.push(`/genre/${genre}`);
  };
  const handleclick = (event: MouseEvent) => {
   console.log(event);
   
    
  };
document.addEventListener("mousedown", handleclick);


  useEffect(() => {
    const fetchData = async () => {
      if (!movieId) return;

      setLoading(true);
      try {
        const movieResponse = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}?language=en-US`, {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        });
        setMovie(movieResponse.data);

        const crewResponse = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}/credits?language=en-US`, {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        });
        setCrew(crewResponse.data.crew);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  return (
    <div>
      {loading ? (
        <Detailskeleton />
      ) : (
        <div className="px-[20px] lg:px-[180px] relative  ">
        <div className="absolute top-[100px] z-10 md:left-[40vw]  lg:left-[40vw] sm:left-0">
          {showTrailer && <Trailer id={movieId}/>}
       </div>
          {/* Movie Details */}
          <div className="flex justify-between mb-8">
            <div className="flex flex-col w-fit">
              <div className="text-[24px] font-[600]">{movie.original_title}</div>
              <div className="flex justify-between">
                {movie.release_date} | {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min
              </div>
            </div>
            <div className="flex gap-[4px] items-center">
              <Star />
              <div className="flex flex-col w-fit h-fit">
                {movie.vote_average}/10
                <p>{(movie.popularity / 100).toFixed(1)}K</p>
              </div>
            </div>
          </div>

          <div className="relative flex lg:justify-between">
            {/* Poster Section */}
            <div className="hidden lg:flex lg:w-[25%] h-[211px] md:h-[428px] lg:h-[428px] relative">
              <Image
                src={`${url}original${movie.poster_path}`}
                layout="fill"
                objectFit="cover"
                alt={movie.title}
                className="rounded-md"
              />
            </div>

            {/* Backdrop Section */}
            <div className="lg:relative lg:w-[70%] sm:w-full md:w-full h-[428px]">
              <Button
                className="absolute bottom-5 left-5 z-10 bg-black hover:text-black text-white px-5 py-3 rounded-md flex items-center gap-2"
                onClick={() => setShowTrailer(true)} // Toggle trailer view
              >
                <Play /> Play Trailer
              </Button>
              <Image
                src={`${url}original${movie.backdrop_path}`}
                alt={movie.title}
                layout="fill"
                objectFit="cover"
                className="rounded-[8px]"
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-[20px] py-[22px]">
            <div className="flex gap-[12px] flex-wrap">
              {movie.genres.map((genre: any) => (
                <Button
                  variant="secondary"
                  key={genre.id}
                  onClick={() => jump(genre.id)}
                  className={`text-black py-1 px-3 rounded-md `}
                >
                  {genre.name}
                </Button>
              ))}
            </div>
            <p className="text-gray-700">{movie.overview}</p>
            <div>
              <div className="">
                <p className="font-semibold">Director:</p>
                <div>{crew?.find((member: any) => member.job === "Director")?.name}</div>
              </div>
              <div className="flex">
                <p className="font-semibold">Writers:</p>
                <div className="flex gap-[10px]">
                  {crew
                    ?.filter((member: any) => member.department === "Writing" && member.known_for_department === "Writing")
                    .map((member: any) => (
                      <div key={member.id}>{member.name}</div>
                    ))}
                </div>
              </div>
              <div className="flex">
                <p className="font-semibold">Stars:</p>
                {crew
                  ?.filter((member: any) => member.popularity > 5 && member.known_for_department === "Acting")
                  .map((member: any) => (
                    <div key={member.id}>{member.name}</div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="px-[20px] lg:px-[180px]">
        <MoreLike />
      </div>
    </div>
  );
};

export default Page;
