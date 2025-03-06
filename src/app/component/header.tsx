"use client";
import React, { useState } from "react";
import { Film, Moon, Sun, Search, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

import SearchButton from "./search";

import Allgenre from "@/app/component/allgenre"


const Header = () => {
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const [isBar, setIsBar] = useState(false)


  const JumpHOME = () => {
    router.push(`/`);
  };
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const toggleBar = () => {
    if (isBar === true) {
      setIsBar(false)
    } else {
      setIsBar(true)
    }
  
    
  };
  const [isShow, setIsShow] = useState(true)
  const showgenre=()=>{
    if (isShow === true) {
      setIsShow(false)
    } else {
      setIsShow(true)
    }
    setIsShow(true)
  }


  return (
   <div className="relative bg-gray-900">
    <div className="w-full h-fit flex justify-between p-[20px] items-center">
      <div className={`absolute w-full top-0 left-0  bg-black h-full flex justify-between items-center ${isBar ? "flex" : "hidden"} `}>
      
        
      <div className={`${isShow ? "flex" : "hidden"}`} onClick={showgenre}>
      <Allgenre/>
      </div>
       
        <div className="w-[50%]">
        <SearchButton />
       
        </div>
        <div onClick={toggleBar}>
        <X />
        </div>
       

      </div>
      <div className="flex gap-[8px] text-[16px] font-[700] cursor-pointer" onClick={JumpHOME}><Film /> Movie z</div>
      <div className={'hidden lg:flex border'}>
        <SearchButton />
      </div>


      <div className="flex gap-[12px] ">


        <div
          className={`w-fit p-3 border ${theme === "dark" ? "border-white" : "border-black"} shadow-sm rounded-md cursor-pointer lg:hidden`}
          onClick={toggleBar}
        >
          <Search />
        </div>

        <div
          className={`w-fit p-3 border border-gray-300 shadow-sm rounded-md cursor-pointer ${theme === "dark" ? "border-white" : "border-black"}`}
          onClick={toggleTheme}
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </div>
      </div>



    </div>
    </div>

  );
};

export default Header;
{/* <div className="w-fit p-3 border border-gray-300 shadow-sm rounded-md cursor-pointer flex items-center" > */ }
{/* <div className="flex items-center"> */ }
{/* <Search onClick={toggleBar} /> */ }
{/* <div className={`absolute ${isBar ? "absolute" : "hidden"} top-0 left-0 w-full h-full flex justify-between bg-gray-900 items-center`}> */ }
{/* <div className="w-fit p-3 border border-gray-300 shadow-sm rounded-md cursor-pointer h-fit flex " >
      <ChevronDown />
    </div> */}
{/* <div className="flex items-center gap-[10px] p-[12px]">
      <Search />
      <Input placeholder="Search..."/>
    </div> */}
{/* <X onClick={toggleBar} /> */ }
{/* 
  </div> */}


{/* </div> */ }

{/* </div> */ }
