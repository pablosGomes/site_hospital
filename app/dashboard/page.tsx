"use client"

/**
 * Página Dashboard - Minha Área
 *
 * Esta é a página principal do paciente após o login.
 * Exibe um resumo geral da saúde do paciente, incluindo:
 * - Estatísticas rápidas (consultas, exames, status de saúde)
 * - Próximas consultas agendadas
 * - Exames recentes disponíveis para visualização
 * - Atalhos rápidos para funcionalidades principais
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, FileText, Heart, ArrowRight, Download, Eye, Activity, Clock, TrendingUp } from "lucide-react"
import { HospitalHeader } from "@/components/hospital-header"
import { HospitalSidebar } from "@/components/hospital-sidebar"
import Link from "next/link"
import { useState } from "react"

interface Appointment {
  id: string
  date: string
  month: string
  time: string
  doctor: string
  specialty: string
  status: "confirmed" | "pending" | "completed"
}

interface Exam {
  id: string
  name: string
  date: string
  doctor: string
  status: "available" | "pending" | "processing"
}

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const upcomingAppointments: Appointment[] = [
    {
      id: "1",
      date: "22",
      month: "Set",
      time: "14:00",
      doctor: "Dr. Carlos Silva",
      specialty: "Cardiologia",
      status: "confirmed",
    },
    {
      id: "2",
      date: "28",
      month: "Set",
      time: "09:30",
      doctor: "Dra. Ana Santos",
      specialty: "Dermatologia",
      status: "confirmed",
    },
  ]

  const recentExams: Exam[] = [
    {
      id: "1",
      name: "Hemograma Completo",
      date: "15 Set",
      doctor: "Dr. Carlos Silva",
      status: "available",
    },
    {
      id: "2",
      name: "Raio-X Tórax",
      date: "10 Set",
      doctor: "Dra. Ana Santos",
      status: "available",
    },
    {
      id: "3",
      name: "Ultrassom Abdominal",
      date: "05 Set",
      doctor: "Dr. Pedro Costa",
      status: "available",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "available":
        return "bg-green-100 text-green-700 border-green-200"
      case "processing":
        return "bg-blue-100 text-blue-700 border-blue-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmado"
      case "pending":
        return "Pendente"
      case "available":
        return "Disponível"
      case "processing":
        return "Processando"
      default:
        return status
    }
  }

  const getCurrentDate = () => {
    const days = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]
    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ]

    const now = new Date()
    const dayName = days[now.getDay()]
    const day = now.getDate()
    const month = months[now.getMonth()]

    return `${dayName}, ${day} de ${month}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header com botão de menu para mobile */}
      <HospitalHeader onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex">
        {/* Sidebar de navegação */}
        <HospitalSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Conteúdo principal da página */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto scrollbar-thin">
          {/* Cabeçalho da página com saudação e data */}
          <div className="mb-4 lg:mb-6 animate-fade-in-up opacity-0 [animation-delay:0ms] [animation-fill-mode:forwards]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">Minha Área</h1>
                <p className="text-sm lg:text-base text-gray-600">Olá, Maria Silva 👋</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xs lg:text-sm text-gray-600">Hoje</p>
                <p className="text-base lg:text-lg font-semibold text-gray-900">{getCurrentDate()}</p>
              </div>
            </div>
          </div>

          {/* Cards de estatísticas rápidas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
            {/* Card: Próximas Consultas */}
            <Link href="/consultas">
              <Card className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-blue-300 animate-fade-in-up opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards]">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{upcomingAppointments.length}</p>
                      <p className="text-xs lg:text-sm text-gray-600 mb-2">Próximas Consultas</p>
                      <p className="text-xs text-blue-600 flex items-center gap-1 font-medium">
                        Ver agenda <ArrowRight className="w-3 h-3" />
                      </p>
                    </div>
                    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center shadow-md">
                      <Calendar className="w-6 h-6 lg:w-7 lg:h-7 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Card: Exames Disponíveis */}
            <Link href="/exames">
              <Card className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-green-300 animate-fade-in-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{recentExams.length}</p>
                      <p className="text-xs lg:text-sm text-gray-600 mb-2">Exames Disponíveis</p>
                      <p className="text-xs text-green-600 flex items-center gap-1 font-medium">
                        Ver resultados <ArrowRight className="w-3 h-3" />
                      </p>
                    </div>
                    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center shadow-md">
                      <FileText className="w-6 h-6 lg:w-7 lg:h-7 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Card: Status de Saúde */}
            <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in-up opacity-0 [animation-delay:300ms] [animation-fill-mode:forwards]">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">Ótimo</p>
                    <p className="text-xs lg:text-sm text-gray-600 mb-2">Status de Saúde</p>
                    <p className="text-xs text-green-600 flex items-center gap-1 font-medium">
                      <TrendingUp className="w-3 h-3" /> Melhorando
                    </p>
                  </div>
                  <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center shadow-md">
                    <Heart className="w-6 h-6 lg:w-7 lg:h-7 text-green-600 fill-green-600 animate-pulse" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card: Última Consulta */}
            <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in-up opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">3</p>
                    <p className="text-xs lg:text-sm text-gray-600 mb-2">Dias atrás</p>
                    <p className="text-xs text-gray-600 flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3" /> Última consulta
                    </p>
                  </div>
                  <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center shadow-md">
                    <Activity className="w-6 h-6 lg:w-7 lg:h-7 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Seção de detalhes: Consultas e Exames */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
            {/* Card: Próximas Consultas */}
            <Card className="animate-fade-in-left opacity-0 [animation-delay:500ms] [animation-fill-mode:forwards]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base lg:text-lg">
                  <Calendar className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
                  Próximas Consultas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingAppointments.length > 0 ? (
                  <>
                    {upcomingAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-center justify-between p-3 lg:p-4 bg-gradient-to-r from-blue-50 to-transparent rounded-lg border border-blue-100 transition-all duration-200 hover:shadow-md hover:border-blue-300"
                      >
                        <div className="flex items-center gap-3 lg:gap-4">
                          {/* Data da consulta */}
                          <div className="text-center bg-white rounded-lg p-2 shadow-sm min-w-[60px]">
                            <p className="text-sm font-bold text-gray-900">{appointment.date}</p>
                            <p className="text-xs text-gray-600">{appointment.month}</p>
                            <p className="text-xs text-blue-600 font-medium">{appointment.time}</p>
                          </div>
                          {/* Informações do médico */}
                          <div>
                            <p className="text-sm lg:text-base font-semibold text-gray-900">{appointment.doctor}</p>
                            <p className="text-xs lg:text-sm text-gray-600">{appointment.specialty}</p>
                          </div>
                        </div>
                        {/* Status da consulta */}
                        <Badge className={`${getStatusColor(appointment.status)} text-xs`}>
                          {getStatusText(appointment.status)}
                        </Badge>
                      </div>
                    ))}

                    <Link href="/consultas">
                      <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:scale-105 text-sm lg:text-base">
                        Ver Todas as Consultas
                      </Button>
                    </Link>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Nenhuma consulta agendada</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Card: Exames Recentes */}
            <Card className="animate-fade-in-right opacity-0 [animation-delay:500ms] [animation-fill-mode:forwards]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base lg:text-lg">
                  <FileText className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
                  Exames Recentes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentExams.length > 0 ? (
                  <>
                    {recentExams.map((exam) => (
                      <div
                        key={exam.id}
                        className="flex items-center justify-between p-3 lg:p-4 bg-gradient-to-r from-green-50 to-transparent rounded-lg border border-green-100 transition-all duration-200 hover:shadow-md hover:border-green-300 group"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm lg:text-base font-semibold text-gray-900 truncate">{exam.name}</p>
                          <p className="text-xs lg:text-sm text-gray-600">
                            {exam.date} • {exam.doctor}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {/* Status do exame */}
                          <Badge className={`${getStatusColor(exam.status)} text-xs`}>
                            {getStatusText(exam.status)}
                          </Badge>
                          {/* Botões de ação (aparecem no hover) */}
                          <Button
                            size="sm"
                            variant="ghost"
                            className="hidden sm:flex opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Visualizar exame"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="hidden sm:flex opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Baixar exame"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}

                    <Link href="/exames">
                      <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 transition-all duration-200 hover:scale-105 text-sm lg:text-base">
                        Ver Todos os Exames
                      </Button>
                    </Link>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Nenhum exame disponível</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
