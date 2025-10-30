"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Calendar, FileText, MessageSquare, AlertCircle, CheckCircle } from "lucide-react"
import { HospitalHeader } from "@/components/hospital-header"
import { HospitalSidebar } from "@/components/hospital-sidebar"

export default function NotificacoesPage() {
  const notifications = [
    {
      id: 1,
      type: "consulta",
      title: "Consulta Confirmada",
      message: "Sua consulta com Dr. Silva foi confirmada para 22 Set às 14:00",
      time: "Há 2 horas",
      read: false,
      icon: Calendar,
      color: "blue",
    },
    {
      id: 2,
      type: "exame",
      title: "Resultado de Exame Disponível",
      message: "O resultado do seu Hemograma Completo está disponível",
      time: "Há 5 horas",
      read: false,
      icon: FileText,
      color: "green",
    },
    {
      id: 3,
      type: "mensagem",
      title: "Nova Mensagem",
      message: "Dr. Silva enviou uma mensagem para você",
      time: "Ontem",
      read: true,
      icon: MessageSquare,
      color: "purple",
    },
    {
      id: 4,
      type: "lembrete",
      title: "Lembrete de Medicação",
      message: "Não esqueça de tomar seu medicamento às 20:00",
      time: "Ontem",
      read: true,
      icon: AlertCircle,
      color: "yellow",
    },
    {
      id: 5,
      type: "consulta",
      title: "Consulta Realizada",
      message: "Sua teleconsulta com Dra. Santos foi concluída",
      time: "2 dias atrás",
      read: true,
      icon: CheckCircle,
      color: "green",
    },
    {
      id: 6,
      type: "exame",
      title: "Exame Agendado",
      message: "Ressonância Magnética agendada para 25 Set às 10:00",
      time: "3 dias atrás",
      read: true,
      icon: Calendar,
      color: "blue",
    },
  ]

  const unreadCount = notifications.filter((n) => !n.read).length

  const getIconColor = (color: string) => {
    const colors: Record<string, string> = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      purple: "bg-purple-100 text-purple-600",
      yellow: "bg-yellow-100 text-yellow-600",
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HospitalHeader />

      <div className="flex">
        <HospitalSidebar />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Notificações</h1>
                <p className="text-gray-600">
                  Você tem {unreadCount} {unreadCount === 1 ? "notificação não lida" : "notificações não lidas"}
                </p>
              </div>
              <Button variant="outline" className="bg-transparent">
                Marcar todas como lidas
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
                    <p className="text-sm text-gray-600">Não Lidas</p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <Bell className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
                    <p className="text-sm text-gray-600">Total</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Bell className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {notifications.filter((n) => n.type === "consulta").length}
                    </p>
                    <p className="text-sm text-gray-600">Consultas</p>
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
                    <p className="text-2xl font-bold text-gray-900">
                      {notifications.filter((n) => n.type === "exame").length}
                    </p>
                    <p className="text-sm text-gray-600">Exames</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notifications List */}
          <Card>
            <CardHeader>
              <CardTitle>Todas as Notificações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notifications.map((notification) => {
                const Icon = notification.icon
                return (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-4 p-4 rounded-lg transition-colors ${
                      notification.read ? "bg-white" : "bg-blue-50 border border-blue-200"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${getIconColor(notification.color)}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <p className="font-semibold text-gray-900">{notification.title}</p>
                        {!notification.read && <Badge className="bg-blue-600 text-white text-xs">Nova</Badge>}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
