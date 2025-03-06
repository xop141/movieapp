import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Card from "@/app/component/moviecard";
import Homeskeleton from "./homeskeleton";

// Define Movie Type
interface Movie {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
}

// Component
const Popular = () => {
  const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
  const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
  
  const [pages, setPages] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  
  const getDATA = useCallback(async () => {
    const categories = ["popular", "upcoming", "top_rated"];
    setLoading(true);
    
    try {
      const responses = await Promise.all(
        categories.map(async (category) => {
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

      setPages(responses.flat()); // Flatten nested arrays
      console.log(responses.flat());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [TMDB_BASE_URL, TMDB_API_TOKEN]); // Add dependencies

  useEffect(() => {
    getDATA();
  }, [getDATA]);

  return (
    <div>
      {loading ? (
        <Homeskeleton />
      ) : (
        <div>
          <Card pages={pages.slice(0, 10)} title="Popular" />
          <Card pages={pages.slice(20, 30)} title="Upcoming" />
          <Card pages={pages.slice(40, 50)} title="Top Rated" />
        </div>
      )}
    </div>
  );
};

export default Popular;
