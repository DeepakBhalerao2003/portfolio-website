"use client"
import { useEffect, useState } from "react";
import { ProjectCard } from "./ProjectCard"
import { SkeletonLoader } from "./Admin/SkeletonLoader";



interface ProjectSchema {
    id: number;
    title: string;
    description: string;
    technologies?: string;
    startDate: string;
    endDate: string;
    github:string;
    visit:string;
    coverImage: string;
  }

export const ProjectSection = () => {

    const [projectData, setProjectData] = useState<ProjectSchema[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://deepak-bhalerao.vercel.app/api/projects", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch project data");
        }

        const data = await response.json();
        
        setProjectData(data);
      } catch (error) {
        // setError(error.message);
      }
      finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);



  return (
    <div id="projects" className="py-16 bg-[#F9FAFB] lg:px-32 space-y-6 ">
        
        <div className="text-xl px-4 py-2 bg-gray-300 rounded-md w-fit mx-auto">My Projects</div>

        {isLoading && <SkeletonLoader  />}
        {projectData.map((project, index) => (
            // <ProjectCard key={index} idx={index} title={project.title} description={project.description} technologies={project.technologies} github={project.github}  visit={project.visit} coverImage/>
            <ProjectCard key={index} idx={index} project={project}/>
        ))}
        
        
    </div>
  )
}
