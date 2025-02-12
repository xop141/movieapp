
"use client"
import { useEffect } from "react";
import NowPlaying from "./component/nowplaying";
import Movies from "@/app/component/movies"
export default function Home() {
  return (
    <div>
      <NowPlaying/>
      <Movies/>
    </div>
  );
}
