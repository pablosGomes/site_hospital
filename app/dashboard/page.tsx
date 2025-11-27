"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, FileText, Heart, ArrowRight, Download, Eye, TrendingUp, Clock } from "lucide-react"
import { HospitalHeader } from "@/components/hospital-header"
import { HospitalSidebar } from "@/components/hospital-sidebar"
import Link from "next/link"
import { useState } from "react"

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      <HospitalHeader onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex">
        <HospitalSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 p-4 lg:p-6 overflow-y-auto scrollbar-thin">
          <div className="mb-4 lg:mb-6 opacity-0 animate-fade-in-up fill-both">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">Minha Área</h1>
                <p className="text-sm lg:text-base text-gray-600">Olá, Maria Silva</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xs lg:text-sm text-gray-600">Hoje</p>
                <p className="text-base lg:text-lg font-semibold text-gray-900">Quinta-feira, 18 de Setembro</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
            <Link href="/consultas" className="group">
              <Card className="cursor-pointer transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:border-blue-300 opacity-0 animate-fade-in-up fill-both delay-100 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1 transition-all duration-300 group-hover:text-blue-600">
                        2
                      </p>
                      <p className="text-xs lg:text-sm text-gray-600 mb-2">Próximas Consultas</p>
                      <p className="text-xs text-blue-600 flex items-center gap-1 font-medium transition-all duration-300 group-hover:translate-x-1">
                        Clique para agendar{" "}
                        <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                      </p>
                    </div>
                    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center shadow-md transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg">
                      <Calendar className="w-6 h-6 lg:w-7 lg:h-7 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/exames" className="group">
              <Card className="cursor-pointer transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:border-green-300 opacity-0 animate-fade-in-up fill-both delay-200 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1 transition-all duration-300 group-hover:text-green-600">
                        3
                      </p>
                      <p className="text-xs lg:text-sm text-gray-600 mb-2">Exames Disponíveis</p>
                      <p className="text-xs text-green-600 flex items-center gap-1 font-medium transition-all duration-300 group-hover:translate-x-1">
                        Ver resultados{" "}
                        <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                      </p>
                    </div>
                    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center shadow-md transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg">
                      <FileText className="w-6 h-6 lg:w-7 lg:h-7 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Card className="transition-all duration-500 hover:shadow-xl hover:-translate-y-2 opacity-0 animate-fade-in-up fill-both delay-300 sm:col-span-2 lg:col-span-1 group overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-50/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1 transition-all duration-300 group-hover:text-yellow-600">
                      Ativo
                    </p>
                    <p className="text-xs lg:text-sm text-gray-600 mb-2">Status de Saúde</p>
                    <p className="text-xs text-yellow-600 flex items-center gap-1 font-medium">
                      <TrendingUp className="w-3 h-3" /> Tudo em ordem
                    </p>
                  </div>
                  <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center shadow-md transition-all duration-500 group-hover:scale-110">
                    <Heart className="w-6 h-6 lg:w-7 lg:h-7 text-yellow-600 fill-yellow-500 animate-pulse-soft" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
            <Card className="opacity-0 animate-fade-in-left fill-both delay-400 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base lg:text-lg">
                  <Calendar className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
                  Próximas Consultas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 lg:p-4 bg-gradient-to-r from-blue-50 to-transparent rounded-lg border border-blue-100 transition-all duration-300 hover:shadow-md hover:border-blue-300 hover:translate-x-1 group cursor-pointer">
                  <div className="flex items-center gap-3 lg:gap-4">
                    <div className="text-center bg-white rounded-lg p-2 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:scale-105">
                      <p className="text-sm font-bold text-gray-900">22</p>
                      <p className="text-xs text-gray-600">Set</p>
                      <p className="text-xs text-blue-600 font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" /> 14:00
                      </p>
                    </div>
                    <div>
                      <p className="text-sm lg:text-base font-semibold text-gray-900">Dr. Silva</p>
                      <p className="text-xs lg:text-sm text-gray-600">Cardiologia</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-200 text-xs transition-all duration-300 group-hover:scale-105">
                    Confirmado
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 lg:p-4 bg-gradient-to-r from-blue-50 to-transparent rounded-lg border border-blue-100 transition-all duration-300 hover:shadow-md hover:border-blue-300 hover:translate-x-1 group cursor-pointer">
                  <div className="flex items-center gap-3 lg:gap-4">
                    <div className="text-center bg-white rounded-lg p-2 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:scale-105">
                      <p className="text-sm font-bold text-gray-900">28</p>
                      <p className="text-xs text-gray-600">Set</p>
                      <p className="text-xs text-blue-600 font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" /> 09:30
                      </p>
                    </div>
                    <div>
                      <p className="text-sm lg:text-base font-semibold text-gray-900">Dra. Santos</p>
                      <p className="text-xs lg:text-sm text-gray-600">Dermatologia</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-200 text-xs transition-all duration-300 group-hover:scale-105">
                    Confirmado
                  </Badge>
                </div>

                <Link href="/consultas">
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 text-sm lg:text-base group">
                    Ver Todas as Consultas
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="opacity-0 animate-fade-in-right fill-both delay-400 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base lg:text-lg">
                  <FileText className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
                  Exames Recentes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 lg:p-4 bg-gradient-to-r from-green-50 to-transparent rounded-lg border border-green-100 transition-all duration-300 hover:shadow-md hover:border-green-300 hover:translate-x-1 group cursor-pointer">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm lg:text-base font-semibold text-gray-900 truncate">Hemograma Completo</p>
                    <p className="text-xs lg:text-sm text-gray-600">15 Set • Dr. Silva</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge className="bg-green-100 text-green-700 border-green-200 text-xs transition-all duration-300 group-hover:scale-105">
                      Disponível
                    </Badge>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-600">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-600">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 lg:p-4 bg-gradient-to-r from-green-50 to-transparent rounded-lg border border-green-100 transition-all duration-300 hover:shadow-md hover:border-green-300 hover:translate-x-1 group cursor-pointer">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm lg:text-base font-semibold text-gray-900 truncate">Raio-X Tórax</p>
                    <p className="text-xs lg:text-sm text-gray-600">10 Set • Dra. Santos</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge className="bg-green-100 text-green-700 border-green-200 text-xs transition-all duration-300 group-hover:scale-105">
                      Disponível
                    </Badge>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-600">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-600">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <Link href="/exames">
                  <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 text-sm lg:text-base group">
                    Ver Todos os Exames
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
