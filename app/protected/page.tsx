// import AuthButton from "@/components/Admin/MainLayout";
// import { createClient } from "@/utils/supabase/server";
// import { redirect } from "next/navigation";

// export default async function ProtectedPage() {
//   const supabase = createClient();

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     return redirect("/login");
//   }

//   return (
//     <div className="flex-1 w-full flex flex-col gap-20 items-center">
//       <div className="w-full">
//         <div className="py-6 font-bold bg-purple-950 text-center">
//           This is a protected page that you can only see as an authenticated
//           user
//         </div>
//         <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
//           <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
//             {/* <DeployButton /> */}
//             {/* <AuthButton /> */}
//           </div>
//         </nav>
//       </div>

//       <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
//         {/* <Header /> */}
//         <main className="flex-1 flex flex-col gap-6">
//           <h2 className="font-bold text-4xl mb-4">Next steps</h2>
//           {/* <FetchDataSteps /> */}
//         </main>
//       </div>

//       <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
//         <p>
//           Powered by{" "}
//           <a
//             href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
//             target="_blank"
//             className="font-bold hover:underline"
//             rel="noreferrer"
//           >
//             Supabase
//           </a>
//         </p>
//       </footer>
//     </div>
//   );
// }


// import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Your user details</h2>
        <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
      <div>
        <h2 className="font-bold text-2xl mb-4">Next steps</h2>
        {/* <FetchDataSteps /> */}
      </div>
    </div>
  );
}
