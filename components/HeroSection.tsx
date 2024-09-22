import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons"
import { Github, Linkedin, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"


export const HeroSection = () => {
  return (
    <div className="min-h-[90vh] w-full px-8 md:px-16 lg:px-32 py-8 md:py-16 flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-24">

        {/* left section */}
        <div className="">
            <h2 className="text-2xl">Hi, I am </h2>
            <h1 className="text-4xl text-green-600 font-semibold font-serif">Deepak Bhalerao</h1>
            <p className="my-6">I'm a fourth-year IT engineering student with a passion for full stack development (ReactJS & Node.js), focusing on building efficient, user-centric web applications. My goal is to leverage my skills in both front-end and back-end technologies to create impactful digital solutions while continuously learning and growing as a developer.

</p>
            
            <div className="flex gap-4">
                <MapPin />
                Nashik, Maharashtra
            </div>

            {/* Git, linkedin icons */}

            <div className="flex gap-8 mt-12  items-center  ">
                <div className="flex gap-8 ">
                    {/* <GitHubLogoIcon className="w-6 h-6"/>
                    <LinkedInLogoIcon className="w-6 h-6"/>  */}
                    <Link href="https://github.com/DeepakBhalerao2003/" target="_blank"><Github  className="hover:scale-125 hover:text-green-600 transition-all"/></Link>
                    <Link href="https://www.linkedin.com/in/deepak-bhalerao-a2344a239" target="_blank"><Linkedin className="hover:scale-125 hover:text-green-600 transition-all"/></Link>
                </div>

                <Link href={"/Deepak_Bhalerao.pdf"} target="_blank" download={'Deepak_Bhalerao.pdf'} className='hover:text-green-600 font-semibold transition-all'><Button className="bg-green-500 hover:bg-green-700 transition-all">Download Resume</Button></Link>
            </div>


        </div>

        <div className="w-[300px] p h-fit flex items-center relative">
            
            <div className="w-[800px] px-5 lg:px-0 h-full bg-gray-300  ">
                <Image
                    src={"/hero.png"}
                    height={1000}
                    width={1000}
                    alt=""
                    className="border-black border-2 w-[300px]  lg:-translate-x-6 -translate-y-6  bg-white"
                />
            </div>
        </div>

    </div>
  )
}
