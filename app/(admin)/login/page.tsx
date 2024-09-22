import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import LoginForm from "@/components/Admin/LoginForm";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
 
  return (
    <div className="flex justify-center items-center w-full h-screen">
        <LoginForm />
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
    </div>
  );
}
