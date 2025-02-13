"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
const Page = () => {
   
  const params = useParams();
  const typo = params.id;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const url = "https://image.tmdb.org/t/p/original";
  const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
  const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

  const router = useRouter();

  const getDATA = async () => {
    setLoading(true); 
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/${typo}?language=en-US&page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      setData(response.data.results)
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    getDATA(); 
  }, [currentPage]);
  const handleMovieClick = (id: number) => {
    router.push(`/detail/${id}`);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1); 
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1)); 
  };

  return (
    <div className="w-full h-fit flex flex-col px-[20px] gap-[20px] py-[30px]">
      <div className="w-full flex justify-center">
        <div className="w-full flex flex-row flex-wrap gap-[20px]">
      
          {loading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} className="w-[157px] h-[309px] rounded-[8px]" />
            ))
          ) : (
           
            data.length > 0 ? (
              data.map((movie: any) => (
                <Card
                  key={movie.id}
                  className="w-[157px] cursor-pointer"
                  onClick={() => handleMovieClick(movie.id)}
                >
                  <div className="w-[157px] h-[233px] relative">
                    <Image
                      src={`${url}${movie.poster_path}`}
                      alt={movie.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-[8px]"
                    />
                  </div>
                  <p>{movie.title}</p>
                </Card>
              ))
            ) : (
              <p>No movie details available.</p>
            )
          )}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="w-full flex justify-center mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={handlePrevPage} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>{currentPage}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={handleNextPage} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Page;
