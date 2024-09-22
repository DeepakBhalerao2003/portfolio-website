import Image from "next/image";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Link from "next/link";

interface ProjectSchema {
  id: number;
  title: string;
  description: string;
  technologies?: string;
  startDate: string;
  endDate: string;
  github: string;
  visit: string;
  coverImage: string;
}

export const ProjectCard = (props: { project: ProjectSchema; idx: number }) => {
  const { idx, project } = props;
  const {
    title,
    description,
    technologies,
    github,
    visit,
    startDate,
    endDate,
    coverImage,
  } = project;
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  useEffect(() => {
    setImagePreview(coverImage);
  }, [coverImage]);

  const classNames =
    idx % 2 === 0
      ? "flex flex-col-reverse md:flex-row-reverse w-full rounded-lg shadow-md bg-white"
      : "flex flex-col-reverse md:flex-row w-full rounded-lg shadow-md bg-white";

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: { year: "numeric"; month: "short" } = {
      year: "numeric",
      month: "short",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };
  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  const capitalizeEachWord = (str:string) => {
    return str.split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
};
  const technologiesArray = technologies?.split(",");
  return (
    <div className={classNames}>
      <div className="w-full md:w-[50%] p-4 md:p-6 lg:p-10 space-y-4">
        {/* title */}
        <div>
          <h2 className="text-xl">{title}</h2>
          <p className="text-[14px] font-sans">
            {formattedStartDate} - {formattedEndDate}
          </p>
        </div>
        <p className="font-light font-sans">{description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-4 text-[14px]">
          {technologiesArray &&
            technologiesArray.map((tech) => (
              <div key={tech} className="bg-[#E5E7EB] px-4 py-2 rounded-xl">
                {tech}
              </div>
            ))}
        </div>

        {/* buttons visit and github */}

        <div className="flex gap-8">
          {visit && (
            <Link href={visit} target="_blank">
              <Button
                className="text-green-600 hover:bg-green-600 hover:text-white font-semibold"
                variant={"outline"}
              >
                Visit
              </Button>
            </Link>
          )}
          {github && (
            <Link href={github} target="_blank">
              <Button className="bg-green-600 hover:text-green-600 hover:bg-white">
                Github
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div className="bg-[#F3F4F6] p-4 md:p-6 lg:p-10 w-full md:w-[50%] h-100%">
        <Image
          src={imagePreview ? imagePreview : "/code.jpg"}
          width={1000}
          height={1000}
          alt=""
          className="object-cover h-[100%]"
        />
      </div>
    </div>
  );
};
