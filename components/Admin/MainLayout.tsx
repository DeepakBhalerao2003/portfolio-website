import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SideNavigation } from "./SideNavigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import AdminTitle from "./AdminTitle";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  if (!user) {
    return redirect("/login");
  }

  return (
    <main className="flex">
      <SideNavigation />
      <section className="w-9/12  px-8">
        <header className="p-5 border-b ">
          <div className="container flex justify-between items-center">
            <div>
              {/* <AdminTitle /> */}
            </div>
            <div className="flex gap-6 items-center ">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex gap-2"><PlusIcon />Create</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                  <DropdownMenuItem>
                    <Link href="/admin/projects/create" className="w-full h-full">Project</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/admin/skills/create" className="w-full h-full">Skills</Link>
                  </DropdownMenuItem>
              </DropdownMenuContent>
              
          
            </DropdownMenu>


              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>{user?.email && user.email[0]}</AvatarFallback>
                    </Avatar>

                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 " align="end">
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    {user?.email}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <div className="px-5 py-2">{children}</div>
      </section>
    </main>
  );
  // return user ? (
  //   <div className="flex items-center gap-4">
  //     Hey, {user.email}!
  //     <form action={signOut}>
  //       <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
  //         Logout
  //       </button>
  //     </form>
  //   </div>
  // ) : (
  //   <Link
  //     href="/login"
  //     className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
  //   >
  //     Login
  //   </Link>
  // );
}
