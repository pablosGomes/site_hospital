"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { FileText, Download, Search, Filter } from "lucide-react"
import { HospitalHeader } from "@/components/hospital-header"
import { HospitalSidebar } from "@/components/hospital-sidebar"

export default function ExamesPage() {
  const exames = [
    {
      id: 1,
      name: "Hemograma Completo",
      date: "15 Set 2024",
      doctor: "Dr. Silva",
      status: "Disponível",
      type: "Sangue",
    },
    {
      id: 2,
      name: "Raio-X Tórax",
      date: "10 Set 2024",
      doctor: "Dra. Santos",
      status: "Disponível",
      type: "Imagem",
    },
    {
      id: 3,
      name: "Ultrassom Abdominal",
      date: "05 Set 2024",
      doctor: "Dr. Costa",
      status: "Disponível",
      type: "Imagem",
    },
    {
      id: 4,
      name: "Exame de Urina",
      date: "01 Set 2024",
      doctor: "Dra. Lima",
      status: "Disponível",
      type: "Urina",
    },
    {
      id: 5,
      name: "Eletrocardiograma",
      date: "28 Ago 2024",
      doctor: "Dr. Silva",
      status: "Disponível",
      type: "Cardíaco",
    },
  ]

  const pendingExams = [
    {
      id: 1,
      name: "Ressonância Magnética",
      scheduledDate: "25 Set 2024",
      time: "10:00",
      location: "Ala B - Sala 203",
    },
    {
      id: 2,
      name: "Tomografia Computadorizada",
      scheduledDate: "30 Set 2024",
      time: "14:30",
      location: "Ala C - Sala 105",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <HospitalHeader />

      <div className="flex">
        <HospitalSidebar />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Meus Exames</h1>
            <p className="text-gray-600">Acesse e gerencie seus resultados de exames</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{exames.length}</p>
                    <p className="text-sm text-gray-600">Exames Disponíveis</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{pendingExams.length}</p>
                    <p className="text-sm text-gray-600">Exames Agendados</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                    <p className="text-sm text-gray-600">Total de Exames</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pending Exams */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Exames Agendados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingExams.map((exam) => (
                <div
                  key={exam.id}
                  className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{exam.name}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {exam.scheduledDate} às {exam.time}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{exam.location}</p>
                  </div>
                  <Badge className="bg-blue-600 text-white">Agendado</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Search and Filter */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Buscar exames..." className="pl-10" />
                </div>
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <Filter className="w-4 h-4" />
                  Filtrar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Available Exams */}
          <Card>
            <CardHeader>
              <CardTitle>Resultados Disponíveis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {exames.map((exam) => (
                <div
                  key={exam.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{exam.name}</p>
                      <p className="text-sm text-gray-600">Solicitado por: {exam.doctor}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-500">{exam.date}</span>
                        <Badge variant="outline" className="text-xs">
                          {exam.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">{exam.status}</Badge>
                    <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                      <Download className="w-4 h-4" />
                      Baixar
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
