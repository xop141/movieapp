"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

const Page = () => {
  const { id } = useParams(); 
  const [trailerKey, setTrailerKey] = useState<string | null>(null); // Initialize as null
  const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
  const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
  const router = useRouter();

  const fetchTrailer = async () => {
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}/videos?language=en-US`, {
        headers: {
          Authorization: `Bearer ${TMDB_API_TOKEN}`,
        },
      });
      const trailer = response.data.results.find((video: any) => video.site === "YouTube");
      setTrailerKey(trailer ? trailer.key : null);
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  useEffect(() => {
    if (id) fetchTrailer();
  }, [id]);

  const backToPage = () => {
    router.push(`/detail/${id}`);
  };

  return (
    <div className="bg-green-300 w-full h-full" onClick={backToPage}>
      {trailerKey ? (
        <iframe
          width="375"
          height="210"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Movie Trailer"
          className="rounded-md"
        ></iframe>
      ) : (
        <p className="text-white">Loading trailer...</p>
      )}
    </div>
  );
};

export default Page;
