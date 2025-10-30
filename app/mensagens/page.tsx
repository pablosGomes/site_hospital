"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, Search, User } from "lucide-react"
import { HospitalHeader } from "@/components/hospital-header"
import { HospitalSidebar } from "@/components/hospital-sidebar"

export default function MensagensPage() {
  const [selectedChat, setSelectedChat] = useState(1)

  const conversations = [
    {
      id: 1,
      name: "Dr. Silva",
      specialty: "Cardiologia",
      lastMessage: "Seus exames estão prontos",
      time: "10:30",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: "Dra. Santos",
      specialty: "Dermatologia",
      lastMessage: "Agende sua próxima consulta",
      time: "Ontem",
      unread: 0,
      online: false,
    },
    {
      id: 3,
      name: "Recepção",
      specialty: "Atendimento",
      lastMessage: "Confirmação de consulta",
      time: "2 dias",
      unread: 1,
      online: true,
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "Dr. Silva",
      content: "Olá! Como você está se sentindo hoje?",
      time: "10:15",
      isOwn: false,
    },
    {
      id: 2,
      sender: "Você",
      content: "Estou bem, obrigado! Os sintomas melhoraram.",
      time: "10:20",
      isOwn: true,
    },
    {
      id: 3,
      sender: "Dr. Silva",
      content: "Que ótimo! Seus exames estão prontos e os resultados são positivos.",
      time: "10:25",
      isOwn: false,
    },
    {
      id: 4,
      sender: "Dr. Silva",
      content: "Você pode visualizá-los na seção de Exames.",
      time: "10:30",
      isOwn: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <HospitalHeader />

      <div className="flex">
        <HospitalSidebar />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Mensagens</h1>
            <p className="text-gray-600">Converse com sua equipe médica</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            {/* Conversations List */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Conversas</CardTitle>
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Buscar conversas..." className="pl-10" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {conversations.map((conv) => (
                    <div
                      key={conv.id}
                      onClick={() => setSelectedChat(conv.id)}
                      className={`p-4 cursor-pointer transition-colors border-l-4 ${
                        selectedChat === conv.id
                          ? "bg-blue-50 border-blue-600"
                          : "bg-white border-transparent hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-blue-600" />
                            </div>
                            {conv.online && (
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">{conv.name}</p>
                            <p className="text-xs text-gray-500">{conv.specialty}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">{conv.time}</p>
                          {conv.unread > 0 && (
                            <Badge className="bg-blue-600 text-white text-xs mt-1">{conv.unread}</Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chat Area */}
            <Card className="lg:col-span-2 flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Dr. Silva</p>
                    <p className="text-sm text-green-600">Online</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.isOwn ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${message.isOwn ? "text-blue-100" : "text-gray-500"}`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>

              <div className="border-t p-4">
                <div className="flex items-center gap-2">
                  <Input placeholder="Digite sua mensagem..." className="flex-1" />
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
