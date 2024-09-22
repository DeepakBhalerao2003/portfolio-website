import MainLayout from "@/components/Admin/MainLayout"
import React, { ReactNode } from "react"

interface AdminLayoutProps {

    children: ReactNode
}
export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <MainLayout>
        {children}
    </MainLayout>
  )
}

