"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Video, Clock, Calendar, User } from "lucide-react"
import { HospitalHeader } from "@/components/hospital-header"
import { HospitalSidebar } from "@/components/hospital-sidebar"

export default function TelemedicinaPage() {
  const upcomingSessions = [
    {
      id: 1,
      doctor: "Dr. Silva",
      specialty: "Cardiologia",
      date: "22 Set",
      time: "14:00",
      status: "Confirmada",
      duration: "30 min",
    },
    {
      id: 2,
      doctor: "Dra. Santos",
      specialty: "Dermatologia",
      date: "25 Set",
      time: "10:00",
      status: "Pendente",
      duration: "45 min",
    },
  ]

  const pastSessions = [
    {
      id: 1,
      doctor: "Dr. Costa",
      specialty: "Clínico Geral",
      date: "15 Set",
      time: "16:00",
      duration: "30 min",
    },
    {
      id: 2,
      doctor: "Dra. Lima",
      specialty: "Pediatria",
      date: "10 Set",
      time: "09:00",
      duration: "40 min",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <HospitalHeader />

      <div className="flex">
        <HospitalSidebar />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Telemedicina</h1>
            <p className="text-gray-600">Consultas médicas online com segurança e praticidade</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600 font-medium mb-1">Iniciar Consulta</p>
                    <p className="text-xs text-blue-700">Conecte-se agora</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Video className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">2</p>
                    <p className="text-sm text-gray-600">Próximas Sessões</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">4</p>
                    <p className="text-sm text-gray-600">Consultas Realizadas</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Sessions */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="w-5 h-5 text-blue-600" />
                Próximas Teleconsultas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{session.doctor}</p>
                      <p className="text-sm text-gray-600">{session.specialty}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {session.date}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {session.time} - {session.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={session.status === "Confirmada" ? "secondary" : "outline"}>{session.status}</Badge>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Video className="w-4 h-4 mr-2" />
                      Entrar
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Past Sessions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-600" />
                Histórico de Consultas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pastSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{session.doctor}</p>
                      <p className="text-sm text-gray-600">{session.specialty}</p>
                      <p className="text-xs text-gray-500">
                        {session.date} às {session.time} - {session.duration}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver Detalhes
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
