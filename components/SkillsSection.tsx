"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { SkeletonLoader } from "./Admin/SkeletonLoader";

interface SkilsSchema {
    id: number;
    title: string;
    coverImage: string;
  }
  


export const SkillsSection = () => {
    const [skillsData, setSkillsData] = useState<SkilsSchema[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
  
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await fetch("https://deepak-bhalerao.vercel.app/api/skills", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
  
          if (!response.ok) {
            throw new Error("Failed to fetch project data");
          }
  
          const data = await response.json();
          
          setSkillsData(data);
        } catch (error) {
          // setError(error.message);
        }
        finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    if (error) {
      return <div>Error: {error}</div>;
    }

    
  return (
    <div id="skills" className="py-8 md:py-16 flex flex-col gap-8 md:gap-16  items-center justify-center   ">
        <div className="text-xl px-4 py-2 bg-gray-300 rounded-md w-fit mx-auto">My Skills</div>
        {isLoading && <SkeletonLoader  />}
        <div className="px-auto w-full grid space-y-6 grid-cols-3 md:grid-cols-5 lg:grid-cols-8  items-center ">
            {skillsData.map(skill => (
                <div key={skill.title} className="flex flex-col items-center">
                    <Image
                         src={skill.coverImage}
                         width={100}
                         height={100} 
                         alt={skill.title}
                         className="w-16 h-16 rounded-lg"
                     />
                    <p>{skill.title}</p>
                </div>
            ))}
            
        </div>
    </div>
  )
}
