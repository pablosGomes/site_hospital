
"use client"
import { HospitalHeader } from "@/components/hospital-header"
import { HospitalSidebar } from "@/components/hospital-sidebar"
import { useState } from "react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <HospitalHeader onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex">
        <HospitalSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto scrollbar-thin">
          {children}
        </main>
      </div>
    </div>
  )
}
