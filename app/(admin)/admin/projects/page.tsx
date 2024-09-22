"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ProjectSchema {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  coverImage: string;
}
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrashIcon } from "@radix-ui/react-icons";
import { Trash, Trash2 } from "lucide-react";
import { redirect } from "next/navigation";
import { DialogClose } from "@radix-ui/react-dialog";
import { set } from "react-hook-form";
import Loader from "@/components/Admin/Loader";
import { SkeletonLoader } from "@/components/Admin/SkeletonLoader";
import { Messagebox } from "@/components/Admin/Messagebox";

export default function ProjectList() {
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  const [dialog, setDialog] = useState(false);

  const deleteProject = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://deepak-bhalerao.vercel.app/api/projects?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      const updatedProjects = projectData.filter((project) => project.id !== id);
      setProjectData(updatedProjects);
      setDialog(true);
    } catch (error) {
      
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <div className="relative w-full h-full min-h-screen">

      <Messagebox
        success="Success"
        message="Project has been deleted"
        buttonText="Close"
        open={dialog}
        onOpenChange={setDialog}
      />  
      {/* <h1>Projects</h1> */}
      <ul className="w-full h-full flex flex-col gap-4  ">
        {isLoading && <SkeletonLoader />}
        {projectData && projectData.map((project) => (
          <li key={project.id} className="w-full h-full flex justify-between items-center">
            <Link
              href={`/admin/projects/${project.id}`}
              
              className="w-full h-full hover:cursor-pointer hover:bg-slate-200 px-4 py-2 rounded-lg flex flex-col"
            >
              <h2 className="text-green-400 text-2xl font-bold">
                {project.title}
              </h2>
              <p className="text-sm">
                {project.description.substring(0,100 ) + "..."}
              </p>

              <hr className="mt-2 w-full h-0.5 bg-slate-200" />
            </Link>
            <div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="hover:text-green-600 hover:border-green-600  py-2 flex items-center justify-center"><Trash2 className="text-xs"/></Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogDescription>
                      {project.title}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <DialogFooter>
                    {/* <DialogClose><Button variant="outline" >Cancel</Button></DialogClose> */}
                    <Button type="submit" onClick={()=>deleteProject(project.id)}>Confirm Deletion</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
