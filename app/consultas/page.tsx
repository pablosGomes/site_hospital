"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, ChevronLeft, ChevronRight, Plus, Clock, User, Stethoscope } from "lucide-react"
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
import { cn } from "@/lib/utils"

export default function ConsultasPage() {
  const [selectedDay, setSelectedDay] = useState(18)
  const [currentMonth, setCurrentMonth] = useState("Setembro 2024")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const calendarDays = [
    { day: 14, hasAppointment: false },
    { day: 15, hasAppointment: true },
    { day: 16, hasAppointment: false },
    { day: 17, hasAppointment: false },
    { day: 18, hasAppointment: false },
    { day: 19, hasAppointment: true },
    { day: 20, hasAppointment: false },
  ]

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

  const handleScheduleAppointment = (e: React.FormEvent) => {
    e.preventDefault()
    setIsDialogOpen(false)
  }

  const getDayName = (day: number) => {
    const days: Record<number, string> = {
      14: "domingo",
      15: "segunda-feira",
      16: "terça-feira",
      17: "quarta-feira",
      18: "quinta-feira",
      19: "sexta-feira",
      20: "sábado",
    }
    return days[day] || "dia"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      <HospitalHeader onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex">
        <HospitalSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 p-4 lg:p-6 overflow-y-auto scrollbar-thin">
          <div className="mb-4 lg:mb-6 opacity-0 animate-fade-in-up fill-both">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Minhas Consultas</h1>
            <p className="text-sm lg:text-base text-gray-600">Acompanhe suas consultas agendadas</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
            <Card className="opacity-0 animate-fade-in-left fill-both delay-100 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-base lg:text-lg">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    Calendário
                  </span>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-blue-50 transition-all duration-300 hover:scale-110 active:scale-95"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-blue-50 transition-all duration-300 hover:scale-110 active:scale-95"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h3 className="text-base lg:text-lg font-semibold text-gray-900 text-center">{currentMonth}</h3>
                </div>

                <div className="grid grid-cols-7 gap-1 lg:gap-2 mb-6">
                  {weekDays.map((day, index) => (
                    <div
                      key={day}
                      className="text-center text-xs font-semibold text-gray-600 py-2 opacity-0 animate-fade-in fill-both"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {day}
                    </div>
                  ))}
                  {calendarDays.map((date, index) => (
                    <button
                      key={date.day}
                      onClick={() => setSelectedDay(date.day)}
                      className={cn(
                        "relative text-center py-2 lg:py-3 text-sm cursor-pointer rounded-lg transition-all duration-300 opacity-0 animate-fade-in-up fill-both",
                        selectedDay === date.day
                          ? "bg-blue-600 text-white font-bold shadow-lg scale-110"
                          : "text-gray-700 hover:bg-blue-50 hover:scale-105 active:scale-95",
                      )}
                      style={{ animationDelay: `${(index + 7) * 50}ms` }}
                    >
                      {date.day}
                      {date.hasAppointment && (
                        <span
                          className={cn(
                            "absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full",
                            selectedDay === date.day ? "bg-white" : "bg-blue-500",
                          )}
                        />
                      )}
                    </button>
                  ))}
                </div>

                <div className="space-y-3 p-3 lg:p-4 bg-gradient-to-r from-blue-50 to-transparent rounded-lg border border-blue-100">
                  {[
                    { label: "Esta semana:", value: "5", color: "text-gray-900" },
                    { label: "Confirmadas:", value: "3", color: "text-green-600" },
                    { label: "Pendentes:", value: "1", color: "text-yellow-600" },
                  ].map((stat, index) => (
                    <div
                      key={stat.label}
                      className="flex justify-between items-center opacity-0 animate-fade-in-left fill-both"
                      style={{ animationDelay: `${400 + index * 100}ms` }}
                    >
                      <span className="text-xs lg:text-sm text-gray-600">{stat.label}</span>
                      <span
                        className={cn(
                          "font-bold text-base lg:text-lg transition-all duration-300 hover:scale-110",
                          stat.color,
                        )}
                      >
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="opacity-0 animate-fade-in-right fill-both delay-100 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="capitalize text-base lg:text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  {getDayName(selectedDay)}, {selectedDay} de setembro
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-8 lg:py-12 text-center">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-4 shadow-lg animate-float">
                    <Calendar className="w-8 h-8 lg:w-10 lg:h-10 text-blue-600" />
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 opacity-0 animate-fade-in-up fill-both delay-200">
                    Nenhuma consulta agendada
                  </h3>
                  <p className="text-sm lg:text-base text-gray-600 mb-6 opacity-0 animate-fade-in-up fill-both delay-300">
                    Você não tem consultas agendadas para este dia.
                  </p>

                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 text-sm lg:text-base opacity-0 animate-fade-in-up fill-both delay-400 group">
                        <Plus className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-90" />
                        Solicitar Consulta
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] mx-4 animate-scale-in">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Stethoscope className="w-5 h-5 text-blue-600" />
                          Agendar Nova Consulta
                        </DialogTitle>
                        <DialogDescription>
                          Preencha os dados abaixo para solicitar uma nova consulta.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleScheduleAppointment} className="space-y-4 mt-4">
                        <div className="space-y-2 opacity-0 animate-fade-in-up fill-both delay-100">
                          <Label htmlFor="specialty" className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            Especialidade
                          </Label>
                          <Select>
                            <SelectTrigger className="transition-all duration-200 focus:scale-[1.01] focus:shadow-md">
                              <SelectValue placeholder="Selecione a especialidade" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cardiologia">Cardiologia</SelectItem>
                              <SelectItem value="dermatologia">Dermatologia</SelectItem>
                              <SelectItem value="ortopedia">Ortopedia</SelectItem>
                              <SelectItem value="pediatria">Pediatria</SelectItem>
                              <SelectItem value="clinica-geral">Clínica Geral</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2 opacity-0 animate-fade-in-up fill-both delay-200">
                          <Label htmlFor="date" className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            Data Preferencial
                          </Label>
                          <Input
                            type="date"
                            id="date"
                            className="transition-all duration-200 focus:scale-[1.01] focus:shadow-md"
                          />
                        </div>

                        <div className="space-y-2 opacity-0 animate-fade-in-up fill-both delay-300">
                          <Label htmlFor="time" className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            Horário Preferencial
                          </Label>
                          <Select>
                            <SelectTrigger className="transition-all duration-200 focus:scale-[1.01] focus:shadow-md">
                              <SelectValue placeholder="Selecione o horário" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="08:00">08:00</SelectItem>
                              <SelectItem value="09:00">09:00</SelectItem>
                              <SelectItem value="10:00">10:00</SelectItem>
                              <SelectItem value="14:00">14:00</SelectItem>
                              <SelectItem value="15:00">15:00</SelectItem>
                              <SelectItem value="16:00">16:00</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2 opacity-0 animate-fade-in-up fill-both delay-400">
                          <Label htmlFor="notes">Observações</Label>
                          <Input
                            id="notes"
                            placeholder="Descreva brevemente o motivo da consulta"
                            className="transition-all duration-200 focus:scale-[1.01] focus:shadow-md"
                          />
                        </div>

                        <div className="flex gap-3 pt-4 opacity-0 animate-fade-in-up fill-both delay-500">
                          <Button
                            type="button"
                            variant="outline"
                            className="flex-1 bg-transparent transition-all duration-300 hover:scale-105 active:scale-95"
                            onClick={() => setIsDialogOpen(false)}
                          >
                            Cancelar
                          </Button>
                          <Button
                            type="submit"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                          >
                            Confirmar Agendamento
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
