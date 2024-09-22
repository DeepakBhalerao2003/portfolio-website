"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AdminTitle() {
  const router = useRouter();
  const [content, setContent] = useState(<h1>Home</h1>);

  useEffect(() => {
    if (router.pathname === "/admin/projects") {
      setContent(<h1>Projects</h1>);
    } else if (router.pathname === "/admin/skills") {
      setContent(<h1>Skills</h1>);
    } else {
      setContent(<h1>Home</h1>);
    }
  }, [router.pathname]);

  return (
    <div>
      {content}
    </div>
  );
}