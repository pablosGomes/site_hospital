'''"use client"  
  
import type React from "react"  
  
import { useState } from "react"  
import { Button } from "@/components/ui/button"  
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"  
import { Calendar, ChevronLeft, ChevronRight, Plus } from "lucide-react"  
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
  
export default function ConsultasPage() {  
  const [selectedDate, setSelectedDate] = useState("quinta-feira, 18 de setembro")  
  const [currentMonth, setCurrentMonth] = useState("Setembro 2024")  
  const [isDialogOpen, setIsDialogOpen] = useState(false)  
  
  // Calendar data  
  const calendarDays = [  
    { day: 14, isToday: false },  
    { day: 15, isToday: false },  
    { day: 16, isToday: false },  
    { day: 17, isToday: false },  
    { day: 18, isToday: true },  
    { day: 19, isToday: false },  
    { day: 20, isToday: false },  
  ]  
  
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]  
  
  const handleScheduleAppointment = (e: React.FormEvent) => {  
    e.preventDefault()  
    setIsDialogOpen(false)  
  }  
  
  return (  
    <>  
      <div className="mb-4 lg:mb-6 animate-fade-in-up opacity-0 [animation-delay:0ms] [animation-fill-mode:forwards]">  
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Minhas Consultas</h1>  
        <p className="text-sm lg:text-base text-gray-600">Acompanhe suas consultas agendadas</p>  
      </div>  
  
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">  
        {/* Calendar Section */}  
        <Card className="animate-fade-in-left opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards]">  
          <CardHeader>  
            <CardTitle className="flex items-center justify-between text-base lg:text-lg">  
              <span>Calendário</span>  
              <div className="flex items-center gap-2">  
                <Button  
                  variant="ghost"  
                  size="sm"  
                  className="hover:bg-blue-50 transition-all duration-200 hover:scale-110"  
                >  
                  <ChevronLeft className="w-4 h-4" />  
                </Button>  
                <Button  
                  variant="ghost"  
                  size="sm"  
                  className="hover:bg-blue-50 transition-all duration-200 hover:scale-110"  
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
  
            {/* Calendar Grid */}  
            <div className="grid grid-cols-7 gap-1 lg:gap-2 mb-6">  
              {weekDays.map((day) => (  
                <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">  
                  {day}  
                </div>  
              ))}  
              {calendarDays.map((date) => (  
                <button  
                  key={date.day}  
                  className={`text-center py-2 lg:py-3 text-sm cursor-pointer rounded-lg transition-all duration-200 ${  
                    date.isToday  
                      ? "bg-blue-600 text-white font-bold shadow-lg scale-110"  
                      : "text-gray-700 hover:bg-blue-50 hover:scale-105"  
                  }`}  
                >  
                  {date.day}  
                </button>  
              ))}  
            </div>  
  
            {/* Weekly Stats */}  
            <div className="space-y-3 p-3 lg:p-4 bg-gradient-to-r from-blue-50 to-transparent rounded-lg border border-blue-100">  
              <div className="flex justify-between items-center">  
                <span className="text-xs lg:text-sm text-gray-600">Esta semana:</span>  
                <span className="font-bold text-base lg:text-lg text-gray-900">5</span>  
              </div>  
              <div className="flex justify-between items-center">  
                <span className="text-xs lg:text-sm text-gray-600">Confirmadas:</span>  
                <span className="font-bold text-base lg:text-lg text-green-600">3</span>  
              </div>  
              <div className="flex justify-between items-center">  
                <span className="text-xs lg:text-sm text-gray-600">Pendentes:</span>  
                <span className="font-bold text-base lg:text-lg text-yellow-600">1</span>  
              </div>  
            </div>  
          </CardContent>  
        </Card>  
  
        {/* Selected Date Section */}  
        <Card className="animate-fade-in-right opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards]">  
          <CardHeader>  
            <CardTitle className="capitalize text-base lg:text-lg">{selectedDate}</CardTitle>  
          </CardHeader>  
          <CardContent>  
            <div className="flex flex-col items-center justify-center py-8 lg:py-12 text-center">  
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-4 shadow-lg animate-pulse">  
                <Calendar className="w-8 h-8 lg:w-10 lg:h-10 text-blue-600" />  
              </div>  
              <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">Nenhuma consulta agendada</h3>  
              <p className="text-sm lg:text-base text-gray-600 mb-6">  
                Você não tem consultas agendadas para este dia.  
              </p>  
  
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>  
                <DialogTrigger asChild>  
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 hover:scale-105 shadow-lg text-sm lg:text-base">  
                    <Plus className="w-4 h-4 mr-2" />  
                    Solicitar Consulta  
                  </Button>  
                </DialogTrigger>  
                <DialogContent className="sm:max-w-[500px] mx-4">  
                  <DialogHeader>  
                    <DialogTitle>Agendar Nova Consulta</DialogTitle>  
                    <DialogDescription>  
                      Preencha os dados abaixo para solicitar uma nova consulta.  
                    </DialogDescription>  
                  </DialogHeader>  
                  <form onSubmit={handleScheduleAppointment} className="space-y-4 mt-4">  
                    <div className="space-y-2">  
                      <Label htmlFor="specialty">Especialidade</Label>  
                      <Select>  
                        <SelectTrigger>  
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
  
                    <div className="space-y-2">  
                      <Label htmlFor="date">Data Preferencial</Label>  
                      <Input type="date" id="date" />  
                    </div>  
  
                    <div className="space-y-2">  
                      <Label htmlFor="time">Horário Preferencial</Label>  
                      <Select>  
                        <SelectTrigger>  
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
  
                    <div className="space-y-2">  
                      <Label htmlFor="notes">Observações</Label>  
                      <Input id="notes" placeholder="Descreva brevemente o motivo da consulta" />  
                    </div>  
  
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
          </CardContent>  
        </Card>  
      </div>  
    </>  
  )  
}  
'''
