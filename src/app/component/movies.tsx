import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import Card from "@/app/component/moviecard";
import Homeskeleton from "./homeskeleton";


const Popular = () => {
  const url = "https://image.tmdb.org/t/p/w500";
  const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
  const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
  const { setTheme, theme } = useTheme();
  const [pages, setPages] = useState<any>([]);
  const [loading, setLoading] = useState(true)

  const getDATA = async () => {
    const test = ["popular", "upcoming", "top_rated"];
    setLoading(true)


    try {
      const responses = await Promise.all(
        test.map(async (category) => {
          const response = await axios.get(
            `${TMDB_BASE_URL}/movie/${category}?language=en-US&page=1`,
            {
              headers: {
                Authorization: `Bearer ${TMDB_API_TOKEN}`,
              },
            }
          );
          return response.data.results;
        })
      );

      const allResults = [].concat(...responses);
      setPages(allResults);
      console.log(allResults);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getDATA();
  }, []);

  //   const router = useRouter();

  const handleMovieClick = (id: number) => {
    // router.push(`/detail/${id}`); 
  };

  return (
    <div>
      {loading ? (
        <Homeskeleton/>
      ) : (
        <div>
        <Card pages={pages.slice(0, 10)} handleMovieClick={handleMovieClick} title="Popular" />
         <Card pages={pages.slice(20,30)} handleMovieClick={handleMovieClick} title="Upcoming"/>
        <Card pages={pages.slice(40,50)} handleMovieClick={handleMovieClick} title="Top rated"/> 
        </div>
      )}
    </div>
  );
};

export default Popular;
