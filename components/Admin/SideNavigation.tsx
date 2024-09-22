import { ReaderIcon, RocketIcon } from "@radix-ui/react-icons"
import Link from "next/link"

export const SideNavigation = () => {
  return (
    <aside className=" left-0 top-0 bottom-0 w-3/12 border-r border-gray-400 h-screen p-8">
       <h1 className="font-bold text-2xl ">PortFolio Admin</h1>
       <span className="border-b mt-2 block"></span>
       <div className="mt-4">
            <ul>
                <li>
                    <Link href={"/admin/projects "} className="w-full h-full flex items-center gap-2 block text-gray-400 hover:text-gray-800 rounded-md hover:bg-gray-200 px-3 py-3">
                        <RocketIcon />
                        Projects
                    </Link>
                </li>
                <li>
                    <Link href={"/admin/skills "} className="w-full h-full flex items-center gap-2 block text-gray-400 hover:text-gray-800 rounded-md hover:bg-gray-200 px-3 py-3">
                    <ReaderIcon />
                        Skills
                    </Link>
                </li>
            </ul>
       </div>
    </aside>
)
}
