'use client'

import React, { useState, useEffect } from 'react';
import { Search, Star } from "lucide-react";
import { Input } from '@/components/ui/input';

import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

const SearchButton = () => {

    
  
  const [searchVALUE, setSearchVALUE] = useState<string>('');
  const [popular, setPopular] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    setSearchVALUE(search);
  };

  const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
  const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

  console.log(TMDB_BASE_URL)

  const getDATA = async () => {
    setLoading(true);
    if (searchVALUE.trim() === '') {
      setPopular([]);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${TMDB_BASE_URL}/search/movie?query=${searchVALUE}&language=en-US&page=1`, {
        headers: {
          Authorization: `Bearer ${TMDB_API_TOKEN}`,
        },
      });
      setPopular(response.data.results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDATA();
  }, [searchVALUE]);

  const router = useRouter();
  const handleMovieClick = (id: number) => {
    router.push(`/detail/${id}`);
  };

  const seeMore = (id: string) => {
    setSearchVALUE('');
    router.push(`/allSearch/${id}`);
  };

  const clear = (event: MouseEvent) => {
    if (!event.target || !(event.target as HTMLElement).id) {
      setSearchVALUE('');
    }
  };

   document.addEventListener('click', clear);

  return (
    <div id="searchbar" className="flex flex-col items-center">
      {/* Search Bar */}
      <div className={`w-[100%] flex items-center rounded-[8px] border px-[12px]`}>
        <Search />
        <Input
          type="text"
          placeholder="Search"
          value={searchVALUE}
          onChange={handleValue}
        />
      </div>

      {/* Search Results or Skeleton */}
      <div className="w-fit h-fit absolute z-10 top-[70px]">
        {loading ? (
          <div className="mt-4 flex justify-center flex-col gap-[10px] bg-gray-900 p-[15px]">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex items-start gap-[10px] border-b-2 border-gray-700 pb-[10px]"
              >
                <Skeleton className="w-24 h-36 rounded-[8px]" />
                <div className="flex flex-col gap-[8px] w-full">
                  <Skeleton className="w-[150px] h-[20px]" />
                  <Skeleton className="w-[100px] h-[16px]" />
                  <Skeleton className="w-[80px] h-[16px]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          popular.length > 0 && (
            <div className="mt-4 flex justify-center flex-col">
              <ul className="bg-background border rounded-[8px] p-[10px]">
                {popular.slice(0, 3).map((movie) => (
                  <li
                    key={movie.id}
                    className="mb-2 flex text-white border-b-2 py-[10px] relative"
                    onClick={() => handleMovieClick(movie.id)}
           
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      alt={movie.title}
                      className="w-24 h-36 object-cover rounded-[8px]"
                    />
                    <div className="w-full flex flex-col items-start px-[10px] justify-between">
                      {movie.title}
                      <p className="flex gap-[5px] items-center">
                        <Star /> {movie.vote_average.toFixed(1)}/10
                      </p>
                      <p>{movie.release_date.slice(0, 4)}</p>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-[0.5]"></div>
                  </li>
                ))}
                <div
                  className="text-black font-[600] text-white"
                  onClick={() => seeMore(searchVALUE)}
                >
                  See all results for "{searchVALUE}"
                </div>
              </ul>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SearchButton;