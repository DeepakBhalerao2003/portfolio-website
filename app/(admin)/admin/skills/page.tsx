"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface SkilsSchema {
  id: number;
  title: string;
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

export default function SkillsList() {
  const [skillsData, setSkillsData] = useState<SkilsSchema[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3000/api/skills", {
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

  const [dialog, setDialog] = useState(false);

  const deleteSkills = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/skills?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      const updatedSkills = skillsData.filter((skill) => skill.id !== id);
      setSkillsData(updatedSkills);
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
        {skillsData.map((skill) => (
          <li key={skill.id} className="relative w-fit h-full flex justify-between items-center">
            <Link
              href={`/admin/skills/${skill.id}`}              
              className="w-fit h-full border-2 hover:cursor-pointer hover:bg-slate-200 px-4 py-2 rounded-lg flex flex-col"
            >
                <div className="w-40 h-40 rounded-full overflow-hidden">
                  <img src={skill.coverImage} alt="" className="w-full"/>
                </div>
                <h1 className="text-xl text-center">{skill.title}</h1>
            </Link>
            <div className="absolute top-2 right-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="hover:text-green-600 hover:border-green-600  py-2 flex items-center justify-center"><Trash2 className="text-xs"/></Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogDescription>
                      {skill.title}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <DialogFooter>
                    {/* <DialogClose><Button variant="outline" >Cancel</Button></DialogClose> */}
                    <Button type="submit" onClick={()=>deleteSkills(skill.id)}>Confirm Deletion</Button>
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
