"use client"

/**
 * Página de Consultas
 *
 * Permite ao paciente:
 * - Visualizar um calendário com suas consultas
 * - Ver detalhes das consultas agendadas
 * - Agendar novas consultas através de um formulário
 * - Filtrar consultas por status (todas, confirmadas, pendentes)
 * - Cancelar ou reagendar consultas existentes
 */

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, ChevronLeft, ChevronRight, Plus, Clock, MapPin, Phone, X, Edit } from "lucide-react"
import { HospitalHeader } from "@/components/hospital-header"
import { HospitalSidebar } from "@/components/hospital-sidebar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Appointment {
  id: string
  date: string
  month: string
  time: string
  doctor: string
  specialty: string
  location: string
  phone: string
  status: "confirmed" | "pending" | "completed"
  notes?: string
}

export default function ConsultasPage() {
  const [currentMonth, setCurrentMonth] = useState("Setembro 2024")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState<"all" | "confirmed" | "pending">("all")

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      date: "22",
      month: "Set",
      time: "14:00",
      doctor: "Dr. Carlos Silva",
      specialty: "Cardiologia",
      location: "Sala 301 - 3º Andar",
      phone: "(11) 3456-7890",
      status: "confirmed",
      notes: "Trazer exames anteriores",
    },
    {
      id: "2",
      date: "28",
      month: "Set",
      time: "09:30",
      doctor: "Dra. Ana Santos",
      specialty: "Dermatologia",
      location: "Sala 205 - 2º Andar",
      phone: "(11) 3456-7891",
      status: "confirmed",
    },
    {
      id: "3",
      date: "30",
      month: "Set",
      time: "16:00",
      doctor: "Dr. Pedro Costa",
      specialty: "Ortopedia",
      location: "Sala 102 - 1º Andar",
      phone: "(11) 3456-7892",
      status: "pending",
    },
  ])

  const calendarDays = [
    { day: 14, isToday: false, hasAppointment: false },
    { day: 15, isToday: false, hasAppointment: false },
    { day: 16, isToday: false, hasAppointment: false },
    { day: 17, isToday: false, hasAppointment: false },
    { day: 18, isToday: true, hasAppointment: false },
    { day: 19, isToday: false, hasAppointment: false },
    { day: 20, isToday: false, hasAppointment: false },
    { day: 21, isToday: false, hasAppointment: false },
    { day: 22, isToday: false, hasAppointment: true },
    { day: 23, isToday: false, hasAppointment: false },
    { day: 24, isToday: false, hasAppointment: false },
    { day: 25, isToday: false, hasAppointment: false },
    { day: 26, isToday: false, hasAppointment: false },
    { day: 27, isToday: false, hasAppointment: false },
    { day: 28, isToday: false, hasAppointment: true },
    { day: 29, isToday: false, hasAppointment: false },
    { day: 30, isToday: false, hasAppointment: true },
  ]

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

  const handleScheduleAppointment = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui seria feita a chamada à API para agendar a consulta
    console.log("[v0] Agendando nova consulta...")
    setIsDialogOpen(false)
  }

  const handleCancelAppointment = (id: string) => {
    // Aqui seria feita a chamada à API para cancelar a consulta
    console.log("[v0] Cancelando consulta:", id)
    setAppointments(appointments.filter((apt) => apt.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "completed":
        return "bg-gray-100 text-gray-700 border-gray-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmada"
      case "pending":
        return "Pendente"
      case "completed":
        return "Realizada"
      default:
        return status
    }
  }

  const filteredAppointments = appointments.filter((apt) => {
    if (selectedFilter === "all") return true
    return apt.status === selectedFilter
  })

  const stats = {
    total: appointments.length,
    confirmed: appointments.filter((apt) => apt.status === "confirmed").length,
    pending: appointments.filter((apt) => apt.status === "pending").length,
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
          {/* Cabeçalho da página */}
          <div className="mb-4 lg:mb-6 animate-fade-in-up opacity-0 [animation-delay:0ms] [animation-fill-mode:forwards]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Minhas Consultas</h1>
                <p className="text-sm lg:text-base text-gray-600">Gerencie suas consultas médicas</p>
              </div>
              {/* Botão para agendar nova consulta */}
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 hover:scale-105 shadow-lg">
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Consulta
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] mx-4">
                  <DialogHeader>
                    <DialogTitle>Agendar Nova Consulta</DialogTitle>
                    <DialogDescription>Preencha os dados abaixo para solicitar uma nova consulta.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleScheduleAppointment} className="space-y-4 mt-4">
                    {/* Campo: Especialidade */}
                    <div className="space-y-2">
                      <Label htmlFor="specialty">Especialidade *</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a especialidade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cardiologia">Cardiologia</SelectItem>
                          <SelectItem value="dermatologia">Dermatologia</SelectItem>
                          <SelectItem value="ortopedia">Ortopedia</SelectItem>
                          <SelectItem value="pediatria">Pediatria</SelectItem>
                          <SelectItem value="clinica-geral">Clínica Geral</SelectItem>
                          <SelectItem value="ginecologia">Ginecologia</SelectItem>
                          <SelectItem value="oftalmologia">Oftalmologia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Campo: Data */}
                    <div className="space-y-2">
                      <Label htmlFor="date">Data Preferencial *</Label>
                      <Input type="date" id="date" required />
                    </div>

                    {/* Campo: Horário */}
                    <div className="space-y-2">
                      <Label htmlFor="time">Horário Preferencial *</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o horário" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="08:00">08:00</SelectItem>
                          <SelectItem value="09:00">09:00</SelectItem>
                          <SelectItem value="10:00">10:00</SelectItem>
                          <SelectItem value="11:00">11:00</SelectItem>
                          <SelectItem value="14:00">14:00</SelectItem>
                          <SelectItem value="15:00">15:00</SelectItem>
                          <SelectItem value="16:00">16:00</SelectItem>
                          <SelectItem value="17:00">17:00</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Campo: Observações */}
                    <div className="space-y-2">
                      <Label htmlFor="notes">Observações</Label>
                      <Input id="notes" placeholder="Descreva brevemente o motivo da consulta" />
                    </div>

                    {/* Botões de ação */}
                    <div className="flex gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancelar
                      </Button>
                      <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                        Confirmar Agendamento
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
            {/* Seção do Calendário */}
            <Card className="xl:col-span-1 animate-fade-in-left opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards]">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-base lg:text-lg">
                  <span>Calendário</span>
                  {/* Navegação do calendário */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-blue-50 transition-all duration-200 hover:scale-110"
                      onClick={() => console.log("[v0] Mês anterior")}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-blue-50 transition-all duration-200 hover:scale-110"
                      onClick={() => console.log("[v0] Próximo mês")}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Mês atual */}
                <div className="mb-4">
                  <h3 className="text-base lg:text-lg font-semibold text-gray-900 text-center">{currentMonth}</h3>
                </div>

                {/* Grid do calendário */}
                <div className="grid grid-cols-7 gap-1 lg:gap-2 mb-6">
                  {/* Cabeçalho: dias da semana */}
                  {weekDays.map((day) => (
                    <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
                      {day}
                    </div>
                  ))}
                  {/* Dias do mês */}
                  {calendarDays.map((date, index) => (
                    <button
                      key={index}
                      className={`relative text-center py-2 lg:py-3 text-sm cursor-pointer rounded-lg transition-all duration-200 ${
                        date.isToday
                          ? "bg-blue-600 text-white font-bold shadow-lg scale-110"
                          : date.hasAppointment
                            ? "bg-green-100 text-green-700 font-semibold hover:bg-green-200"
                            : "text-gray-700 hover:bg-blue-50 hover:scale-105"
                      }`}
                    >
                      {date.day}
                      {/* Indicador de consulta agendada */}
                      {date.hasAppointment && !date.isToday && (
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-600 rounded-full"></div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Estatísticas semanais */}
                <div className="space-y-3 p-3 lg:p-4 bg-gradient-to-r from-blue-50 to-transparent rounded-lg border border-blue-100">
                  <div className="flex justify-between items-center">
                    <span className="text-xs lg:text-sm text-gray-600">Total de consultas:</span>
                    <span className="font-bold text-base lg:text-lg text-gray-900">{stats.total}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs lg:text-sm text-gray-600">Confirmadas:</span>
                    <span className="font-bold text-base lg:text-lg text-green-600">{stats.confirmed}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs lg:text-sm text-gray-600">Pendentes:</span>
                    <span className="font-bold text-base lg:text-lg text-yellow-600">{stats.pending}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seção de Lista de Consultas */}
            <Card className="xl:col-span-2 animate-fade-in-right opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards]">
              <CardHeader>
                <CardTitle className="text-base lg:text-lg">Consultas Agendadas</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Tabs para filtrar consultas */}
                <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setSelectedFilter(value as any)}>
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="all">Todas ({stats.total})</TabsTrigger>
                    <TabsTrigger value="confirmed">Confirmadas ({stats.confirmed})</TabsTrigger>
                    <TabsTrigger value="pending">Pendentes ({stats.pending})</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-4">
                    {filteredAppointments.length > 0 ? (
                      filteredAppointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="p-4 bg-gradient-to-r from-blue-50 to-transparent rounded-lg border border-blue-100 transition-all duration-200 hover:shadow-md hover:border-blue-300"
                        >
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                            {/* Informações principais */}
                            <div className="flex items-start gap-4 flex-1">
                              {/* Data */}
                              <div className="text-center bg-white rounded-lg p-3 shadow-sm min-w-[70px]">
                                <p className="text-lg font-bold text-gray-900">{appointment.date}</p>
                                <p className="text-xs text-gray-600">{appointment.month}</p>
                                <div className="mt-2 pt-2 border-t border-gray-200">
                                  <p className="text-sm text-blue-600 font-medium flex items-center justify-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {appointment.time}
                                  </p>
                                </div>
                              </div>

                              {/* Detalhes da consulta */}
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <h3 className="text-base lg:text-lg font-semibold text-gray-900">
                                      {appointment.doctor}
                                    </h3>
                                    <p className="text-sm text-gray-600">{appointment.specialty}</p>
                                  </div>
                                  <Badge className={`${getStatusColor(appointment.status)} text-xs`}>
                                    {getStatusText(appointment.status)}
                                  </Badge>
                                </div>

                                {/* Informações adicionais */}
                                <div className="space-y-1 mt-3">
                                  <p className="text-xs lg:text-sm text-gray-600 flex items-center gap-2">
                                    <MapPin className="w-3 h-3" />
                                    {appointment.location}
                                  </p>
                                  <p className="text-xs lg:text-sm text-gray-600 flex items-center gap-2">
                                    <Phone className="w-3 h-3" />
                                    {appointment.phone}
                                  </p>
                                  {appointment.notes && (
                                    <p className="text-xs lg:text-sm text-blue-600 mt-2 italic">
                                      Obs: {appointment.notes}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Botões de ação */}
                            <div className="flex lg:flex-col gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 lg:flex-none bg-transparent"
                                onClick={() => console.log("[v0] Reagendar consulta:", appointment.id)}
                              >
                                <Edit className="w-4 h-4 mr-2" />
                                Reagendar
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 lg:flex-none text-red-600 hover:bg-red-50 hover:text-red-700 bg-transparent"
                                onClick={() => handleCancelAppointment(appointment.id)}
                              >
                                <X className="w-4 h-4 mr-2" />
                                Cancelar
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-4 shadow-lg">
                          <Calendar className="w-8 h-8 lg:w-10 lg:h-10 text-blue-600" />
                        </div>
                        <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">Nenhuma consulta encontrada</h3>
                        <p className="text-sm lg:text-base text-gray-600 mb-6">
                          Você não tem consultas{" "}
                          {selectedFilter !== "all" ? getStatusText(selectedFilter).toLowerCase() : "agendadas"}.
                        </p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="confirmed" className="space-y-4">
                    {filteredAppointments.length > 0 ? (
                      filteredAppointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="p-4 bg-gradient-to-r from-green-50 to-transparent rounded-lg border border-green-100 transition-all duration-200 hover:shadow-md hover:border-green-300"
                        >
                          {/* Mesmo conteúdo do card acima */}
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                            <div className="flex items-start gap-4 flex-1">
                              <div className="text-center bg-white rounded-lg p-3 shadow-sm min-w-[70px]">
                                <p className="text-lg font-bold text-gray-900">{appointment.date}</p>
                                <p className="text-xs text-gray-600">{appointment.month}</p>
                                <div className="mt-2 pt-2 border-t border-gray-200">
                                  <p className="text-sm text-green-600 font-medium flex items-center justify-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {appointment.time}
                                  </p>
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <h3 className="text-base lg:text-lg font-semibold text-gray-900">
                                      {appointment.doctor}
                                    </h3>
                                    <p className="text-sm text-gray-600">{appointment.specialty}</p>
                                  </div>
                                  <Badge className={`${getStatusColor(appointment.status)} text-xs`}>
                                    {getStatusText(appointment.status)}
                                  </Badge>
                                </div>
                                <div className="space-y-1 mt-3">
                                  <p className="text-xs lg:text-sm text-gray-600 flex items-center gap-2">
                                    <MapPin className="w-3 h-3" />
                                    {appointment.location}
                                  </p>
                                  <p className="text-xs lg:text-sm text-gray-600 flex items-center gap-2">
                                    <Phone className="w-3 h-3" />
                                    {appointment.phone}
                                  </p>
                                  {appointment.notes && (
                                    <p className="text-xs lg:text-sm text-green-600 mt-2 italic">
                                      Obs: {appointment.notes}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex lg:flex-col gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 lg:flex-none bg-transparent"
                                onClick={() => console.log("[v0] Reagendar consulta:", appointment.id)}
                              >
                                <Edit className="w-4 h-4 mr-2" />
                                Reagendar
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 lg:flex-none text-red-600 hover:bg-red-50 hover:text-red-700 bg-transparent"
                                onClick={() => handleCancelAppointment(appointment.id)}
                              >
                                <X className="w-4 h-4 mr-2" />
                                Cancelar
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mb-4 shadow-lg">
                          <Calendar className="w-8 h-8 lg:w-10 lg:h-10 text-green-600" />
                        </div>
                        <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">Nenhuma consulta confirmada</h3>
                        <p className="text-sm lg:text-base text-gray-600">
                          Você não tem consultas confirmadas no momento.
                        </p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="pending" className="space-y-4">
                    {filteredAppointments.length > 0 ? (
                      filteredAppointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="p-4 bg-gradient-to-r from-yellow-50 to-transparent rounded-lg border border-yellow-100 transition-all duration-200 hover:shadow-md hover:border-yellow-300"
                        >
                          {/* Mesmo conteúdo do card acima */}
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                            <div className="flex items-start gap-4 flex-1">
                              <div className="text-center bg-white rounded-lg p-3 shadow-sm min-w-[70px]">
                                <p className="text-lg font-bold text-gray-900">{appointment.date}</p>
                                <p className="text-xs text-gray-600">{appointment.month}</p>
                                <div className="mt-2 pt-2 border-t border-gray-200">
                                  <p className="text-sm text-yellow-600 font-medium flex items-center justify-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {appointment.time}
                                  </p>
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <h3 className="text-base lg:text-lg font-semibold text-gray-900">
                                      {appointment.doctor}
                                    </h3>
                                    <p className="text-sm text-gray-600">{appointment.specialty}</p>
                                  </div>
                                  <Badge className={`${getStatusColor(appointment.status)} text-xs`}>
                                    {getStatusText(appointment.status)}
                                  </Badge>
                                </div>
                                <div className="space-y-1 mt-3">
                                  <p className="text-xs lg:text-sm text-gray-600 flex items-center gap-2">
                                    <MapPin className="w-3 h-3" />
                                    {appointment.location}
                                  </p>
                                  <p className="text-xs lg:text-sm text-gray-600 flex items-center gap-2">
                                    <Phone className="w-3 h-3" />
                                    {appointment.phone}
                                  </p>
                                  {appointment.notes && (
                                    <p className="text-xs lg:text-sm text-yellow-600 mt-2 italic">
                                      Obs: {appointment.notes}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex lg:flex-col gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 lg:flex-none bg-transparent"
                                onClick={() => console.log("[v0] Reagendar consulta:", appointment.id)}
                              >
                                <Edit className="w-4 h-4 mr-2" />
                                Reagendar
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 lg:flex-none text-red-600 hover:bg-red-50 hover:text-red-700 bg-transparent"
                                onClick={() => handleCancelAppointment(appointment.id)}
                              >
                                <X className="w-4 h-4 mr-2" />
                                Cancelar
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center mb-4 shadow-lg">
                          <Calendar className="w-8 h-8 lg:w-10 lg:h-10 text-yellow-600" />
                        </div>
                        <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">Nenhuma consulta pendente</h3>
                        <p className="text-sm lg:text-base text-gray-600">
                          Você não tem consultas aguardando confirmação.
                        </p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
