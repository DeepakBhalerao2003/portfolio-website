import Image from "next/image"


export const AboutMe = () => {
  return (
    <div id="about" className=" px-8 md:px-16 lg:px-32 bg-[#F9FAFB]  py-8 md:py-16 flex flex-col gap-16 md:gap-8 ">

        <div className="text-xl px-4 py-2 bg-gray-300 rounded-md w-fit mx-auto">About Me</div>

        {/* main div */}
        
        <div className="flex items-center flex-col lg:flex-row h-full gap-8 md:gap-16">
            <div className="max-w-[400px] h-[400px]   flex items-center justify-center relative">
                
                <div className="w-full   px-5 lg:px-0 h-full bg-gray-300  flex justify-center">
                    <Image
                        src={"/code.jpg"}
                        height={2000}
                        width={2000}
                        alt=""
                        className="border-black border-2 h-full object-cover  lg:-translate-x-6 -translate-y-6  bg-white"
                    />
                </div>
            </div>

            <div className="space-y-3  text-[16px] font-sans">
                <h1 className="font-semibold text-xl font-serif">Curious About Me?</h1> 
                <p className="text-justify indent-6">Hi, I’m Deepak Bhalerao, a fourth-year IT engineering student and Full Stack Web Developer with a passion for creating dynamic, user-friendly web applications. I have experience working with a wide range of technologies, including HTML, CSS, JavaScript, ReactJS, NextJS, and Node.js. My journey as a developer has led me to work on several impactful projects, such as a College Placement Portal and an Online Quiz Website, which allowed me to refine both my front-end and back-end development skills.</p>

                <p className="text-justify indent-6">I’ve had the privilege of interning at Alhansat Solutions, where I developed a content-sharing tool using Svelte. In addition to this, I’ve participated in hackathons like Winjit Webathon and Fintank Hackathon, which have honed my problem-solving abilities and adaptability in fast-paced environments.</p>

                <p className="text-justify indent-6">Beyond coding, I’m a fast learner who enjoys tackling complex challenges, collaborating with teams, and continuously improving my skill set. I’m always excited to learn and apply new technologies to develop creative solutions that make a real-world impact. </p>

                <div>
                    <h2 className="text-xl font-semibold font-sans">Education:</h2>
                    <ul className="list-disc pl-8">
                        <li>B.E - Information Technology (2021 - Expected 2025): MVPS K.B.T. College of Engineering, Nashik</li>
                        <li>H.S.C - Science (2019 - 2021): Residential Jr. College, Ahmednagar – 95.67%</li>
                        <li>S.S.C (2019): Trimurti Public School, Shevgaon – 89.00%</li>
                    </ul>
                </div>
            </div>
        </div>

    </div>
  )
}
