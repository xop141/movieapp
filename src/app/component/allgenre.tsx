"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import axios from "axios";

// Define Genre Type
interface Genre {
  id: number;
  name: string;
}

const Genre = () => {
  const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
  const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

  const [popular, setPopular] = useState<Genre[]>([]); // Fix `any` issue

  const getDATA = useCallback(async () => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/genre/movie/list?language=en`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      setPopular(response.data.genres);
    } catch (err) {
      console.error("Error fetching genres:", err);
    }
  }, [TMDB_BASE_URL, TMDB_API_TOKEN]);

  useEffect(() => {
    getDATA();
  }, [getDATA]);

  const router = useRouter();

  const jump = (genre: number) => {
    router.push(`/genre/${genre}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-9 px-4 py-2 flex items-center gap-2 rounded-md">
        <ChevronDown />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[90%] max-w-sm md:max-w-lg min-h-[200px] md:min-h-[300px] h-auto p-4 rounded-md">
        <DropdownMenuLabel className="text-lg font-bold">Genres</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-sm">See lists of movies by genre</DropdownMenuLabel>
        <div className="flex flex-wrap gap-2">
          {popular.map((genre) => (
            <DropdownMenuItem
              key={genre.id}
              onClick={() => jump(genre.id)}
              className="p-2 rounded-md cursor-pointer"
            >
              <Badge className="bg-gray-600 text-white">{genre.name}</Badge>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Genre;
