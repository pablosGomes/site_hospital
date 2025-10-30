"use client"

import { usePathname } from "next/navigation"
import {
  Home,
  Calendar,
  Video,
  FileText,
  MessageSquare,
  Bell,
  AlertCircle,
  Phone,
  Settings,
  LogOut,
  Heart,
  X,
} from "lucide-react"
import Link from "next/link"

interface SidebarProps {
  className?: string
  isOpen?: boolean
  onClose?: () => void
}

export function HospitalSidebar({ className, isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname()

  const menuItems = [
    { href: "/dashboard", label: "Minha Área", icon: Home },
    { href: "/consultas", label: "Minhas Consultas", icon: Calendar },
    { href: "/telemedicina", label: "Telemedicina", icon: Video },
    { href: "/exames", label: "Meus Exames", icon: FileText },
    { href: "/mensagens", label: "Mensagens", icon: MessageSquare },
    { href: "/notificacoes", label: "Notificações", icon: Bell },
    { href: "/emergencia", label: "Emergência", icon: AlertCircle },
    { href: "/contato", label: "Contato", icon: Phone },
    { href: "/configuracoes", label: "Configurações", icon: Settings },
  ]

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300" onClick={onClose} />
      )}

      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen
          w-64 bg-white border-r border-gray-200 
          flex flex-col z-50
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${className}
        `}
      >
        {/* Logo Section */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900">Hospital Solarium</h2>
                <p className="text-xs text-gray-600">Paciente</p>
              </div>
            </div>
            <button onClick={onClose} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-thin">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? "bg-blue-50 text-blue-700 font-medium shadow-sm"
                    : "text-gray-700 hover:bg-gray-50 hover:translate-x-1"
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? "scale-110" : "group-hover:scale-110"
                  }`}
                />
                <span className="text-sm">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
          >
            <LogOut className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
            <span className="text-sm font-medium">Sair</span>
          </Link>
        </div>
      </aside>
    </>
  )
}
