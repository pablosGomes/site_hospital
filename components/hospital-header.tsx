"use client"

import { Button } from "@/components/ui/button"
import { Calendar, Video, Bell, Settings, Search, Menu } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface HospitalHeaderProps {
  onMenuClick?: () => void
}

export function HospitalHeader({ onMenuClick }: HospitalHeaderProps) {
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 lg:py-4 sticky top-0 z-30 shadow-sm animate-fade-in-down fill-both">
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 active:scale-95 hover:rotate-180"
          aria-label="Abrir menu"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        <div className="flex items-center gap-3 lg:gap-6 flex-1">
          <div className="flex-1 max-w-xl">
            <div className={cn("relative transition-all duration-300 ease-out", searchFocused && "scale-[1.02]")}>
              <Search
                className={cn(
                  "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-all duration-300",
                  searchFocused ? "text-blue-500 scale-110" : "text-gray-400",
                )}
              />
              <input
                type="text"
                placeholder="Buscar pacientes, consultas, exames..."
                className={cn(
                  "w-full pl-10 pr-4 py-2 lg:py-2.5 text-sm border rounded-lg transition-all duration-300",
                  searchFocused
                    ? "border-blue-400 ring-4 ring-blue-100 shadow-lg"
                    : "border-gray-300 hover:border-gray-400",
                )}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-3">
          <Link href="/consultas" className="hidden sm:block">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-transparent border-gray-300 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-400 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden md:inline">Agendar</span>
            </Button>
          </Link>

          <Link href="/telemedicina" className="hidden sm:block">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-transparent border-gray-300 hover:bg-green-50 hover:text-green-600 hover:border-green-400 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Video className="w-4 h-4" />
              <span className="hidden md:inline">Teleconsulta</span>
            </Button>
          </Link>

          <Link href="/notificacoes">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95 group">
              <Bell className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-300 group-hover:animate-bounce-soft" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse">
                <span className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-75"></span>
              </span>
            </button>
          </Link>

          <Link href="/configuracoes" className="hidden sm:block">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-500 hover:scale-110 active:scale-95 group">
              <Settings className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-all duration-500 group-hover:rotate-180" />
            </button>
          </Link>

          <Link href="/dashboard">
            <div className="flex items-center gap-2 p-1 lg:p-2 hover:bg-gray-50 rounded-lg transition-all duration-300 cursor-pointer group">
              <div className="w-8 h-8 lg:w-9 lg:h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:from-blue-600 group-hover:to-blue-700">
                <span className="text-xs lg:text-sm text-white font-semibold">JS</span>
              </div>
              <div className="text-right hidden xl:block transition-all duration-300 group-hover:translate-x-1">
                <p className="text-sm font-medium text-gray-900">João Silva</p>
                <p className="text-xs text-gray-600">Paciente</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
}
