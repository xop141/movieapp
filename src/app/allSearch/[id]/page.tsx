"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

const Page = () => {
    const [popular, setPopular] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const params = useParams();
    const searchVALUE = params.id;

    const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
    const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

    const getData = useCallback(async () => {
        try {
            const response = await axios.get(
                `${TMDB_BASE_URL}/search/movie?query=${searchVALUE}&language=en-US&page=1`,
                {
                    headers: {
                        Authorization: `Bearer ${TMDB_API_TOKEN}`,
                    },
                }
            );
            setPopular(response.data.results);
            setLoading(false);
        } catch (err: any) {
            setError(err.message || "An error occurred");
            setLoading(false);
        }
    }, [searchVALUE, TMDB_BASE_URL, TMDB_API_TOKEN]);

    useEffect(() => {
        if (searchVALUE) {
            getData();
        }
    }, [searchVALUE, getData]);

    const router = useRouter();

    const jump = (id: number) => {
        router.push(`/detail/${id}`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="w-full h-full px-[20px]">
            <h1>Movies found: {popular.length}</h1>
            <div className="flex flex-row gap-[20px] flex-wrap bg-black">
                {popular.length > 0 ? (
                    popular.map((movie: any) => (
                        <div
                            key={movie.id}
                            className="w-[157px] md:w-[200px] lg:w-[250px] h-fit bg-cardWhite rounded-[5px]"
                            onClick={() => jump(movie.id)}
                        >
                            <div>
                                <Image
                                    width={157.5}
                                    height={233}
                                    src={
                                        movie.poster_path
                                            ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                                            : "/path/to/fallback-image.jpg"
                                    }
                                    alt={movie.title}
                                    sizes="w-[157.5px] h-[233px]"
                                />
                            </div>
                            <p className="w-full h-fit px-[5px]">{movie.title}</p>
                        </div>
                    ))
                ) : (
                    <p>No movies found.</p>
                )}
            </div>
        </div>
    );
};

export default Page;
